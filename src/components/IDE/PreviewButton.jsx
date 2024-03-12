// PreviewButton.jsx
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { togglePreview } from "../../features/preview.js";
import showViewIcon from "../../assets/view.svg";
import hideViewIcon from "../../assets/hide.svg";

export default function PreviewButton() {
    const previewData = useSelector(state => state.preview);
    const dispatch = useDispatch();

    const btnStyle = "py-2 px-4 rounded transition duration-200 ease-in-out flex items-center shadow";
    const hoverStyle = "hover:bg-blue-700 hover:text-white";

    const handleClick = () => {
        dispatch(togglePreview());
    };

    return (
        <button
            onClick={handleClick}
            className={`${btnStyle} ${previewData.preview ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} ${hoverStyle}`}
            style={{ maxWidth: "150px", maxHeight: "40px", margin: "10px" }}
        >
            <img
                className="w-5 mr-3"
                src={previewData.preview ? hideViewIcon : showViewIcon} alt="Toggle Preview" />
            <span>{previewData.preview ? "Hide Preview" : "Show Preview"}</span>
        </button>
    );

}

