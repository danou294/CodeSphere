import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createProjectStore } from '../../../projectStore';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { Provider } from 'react-redux';
import ConnectedTabs from './ConnectedTabs';
import { setPreviewVisible } from '../../../projectStore'; // Importer l'action setPreviewVisible
import ChatButton from '../../chat/ChatButton';  // Assurez-vous que le chemin est correct
import ChatPanel from '../../chat/ChatPanel';    // Assurez-vous que le chemin est correct
import { useAuth } from '../../Contexts/AuthContext'; // Importation du contexte d'authentification

const EditProject = () => {
    const { projectId } = useParams();
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { currentUser } = useAuth(); // Récupérer l'utilisateur actuel pour l'ID de participant

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

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <Provider store={store}>
            <div className="flex flex-col h-screen relative">
                <ConnectedTabs />
                <ChatButton onClick={toggleChat} />
                {isChatOpen && currentUser && (
                    <div className="fixed right-0 top-0 bottom-0 w-1/3 h-full bg-gray-800 shadow-lg z-50">
                        <ChatPanel participantId={currentUser.uid} onClose={toggleChat} />
                    </div>
                )}
            </div>
        </Provider>
    );
};

export default EditProject;
