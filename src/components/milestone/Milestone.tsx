import Table from 'react-bootstrap/Table';
import { 
  getMilestonesByProject, 
  deleteMilestone, 
  updateMilestone, 
  addMilestone, 
  MilestoneModel 
} from "../../service/MilestoneService";
import { useEffect, useState, useCallback } from 'react';
import { Button, Badge } from "react-bootstrap";
import MilestoneEdit from './MilestoneEdit';
import MilestoneAdd from './MilestoneAdd';
import { useParams } from 'react-router-dom';

// Helper to format date nicely
const formatDate = (isoString: string | null | undefined): string => {
  if (!isoString) return 'N/A';
  return isoString.split('T')[0]; // YYYY-MM-DD
};

export const Milestone = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const tblHeaders: string[] = [
    "ID",
    "Title",
    "Description",
    "Due Date",
    "Status",
    "Project ID",
    "Created By",
    "Options",
  ];

  const [milestones, setMilestones] = useState<MilestoneModel[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MilestoneModel | null>(null);

  const loadData = useCallback(async () => {
    if (!projectId) return;
    try {
      const milestoneData = await getMilestonesByProject(projectId);
      setMilestones(milestoneData);
    } catch (error) {
      console.error(`Failed to load milestones for project ${projectId}:`, error);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // handle edit form
  const handleOnEdit = (milestone: MilestoneModel) => {
    setShowEditForm(true);
    setSelectedRow(milestone);
  };

  // handle delete
  const handleOnDelete = async (milestoneId: string) => {
    if (!window.confirm(`Are you sure you want to delete milestone ID: ${milestoneId}?`)) return;
    try {
      await deleteMilestone(milestoneId);
      alert("Milestone deleted successfully.");
      loadData();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "95%" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary" style={{ fontWeight: 700 }}>
          📅 Milestones for Project: {projectId || "Unknown"}
        </h2>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(true)}
          style={{ fontWeight: 'bold', padding: '10px 25px', boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
        >
          + Add Milestone
        </Button>
      </div>

      {/* Table Card */}
      <div className="shadow-lg rounded-4 overflow-auto" style={{ background: '#ffffff', padding: '20px' }}>
        <Table striped bordered hover responsive className="mb-0 align-middle">
          <thead className="table-dark">
            <tr>
              {tblHeaders.map((headings, index) => (
                <th key={index} className="text-center">{headings}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {milestones.length > 0 ? (
              milestones.map((milestone, index) => (
                <tr key={index}>
                  <td className="text-center">{milestone.id}</td>
                  <td>{milestone.title}</td>
                  <td style={{
                    maxWidth: '250px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {milestone.description}
                  </td>
                  <td>{formatDate(milestone.dueDate)}</td>
                  <td className="text-center">
                    <Badge bg={milestone.isCompleted ? 'success' : 'secondary'} style={{ fontWeight: 600 }}>
                      {milestone.isCompleted ? 'COMPLETED' : 'PENDING'}
                    </Badge>
                  </td>
                  <td>{milestone.project?.id || 'N/A'}</td>
                  <td>{milestone.createdBy?.fullName || milestone.createdBy?.memberId || 'N/A'}</td>
                  <td className="text-center">
                    <div className="d-flex flex-column gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleOnEdit(milestone)}
                        style={{ fontWeight: 600 }}
                      >
                        ✏️ Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleOnDelete(milestone.id)}
                        style={{ fontWeight: 600 }}
                      >
                        🗑️ Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">No milestones found for this project.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Edit Milestone Modal */}
      <MilestoneEdit
        show={showEditForm}
        selectedRow={selectedRow}
        handleOnClose={() => setShowEditForm(false)}
        updateMilestone={updateMilestone}
        loadData={loadData}
      />

      {/* Add Milestone Modal */}
      <MilestoneAdd
        show={showAddForm}
        projectId={projectId || ""}
        handleOnClose={() => setShowAddForm(false)}
        addMilestone={addMilestone}
        loadData={loadData}
      />
    </div>
  );
};
