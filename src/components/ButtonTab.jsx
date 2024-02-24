import { useDispatch } from "react-redux";
import { hidePreview } from "../features/preview";

export default function ButtonTab({ id, toggleTab, buttonContent, imgURL, isActive }) {
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => {
                toggleTab(id);
                dispatch(hidePreview());
            }}
            className={`flex items-center px-4 py-2 rounded transition duration-150 ease-in-out ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'} `}
        >
            <img src={imgURL} className="w-6 h-6" alt={buttonContent} />
            <span className="ml-3">{buttonContent}</span>
        </button>
    );
}

