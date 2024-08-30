// ConnectedPreview.jsx (Design identique à Preview d'origine)
import React from 'react';
import { useSelector } from 'react-redux';

export default function ConnectedPreview() {
    const projectState = useSelector(state => state.project);
    const isPreviewVisible = useSelector(state => state.project.previewVisible);

    if (!isPreviewVisible) {
        return null;
    }

    const srcDoc = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${projectState.css}</style>
            </head>
            <body>
                ${projectState.html}
                <script>${projectState.javascript}</script>
            </body>
        </html>
    `;

    return (
        <div className="w-full h-full bg-white border-l">
            <iframe
                className="w-full h-full border-none"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                title="Preview"
            ></iframe>
        </div>
    );
}
