import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext.jsx';
import EditProject from './EditProject.jsx';
import ProjectTabs from '../IDE/ProjectTabs.jsx';

const AuthSwitch = () => {
    const { currentUser } = useAuth();
    const { projectId } = useParams(); // Récupère l'ID du projet depuis l'URL

    return currentUser ? <EditProject projectId={projectId} /> : <ProjectTabs projectId={projectId} />;
};

export default AuthSwitch;
