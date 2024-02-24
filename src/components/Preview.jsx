import { useSelector } from "react-redux";

export default function Preview() {
  const tabs = useSelector(state => state.tabs);

  function getCode(lang) {
    return tabs.find(obj => obj.lang === lang)?.code || "";
  }

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${getCode("css")}</style>
      </head>
      <body>
        ${getCode("html")}
        <script>${getCode("javascript")}</script>
      </body>
    </html>
  `;

  return (
      <div className="absolute top-0 left-0 w-full h-full">
        <iframe
            className="w-full h-full border-none"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            title="Preview"
        ></iframe>
      </div>
  );
}
