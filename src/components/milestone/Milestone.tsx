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
  return isoString.split('T')[0]; // assuming format YYYY-MM-DD
};

export const Milestone = () => {
  const { projectId } = useParams<{ projectId: string }>(); // ✅ get from URL params

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

  // ✅ useCallback prevents function recreation loop
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
  }, [loadData]); // ✅ stable dependency

  // handle edit form
  const handleOnEdit = (milestone: MilestoneModel) => {
    setShowEditForm(true);
    setSelectedRow(milestone);
  };

  // handle delete
  const handleOnDelete = async (milestoneId: string) => {
    if (!window.confirm(`Are you sure you want to delete milestone ID: ${milestoneId}?`)) {
      return;
    }
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
    <>
      <div>
        <h2 style={{ padding: "10px" }}>
          📅 Milestones for Project: {projectId || "Unknown"}
        </h2>
        <Button 
          variant='primary' 
          style={{ position: "absolute", right: "50px", top: "10%" }} 
          onClick={() => setShowAddForm(true)}
        >
          Add Milestone
        </Button>
      </div>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            {tblHeaders.map((headings, index) => (
              <th key={index}>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {milestones.length > 0 ? (
            milestones.map((milestone, index) => (
              <tr key={index}>
                <td>{milestone.id}</td>
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
                <td>
                  <Badge bg={milestone.isCompleted ? 'success' : 'secondary'}>
                    {milestone.isCompleted ? 'COMPLETED' : 'PENDING'}
                  </Badge>
                </td>
                <td>{milestone.project?.id || 'N/A'}</td>
                <td>{milestone.createdBy?.fullName || milestone.createdBy?.memberId || 'N/A'}</td>
                <td>
                  <Button
                    className="btn-warning"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleOnEdit(milestone)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={() => handleOnDelete(milestone.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No milestones found for this project.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* update data handle */}
      <MilestoneEdit
        show={showEditForm}
        selectedRow={selectedRow}
        handleOnClose={() => setShowEditForm(false)}
        updateMilestone={updateMilestone}
        loadData={loadData}
      />

      {/* add data handle */}
      <MilestoneAdd
        show={showAddForm}
        projectId={projectId || ""}
        handleOnClose={() => setShowAddForm(false)}
        addMilestone={addMilestone}
        loadData={loadData}
      />
    </>
  );
};
