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
    },[])
    
    // handle edit form
    const handleOnEdit = (admin: AdminModel) =>{
        setShowEditForm(true);
        setSelectedRow(admin);
    }

    // handle delete
    const handleOnDelete = async (adminId: string)=>{
        if (!window.confirm(`Are you sure you want to delete Admin ID: ${adminId}?`)) return;
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
        <div className="container mt-5" style={{ maxWidth: "95%" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary" style={{ fontWeight: 700 }}>👑 Admin Portal</h1>
                <Button
                    variant='primary'
                    onClick={()=> setShowAddForm(true)}
                    style={{ fontWeight: 'bold', padding: '10px 25px', boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
                >
                    + Add Admin
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
                    {admins.map((admin,index) =>(
                        <tr key={index}>
                            <td className="text-center">{admin.id}</td>
                            <td>{admin.fullName}</td>
                            <td>{admin.username}</td>
                            <td>{admin.role}</td>
                            <td>{formatDate(admin.createdAt)}</td>
                            <td className="text-center">
                                <div className="d-flex flex-column gap-2">
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={()=> handleOnEdit(admin)}
                                        style={{ fontWeight: 600 }}
                                    >
                                        ✏️ Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={()=> handleOnDelete(admin.id)}
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

            {/* Edit Admin Modal */}
            <AdminEdit
                show = {showEditForm}
                selectedRow={selectedRow}
                handleOnClose={()=> setShowEditForm(false)}
                updateAdmin={updateAdmin}
                loadData={loadData}
            />

            {/* Add Admin Modal */}
            <AdminAdd
                show = {showAddForm}
                handleOnClose={()=> setShowAddForm(false)}
                saveAdmin={saveAdmin}
                loadData={loadData}
            />
        </div>
    );
}
