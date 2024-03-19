import React from 'react';
import { useDispatch } from "react-redux";
import { updateCode } from "../../features/tabs.js";
import Editor from '@monaco-editor/react';

export default function ProjectCodeTab({ code, id, lang }) {
    const dispatch = useDispatch();

    function handleEditorChange(value) {
        // Mise à jour de l'état Redux avec le nouveau code
        dispatch(updateCode({ id, value }));
    }

    // Sélectionnez le langage par défaut de l'éditeur en fonction de l'onglet
    const languageMap = {
        html: "html",
        css: "css",
        javascript: "javascript",
    };
    const defaultLanguage = languageMap[lang];

    return (
        <Editor
            value={code}
            language={defaultLanguage}
            theme="vs-dark"
            options={{
                fontSize: 14,
                minimap: { enabled: true },
                contextmenu: false,
                automaticLayout: true, // Ajuste automatiquement la taille de l'éditeur
            }}
            onChange={handleEditorChange}
            className="h-full w-full"
        />
    );
}
