import React from 'react';
import { Link } from 'react-router-dom';

const UpdateProject = ({ projectId }) => {
    return (
        <Link to={`/update-project/${projectId}`}>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Modifier
            </button>
        </Link>
    );
};

export default UpdateProject;
