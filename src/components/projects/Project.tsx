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
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

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
  const navigate = useNavigate(); // ✅ Initialize navigation

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

  // handle edit form
  const handleOnEdit = (project: ProjectModel) => {
    setShowEditForm(true);
    setSelectedRow(project);
  };

  // handle delete
  const handleOnDelete = async (projectId: string) => {
    if (!window.confirm(`Are you sure you want to delete project ID: ${projectId}?`)) {
      return;
    }
    try {
      await deleteProjectData(projectId);
      alert("Project deleted successfully.");
      loadData();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed.");
    }
  };

  // handle status update
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

  // ✅ handle milestone navigation
  const handleMilestoneNavigate = (projectId: string) => {
    navigate(`/milestone/${projectId}`);
  };

  // Function to render status button/dropdown
  const StatusDropdown = ({ project }: { project: ProjectModel }) => (
    <Dropdown>
      <Dropdown.Toggle
        variant={
          project.status === 'COMPLETED' ? 'success' :
          project.status === 'IN_PROGRESS' ? 'warning' :
          project.status === 'CANCELLED' ? 'danger' :
          'info'
        }
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
    <>
      <div>
        <h1 style={{ textAlign: "center", padding: "10px" }}>Research Project Portal</h1>
        <Button
          variant='primary'
          style={{ position: "absolute", right: "50px", top: "10%" }}
          onClick={() => setShowAddForm(true)}
        >
          Add Project
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {tblHeaders.map((headings, index) => (
              <th key={index}>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.id}</td>
              <td>{project.title}</td>
              <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {project.summary}
              </td>
              <td>{project.pi?.name || project.pi?.piId || 'N/A'}</td>
              <td>{project.tags}</td>
              <td><StatusDropdown project={project} /></td>
              <td>{formatDate(project.startDate)}</td>
              <td>{formatDate(project.endDate)}</td>
              <td>{formatDate(project.createdAt)}</td>
              <td>
                <Button
                  className="btn-warning"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleOnEdit(project)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleOnDelete(project.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="info"
                  onClick={() => handleMilestoneNavigate(project.id)}
                >
                  Milestones
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* update data handle */}
      <ProjectEdit
        show={showEditForm}
        selectedRow={selectedRow}
        handleOnClose={() => setShowEditForm(false)}
        updateProjectData={updateProjectData}
        loadData={loadData}
      />

      {/* add data handle */}
      <ProjectAdd
        show={showAddForm}
        handleOnClose={() => setShowAddForm(false)}
        addProjectData={addProjectData}
        loadData={loadData}
      />
    </>
  );
};
