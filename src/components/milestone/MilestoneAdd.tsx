import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { MilestoneModel, MilestoneInputModel } from "../../service/MilestoneService";

const getInitialState = (projectId: string): MilestoneInputModel => ({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    isCompleted: false,
    project: { id: projectId }, // Default project ID based on props
    createdBy: { memberId: "" }, // Member ID input
});

interface MilestoneAddProps {
    show: boolean;
    projectId: string; // The Project ID contextually needed for creation
    handleOnClose: () => void;
    addMilestone: (projectId: string, milestone: MilestoneInputModel) => Promise<MilestoneModel>;
    loadData: () => void;
}

const MilestoneAdd = ({
    show,
    projectId,
    handleOnClose,
    addMilestone: addMilestoneService,
    loadData
}: MilestoneAddProps) => {
    // Initialize state with the provided projectId
    const [milestone, setMilestone] = useState<MilestoneInputModel>(getInitialState(projectId));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Check if handling the checkbox event
    if (type === 'checkbox') {
        // Use a type assertion to guarantee to the compiler that the target 
        // is an HTMLInputElement, allowing access to 'checked'.
        const target = e.target as HTMLInputElement; 
        
        setMilestone((prev) => ({ ...prev, [name]: target.checked }));
        return; // Exit function after handling checkbox
    } 

    // Handle standard inputs (text, select, textarea) and complex objects
    if (name === 'createdBy') {
        setMilestone((prev) => ({ ...prev, createdBy: { memberId: value } }));
    } else {
        setMilestone((prev) => ({ ...prev, [name]: value as any }));
    }
    };
    const hanldeOnSubmit = async () => {
        if (!milestone.title || !milestone.dueDate || !milestone.createdBy?.memberId) {
            alert("Please fill in Title, Due Date, and Created By Member ID.");
            return;
        }

        try {
            // Send the milestone data (including project ID in the URL)
            await addMilestoneService(projectId, milestone);
            alert("Milestone added successfully!");
            loadData();
            setMilestone(getInitialState(projectId)); // Reset form state
            handleOnClose();
        } catch (error) {
            console.error("Failed to add milestone:", error);
            alert("Failed to add milestone.");
        }
    };

    return (
        <Modal show={show} onHide={handleOnClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Milestone for Project: {projectId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate>
                    <Form.Group as={Col} md="12" className="mb-3">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" value={milestone.title} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} md="12" className="mb-3">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" name="description" value={milestone.description} onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Due Date:</Form.Label>
                        <Form.Control type="date" name="dueDate" value={milestone.dueDate} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} md="6" className="mb-3">
                        <Form.Label>Created By Member ID:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="createdBy" 
                            value={milestone.createdBy?.memberId || ''} 
                            onChange={handleChange} 
                            placeholder="e.g., M001"
                            required 
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="12" className="mb-3">
                        <Form.Check 
                            type="checkbox"
                            name="isCompleted"
                            label="Mark as Completed"
                            checked={milestone.isCompleted}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleOnClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={hanldeOnSubmit}>
                    Add Milestone
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MilestoneAdd;