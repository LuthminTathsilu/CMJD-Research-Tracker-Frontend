import Table from 'react-bootstrap/Table';
import { getAllAdmins, deleteAdmin, updateAdmin, saveAdmin, AdminModel} from "../../service/AdminService";
import { useEffect, useState } from 'react';
import {Button} from "react-bootstrap";
import AdminEdit from './AdminEdit';
import AdminAdd from './AdminAdd';


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


export const Admin = ()=> {
    const tblHeaders : string [] = [
        "ID",
        "Full Name",
        "Username",
        "Role",
        "Created At",
        "Options",
    ];

    const [ admins,setAdmins ] = useState<AdminModel []>([])
    const [ showEditForm, setShowEditForm] = useState(false);
    const [ showAddForm, setShowAddForm] = useState(false);
    const [ selectedRow, setSelectedRow] = useState<AdminModel | null>(null);

    const loadData = async () => {
        try {
            const adminData = await getAllAdmins();
            setAdmins(adminData);
        } catch(error) {
            console.error("Failed to load Admins:", error);
        }
    };

    useEffect(()=>{
        loadData();
    },[loadData])
    
    // handle edit form
    const handleOnEdit = (admin: AdminModel) =>{
        setShowEditForm(true);
        setSelectedRow(admin);
    }

    // handle delete
    const handleOnDelete = async (adminId: string)=>{
        if (!window.confirm(`Are you sure you want to delete Admin ID: ${adminId}?`)) {
            return;
        }
        try{
            await deleteAdmin(adminId);
            alert("Admin deleted successfully.");
            loadData();  
        }catch(err){
            console.error("Delete failed",err);
            alert("Delete failed.");
        }
    }


    return(
        <>
            <div>
                <h1 style={{ textAlign:"center",padding:"10px"}}>👑 Admin Portal</h1>
                <Button variant='primary' style={{ position:"absolute",right:"50px",top:"10%"}} onClick={()=> setShowAddForm(true)}>
                    Add Admin
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
                {admins.map((admin,index) =>(
                    <tr key={index}>
                        <td>{admin.id}</td>
                        <td>{admin.fullName}</td>
                        <td>{admin.username}</td>
                        <td>{admin.role}</td>
                        <td>{formatDate(admin.createdAt)}</td>
                        <td>
                            <Button
                                className="btn-warning"
                                style={{ marginRight: "10px"}}
                                onClick={()=> handleOnEdit(admin)}
                            >Update</Button>
                            <Button variant="danger" 
                                onClick={()=> handleOnDelete(admin.id)}
                            >Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* update data handle */}
            <AdminEdit
                show = {showEditForm}
                selectedRow={selectedRow}
                handleOnClose={()=> setShowEditForm(false)}
                updateAdmin={updateAdmin}
                loadData={loadData}
            />

            {/* add data handle */}
            <AdminAdd
                show = {showAddForm}
                handleOnClose={()=> setShowAddForm(false)}
                saveAdmin={saveAdmin}
                loadData={loadData}
            />
        </>
    );
}