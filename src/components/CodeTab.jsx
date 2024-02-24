import { useDispatch } from "react-redux";
import { updateCode } from "../features/tabs";

export default function CodeTab({ code, id }) {
  const dispatch = useDispatch();

  return (
      <textarea
          onChange={e => dispatch(updateCode({ id, value: e.target.value }))}
          value={code}
          spellCheck="false"
          className="bg-gray-900 text-white text-lg p-4 block w-full h-full focus:outline-none resize-none border-none"
      ></textarea>
  );
}
