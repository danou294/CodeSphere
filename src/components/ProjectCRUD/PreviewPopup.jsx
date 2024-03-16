// PreviewPopup.jsx
import React from 'react';

const PreviewPopup = ({ project }) => {
    // Simulate content compilation with project data
    const srcDoc = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${project.css}</style>
            </head>
            <body>
                ${project.html}
                <script>${project.js}</script>
            </body>
        </html>
    `;

    return (
        <div className="fixed bg-white border rounded-lg shadow-lg p-4 transition-opacity duration-300">
            <iframe
                className="w-full h-64 border-none"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                title="Preview"
            ></iframe>
        </div>
    );
};

export default PreviewPopup;
