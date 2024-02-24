import Tabs from "./components/Tabs"
import PreviewButton from "./components/PreviewButton"

function App() {
  return (
      <div className="bg-gray-800 min-h-screen flex flex-col text-gray-200">
        <div className="px-6 py-5 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            <span className="text-sm font-light">Welcome to </span>CodeSphere
          </h1>
          <PreviewButton />
        </div>
        <Tabs />
      </div>
  )
}

export default App;
