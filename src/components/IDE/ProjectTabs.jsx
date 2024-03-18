import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ButtonTab from '../IDE/ButtonTab';
import CodeTab from '../IDE/CodeTab';
import PreviewButton from '../IDE/PreviewButton';
import { useLocation } from 'react-router-dom';
import Preview from "./Preview.jsx";

export default function ProjectTabs() {
    const tabs = useSelector(state => state.tabs);
    const previewData = useSelector(state => state.preview);
    const [tabIndex, setTabIndex] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const tabIndexParam = searchParams.get('tabIndex');
        if (tabIndexParam) {
            console.log("tabIndex parameter:", tabIndexParam);
            setTabIndex(parseInt(tabIndexParam));
        } else {
            console.log("tabIndex parameter not found in URL");
        }
    }, [location.search]);

    useEffect(() => {
        console.log("Current tabIndex:", tabIndex);
    }, [tabIndex]);

    return (
        <div className="flex flex-grow">
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
                <PreviewButton />
            </div>
            <div className="flex-grow relative p-4">
                <h2 className="text-gray-800 text-lg font-semibold mb-4">Content</h2>
                <CodeTab
                    id={tabIndex}
                    code={tabs.find(obj => obj.id === tabIndex)?.code || ''}
                />
                {previewData.preview && <Preview />}
            </div>
        </div>
    );
}
