// ConnectedPreviewButton.jsx (Design identique à PreviewButton d'origine)
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePreview } from '../../../projectStore'; // Action pour basculer la prévisualisation
import showViewIcon from '../../../assets/view.svg';
import hideViewIcon from '../../../assets/hide.svg';

export default function ConnectedPreviewButton() {
    const isPreviewVisible = useSelector(state => state.project.previewVisible);
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(togglePreview())}
            className="bg-gray-300 text-gray-800 hover:bg-gray-500 hover:text-white px-4 py-2 rounded"
        >
            <img
                src={isPreviewVisible ? hideViewIcon : showViewIcon}
                alt="Toggle Preview"
                className="w-5 h-5"
            />
            <span>{isPreviewVisible ? 'Hide Preview' : 'Show Preview'}</span>
        </button>
    );
}
