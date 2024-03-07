import ButtonTab from "./ButtonTab.jsx";
import CodeTab from "./CodeTab.jsx";
import Preview from "./Preview.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Tabs() {
    const tabs = useSelector(state => state.tabs);
    const previewData = useSelector(state => state.preview);

    const [tabIndex, setTabIndex] = useState(tabs[0]?.id || 0);

    return (
        <div className="flex grow">
            <div className="w-48 flex-shrink-0 p-4 bg-gray-700">
                {tabs.map(tab => (
                    <ButtonTab
                        key={tab.id}
                        id={tab.id}
                        toggleTab={setTabIndex}
                        imgURL={tab.imgURL}
                        buttonContent={tab.buttonContent}
                        isActive={tab.id === tabIndex}
                    />
                ))}
            </div>
            <div className="flex-grow relative p-4">
                <CodeTab
                    id={tabIndex}
                    code={tabs.find(obj => obj.id === tabIndex)?.code || ''}
                />
                {previewData.preview && <Preview />}
            </div>
        </div>
    );
}
