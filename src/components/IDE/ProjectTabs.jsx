// ProjectTabs.jsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ButtonTab from '../IDE/ButtonTab';
import PreviewButton from '../IDE/PreviewButton';
import { useLocation } from 'react-router-dom';
import ProjectCodeTab from "./ProjectCodeTab.jsx";
import Preview from "./Preview.jsx";
import SaveButton from "./SaveButton.jsx";
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export default function ProjectTabs() {
    const tabs = useSelector(state => state.tabs);
    const previewData = useSelector(state => state.preview);
    const [projectId, setProjectId] = useState(null);
    const [projectData, setProjectData] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const projectIdParam = searchParams.get('projectId');
        if (projectIdParam) {
            setProjectId(projectIdParam);
            fetchProjectData(projectIdParam);
        }
    }, [location.search]);

    const fetchProjectData = async (projectId) => {
        try {
            const projectDocRef = doc(firestore, 'projects', projectId);
            const projectSnapshot = await getDoc(projectDocRef);
            if (projectSnapshot.exists()) {
                const project = projectSnapshot.data();
                console.log("Project HTML:", project.html);
                console.log("Project CSS:", project.css);
                console.log("Project JS:", project.js);
                setProjectData(project);
            } else {
                console.error('Project not found in Firestore');
            }
        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

    return (
        <div className="flex flex-grow">
            <div className="w-48 flex-shrink-0 p-4 bg-gray-700">
                {tabs.map(tab => (
                    <ButtonTab
                        key={tab.id}
                        id={tab.id}
                        imgURL={tab.imgURL}
                        buttonContent={tab.buttonContent}
                    />
                ))}
                <PreviewButton />
            </div>
            <div className="flex-grow relative p-4">
                <h2 className="text-gray-800 text-lg font-semibold mb-4">Content</h2>
                <ProjectCodeTab
                    id={projectId}
                    code={projectData ? projectData.html : ''}
                    lang="html"
                />
                <ProjectCodeTab
                    id={projectId}
                    code={projectData ? projectData.css : ''}
                    lang="css"
                />
                <ProjectCodeTab
                    id={projectId}
                    code={projectData ? projectData.js : ''}
                    lang="javascript"
                />
                <SaveButton projectId={projectId} />
                {previewData.preview && <Preview />}
            </div>
        </div>
    );
}
