import Table from 'react-bootstrap/Table';
import { 
  getAllProjectsData, 
  deleteProjectData, 
  updateProjectData, 
  addProjectData, 
  updateProjectStatusData, 
  ProjectModel
} from "../../service/ProjectService";
import { useEffect, useState } from 'react';
import { Button, Dropdown } from "react-bootstrap";
import ProjectEdit from './ProjectEdit';
import ProjectAdd from './ProjectAdd';
import { useNavigate } from "react-router-dom";

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

export const Project = () => {
  const tblHeaders: string[] = [
    "ID",
    "Title",
    "Summary",
    "PI Name",
    "Tags",
    "Status",
    "Start Date",
    "End Date",
    "Created At",
    "Options",
  ];

  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectModel | null>(null);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const projectData = await getAllProjectsData();
      setProjects(projectData);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOnEdit = (project: ProjectModel) => {
    setShowEditForm(true);
    setSelectedRow(project);
  };

  const handleOnDelete = async (projectId: string) => {
    if (!window.confirm(`Are you sure you want to delete project ID: ${projectId}?`)) return;
    try {
      await deleteProjectData(projectId);
      alert("Project deleted successfully.");
      loadData();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed.");
    }
  };

  const handleStatusUpdate = async (projectId: string, newStatus: ProjectModel['status']) => {
    try {
      await updateProjectStatusData(projectId, newStatus);
      alert(`Project ${projectId} status updated to ${newStatus}.`);
      loadData();
    } catch (err) {
      console.error("Status update failed", err);
      alert("Status update failed.");
    }
  };

  const handleMilestoneNavigate = (projectId: string) => {
    navigate(`/milestone/${projectId}`);
  };

  const StatusDropdown = ({ project }: { project: ProjectModel }) => (
    <Dropdown>
      <Dropdown.Toggle
        variant={
          project.status === 'COMPLETED' ? 'success' :
          project.status === 'IN_PROGRESS' ? 'warning' :
          project.status === 'CANCELLED' ? 'danger' :
          'info'
        }
        size="sm"
        id={`dropdown-status-${project.id}`}
      >
        {project.status}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {(['PLANNING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as ProjectModel['status'][]).map(status => (
          <Dropdown.Item
            key={status}
            onClick={() => handleStatusUpdate(project.id, status)}
            disabled={project.status === status}
          >
            Set to {status}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="container mt-5" style={{ maxWidth: "95%" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary" style={{ fontWeight: 700 }}>🎯 Research Project Portal</h1>
        <Button
          variant="primary"
          onClick={() => setShowAddForm(true)}
          style={{ fontWeight: 'bold', padding: '10px 25px', boxShadow: '0px 5px 15px rgba(0,0,0,0.3)' }}
        >
          + Add Project
        </Button>
      </div>

      {/* Projects Table */}
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
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="text-center">{project.id}</td>
                <td>{project.title}</td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project.summary}
                </td>
                <td>{project.pi?.name || project.pi?.piId || 'N/A'}</td>
                <td>{project.tags}</td>
                <td className="text-center"><StatusDropdown project={project} /></td>
                <td>{formatDate(project.startDate)}</td>
                <td>{formatDate(project.endDate)}</td>
                <td>{formatDate(project.createdAt)}</td>
                <td className="text-center">
                  <div className="d-flex flex-column gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleOnEdit(project)}
                      style={{ fontWeight: 600 }}
                    >
                      ✏️ Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleOnDelete(project.id)}
                      style={{ fontWeight: 600 }}
                    >
                      🗑️ Delete
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleMilestoneNavigate(project.id)}
                      style={{ fontWeight: 600 }}
                    >
                      📌 Milestones
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Project Modal */}
      <ProjectEdit
        show={showEditForm}
        selectedRow={selectedRow}
        handleOnClose={() => setShowEditForm(false)}
        updateProjectData={updateProjectData}
        loadData={loadData}
      />

      {/* Add Project Modal */}
      <ProjectAdd
        show={showAddForm}
        handleOnClose={() => setShowAddForm(false)}
        addProjectData={addProjectData}
        loadData={loadData}
      />
    </div>
  );
};
