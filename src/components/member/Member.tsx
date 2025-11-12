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
    },[])
    
    // handle edit form
    const handleOnEdit = (member: MemberModel) =>{
        setShowEditForm(true);
        setSelectedRow(member);
    }

    // handle delete
    const handleOnDelete = async (memberId: string)=>{
        if (!window.confirm(`Are you sure you want to delete Member ID: ${memberId}?`)) return;
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
        <div className="container mt-5" style={{ maxWidth: "95%" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary" style={{ fontWeight: 700 }}>👥 Research Member Portal</h1>
                <Button
                    variant='primary'
                    onClick={()=> setShowAddForm(true)}
                    style={{ fontWeight: 'bold', padding: '10px 25px', boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
                >
                    + Add Member
                </Button>
            </div>

            {/* Table Card */}
            <div className="shadow-lg rounded-4 overflow-auto" style={{ background: '#ffffff', padding: '20px' }}>
                <Table striped bordered hover responsive className="mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            {tblHeaders.map((headings,index)=> (
                                <th key={index} className="text-center">{headings}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {members.map((member,index) =>(
                        <tr key={index}>
                            <td className="text-center">{member.id}</td>
                            <td>{member.fullName}</td>
                            <td>{member.username}</td>
                            <td>{formatDate(member.joinedAt)}</td>
                            <td className="text-center">
                                <div className="d-flex flex-column gap-2">
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={()=> handleOnEdit(member)}
                                        style={{ fontWeight: 600 }}
                                    >
                                        ✏️ Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={()=> handleOnDelete(member.id)}
                                        style={{ fontWeight: 600 }}
                                    >
                                        🗑️ Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {/* Edit Member Modal */}
            <MemberEdit
                show = {showEditForm}
                selectedRow={selectedRow}
                handleOnClose={()=> setShowEditForm(false)}
                updateResearchMember={updateResearchMember}
                loadData={loadData}
            />

            {/* Add Member Modal */}
            <MemberAdd
                show = {showAddForm}
                handleOnClose={()=> setShowAddForm(false)}
                saveResearchMember={saveResearchMember}
                loadData={loadData}
            />
        </div>
    );
}
