import React, { useState } from 'react';

import { AiOutlinePlus } from "react-icons/ai";
import CreateFAQDialog from './CreateFAQDialog';

function CreateFAQ(props) {

    const {
        setReload,
    } = props;
    
    const [isCreateFAQ, setIsCreateFAQ] = useState(false);
    return (
        <div className="flex justify-between w-full mb-4">
            <h1 className="text-xl font-bold">FAQ 後台</h1>
            <div className="flex justify-between items-center rounded-lg bg-indigo-700 text-sm text-white px-4 py-2 font-bold">
                <AiOutlinePlus className="h-4 w-4 mr-2"/>
                <button onClick={() => setIsCreateFAQ(true)}>新增 FAQ</button>
            </div>
            <CreateFAQDialog
                isCreateFAQ={isCreateFAQ}
                setIsCreateFAQ={setIsCreateFAQ}
                setReload={setReload}
            />
        </div>
    );
}

export default CreateFAQ; 