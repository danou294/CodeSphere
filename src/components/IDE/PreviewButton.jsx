import showViewIcon from "../../assets/view.svg";
import hideViewIcon from "../../assets/hide.svg";
import { useSelector, useDispatch } from "react-redux";
import { togglePreview } from "../../features/preview.js";

export default function PreviewButton() {
  const previewData = useSelector(state => state.preview);
  const dispatch = useDispatch();

  return (
      <button
          onClick={() => dispatch(togglePreview())}
          className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out flex items-center text-white shadow"
      >
        <img
            className="w-5 mr-3"
            src={previewData.preview ? hideViewIcon : showViewIcon} alt="Toggle Preview" />
        <span>{previewData.preview ? "Hide Preview" : "Show Preview"}</span>
      </button>
  );
}
