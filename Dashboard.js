import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate for navigation in React Router v6

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();  // Use useNavigate for navigation

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = [
        { id: 1, name: 'Project 1:' },
        { id: 2, name: 'Project 2:' },
      ];
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  const handleCreateProject = () => {
    navigate('/create-project');  // Redirect to create-project page
  };

  return (
    <div className="dashboard">
      <h1>Your Projects</h1>
      <div className="project-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-item">
              <h3>{project.name}</h3>
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
      <button className="create-project-btn" onClick={handleCreateProject}>
        Create Project
      </button>
    </div>
  );
};

export default Dashboard;
