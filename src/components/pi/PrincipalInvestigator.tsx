import Table from 'react-bootstrap/Table';
import { getAllPrincipalInvestigators, deletePrincipalInvestigator, updatePrincipalInvestigator, savePrincipalInvestigator, PIModel} from "../../service/PIService";
import { useEffect, useState } from 'react';
import {Button} from "react-bootstrap";
import PIEdit from './PIEdit';
import PIAdd from './PIAdd';


// Helper to format date/time nicely
const formatDate = (isoString: string | null | undefined): string => {
    if (!isoString) return '';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return isoString.split('T')[0];
    }
};


export const PrincipalInvestigator = ()=> {
    const tblHeaders : string [] = [
        "ID",
        "Full Name",
        "Username",
        "Role",
        "Created At",
        "Options",
    ];

    const [ pis,setPIs ] = useState<PIModel []>([])
    const [ showEditForm, setShowEditForm] = useState(false);
    const [ showAddForm, setShowAddForm] = useState(false);
    const [ selectedRow, setSelectedRow] = useState<PIModel | null>(null);

    const loadData = async () => {
        try {
            const piData = await getAllPrincipalInvestigators();
            setPIs(piData);
        } catch(error) {
            console.error("Failed to load Principal Investigators:", error);
        }
    };

    useEffect(()=>{
        loadData();
    },[loadData]) // Added loadData for linter
    
    // handle edit form
    const handleOnEdit = (pi: PIModel) =>{
        setShowEditForm(true);
        setSelectedRow(pi);
    }

    // handle delete
    const handleOnDelete = async (piId: string)=>{
        if (!window.confirm(`Are you sure you want to delete PI ID: ${piId}?`)) {
            return;
        }
        try{
            await deletePrincipalInvestigator(piId);
            alert("Principal Investigator deleted successfully.");
            loadData();  
        }catch(err){
            console.error("Delete failed",err);
            alert("Delete failed.");
        }
    }


    return(
        <>
            <div>
                <h1 style={{ textAlign:"center",padding:"10px"}}>🔬 Principal Investigator Portal</h1>
                <Button variant='primary' style={{ position:"absolute",right:"50px",top:"10%"}} onClick={()=> setShowAddForm(true)}>
                    Add PI
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
                {pis.map((pi,index) =>(
                    <tr key={index}>
                        <td>{pi.id}</td>
                        <td>{pi.fullName}</td>
                        <td>{pi.username}</td>
                        <td>{pi.role}</td>
                        <td>{formatDate(pi.createdAt)}</td>
                        <td>
                            <Button
                                className="btn-warning"
                                style={{ marginRight: "10px"}}
                                onClick={()=> handleOnEdit(pi)}
                            >Update</Button>
                            <Button variant="danger" 
                                onClick={()=> handleOnDelete(pi.id)}
                            >Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* update data handle */}
            <PIEdit
                show = {showEditForm}
                selectedRow={selectedRow}
                handleOnClose={()=> setShowEditForm(false)}
                updatePrincipalInvestigator={updatePrincipalInvestigator}
                loadData={loadData}
            />

            {/* add data handle */}
            <PIAdd
                show = {showAddForm}
                handleOnClose={()=> setShowAddForm(false)}
                savePrincipalInvestigator={savePrincipalInvestigator}
                loadData={loadData}
            />
        </>
    );
}