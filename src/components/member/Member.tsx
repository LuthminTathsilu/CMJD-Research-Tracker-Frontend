import Table from 'react-bootstrap/Table';
import { getAllResearchMembers, deleteResearchMember, updateResearchMember, saveResearchMember, MemberModel} from "../../service/MemberService";
import { useEffect, useState } from 'react';
import {Button} from "react-bootstrap";
import MemberEdit from './MemberEdit';
import MemberAdd from './MemberAdd';


// Helper to format date/time nicely
const formatDate = (isoString: string | null | undefined): string => {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return isoString ? isoString.split('T')[0] : '';
    }
};


export const Member = ()=> {
    const tblHeaders : string [] = [
        "ID",
        "Full Name",
        "Username",
        "Joined At",
        "Options",
    ];

    const [ members,setMembers ] = useState<MemberModel []>([])
    const [ showEditForm, setShowEditForm] = useState(false);
    const [ showAddForm, setShowAddForm] = useState(false);
    const [ selectedRow, setSelectedRow] = useState<MemberModel | null>(null);

    const loadData = async () => {
        try {
            const memberData = await getAllResearchMembers();
            setMembers(memberData);
        } catch(error) {
            console.error("Failed to load Research Members:", error);
        }
    };

    useEffect(()=>{
        loadData();
    },[loadData])
    
    // handle edit form
    const handleOnEdit = (member: MemberModel) =>{
        setShowEditForm(true);
        setSelectedRow(member);
    }

    // handle delete
    const handleOnDelete = async (memberId: string)=>{
        if (!window.confirm(`Are you sure you want to delete Member ID: ${memberId}?`)) {
            return;
        }
        try{
            await deleteResearchMember(memberId);
            alert("Research Member deleted successfully.");
            loadData();  
        }catch(err){
            console.error("Delete failed",err);
            alert("Delete failed.");
        }
    }


    return(
        <>
            <div>
                <h1 style={{ textAlign:"center",padding:"10px"}}>👥 Research Member Portal</h1>
                <Button variant='primary' style={{ position:"absolute",right:"50px",top:"10%"}} onClick={()=> setShowAddForm(true)}>
                    Add Member
                </Button>
            </div>
            
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        {tblHeaders.map((headings,index)=> (
                            <th key={index}>{headings}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {members.map((member,index) =>(
                    <tr key={index}>
                        <td>{member.id}</td>
                        <td>{member.fullName}</td>
                        <td>{member.username}</td>
                        <td>{formatDate(member.joinedAt)}</td>
                        <td>
                            <Button
                                className="btn-warning"
                                style={{ marginRight: "10px"}}
                                onClick={()=> handleOnEdit(member)}
                            >Update</Button>
                            <Button variant="danger" 
                                onClick={()=> handleOnDelete(member.id)}
                            >Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* update data handle */}
            <MemberEdit
                show = {showEditForm}
                selectedRow={selectedRow}
                handleOnClose={()=> setShowEditForm(false)}
                updateResearchMember={updateResearchMember}
                loadData={loadData}
            />

            {/* add data handle */}
            <MemberAdd
                show = {showAddForm}
                handleOnClose={()=> setShowAddForm(false)}
                saveResearchMember={saveResearchMember}
                loadData={loadData}
            />
        </>
    );
}