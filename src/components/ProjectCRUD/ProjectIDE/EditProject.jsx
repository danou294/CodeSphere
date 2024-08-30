import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createProjectStore } from '../../../projectStore';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { Provider } from 'react-redux';
import ConnectedTabs from './ConnectedTabs';
import { setPreviewVisible } from '../../../projectStore'; // Importer l'action setPreviewVisible

const EditProject = () => {
    const { projectId } = useParams();
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectRef = doc(firestore, 'projects', projectId);
                const projectSnap = await getDoc(projectRef);

                if (projectSnap.exists()) {
                    const data = projectSnap.data();
                    const { store, actions } = createProjectStore(data);
                    // Active la prévisualisation par défaut
                    store.dispatch(setPreviewVisible(true));
                    setStoreData({ store, actions });
                } else {
                    console.error("Le projet n'existe pas !");
                }
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération du projet :", error);
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    if (loading || !storeData) {
        return <div>Chargement du projet...</div>;
    }

    const { store } = storeData;

    return (
        <Provider store={store}>
            <div className="flex flex-col h-screen">
                <ConnectedTabs />
            </div>
        </Provider>
    );
};

export default EditProject;
