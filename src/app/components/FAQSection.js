import React, { useState } from 'react';

import { RxDragHandleDots2 } from "react-icons/rx";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import ShowFAQContentDialog from './ShowFAQContentDialog';
import UpdateFAQDialog from './UpdateFAQDialog';
import DeleteFAQDialog from './DeleteFAQDialog';

function FAQSection(props) {
    const {
        serial_number,
        qes,
        ans,
        setReload
    } = props;

    const [isUpdateFAQ, setIsUpdateFAQ] = useState(false);
    const [isDeleteFAQ, setIsDeleteFAQ] = useState(false);
    const [showFAQContent, setShowFAQContent] = useState(false);

    return (
        <>
            <div className="flex justify-center w-full rounded-lg border-1 border-gray-300 px-2 py-4 mb-4">
                <div className="flex justify-center w-1/10 mr-2">
                    <RxDragHandleDots2
                        className="mt-2 w-6 h-6 text-gray-400"
                    />
                </div>
                <div
                    className="flex flex-col w-3/5 mr-2"
                    onClick={() => {setShowFAQContent(true)}}
                >
                    <h2 className="font-bold">{qes}</h2>
                    <div className="h-10 mt-1 mr-1 text-sm text-gray-400 overflow-y-auto">
                        {ans}
                    </div>
                </div>
                <div className="flex flex-col items-center w-3/10">
                    <div className="flex justify-center items-center w-20 h-8 rounded-lg bg-gray-200 px-4 py-2 font-bold mb-2">
                        <FaPencilAlt 
                            className="w-3 h-3 mr-2"
                        />
                        <button
                            className="text-sm"
                            onClick={() => {setIsUpdateFAQ(true)}}
                        >
                            編輯
                        </button>
                    </div>
                    <div className="flex justify-center items-center w-20 h-8 rounded-lg bg-red-600 text-white px-4 py-2 font-bold">
                        <FaRegTrashCan 
                            className="w-3 h-3 mr-2"
                        />
                        <button
                            className="text-sm"
                            onClick={() => {setIsDeleteFAQ(true)}}
                        >
                            刪除
                        </button>
                    </div>
                </div>
            </div>
            <ShowFAQContentDialog
                showFAQContent={showFAQContent}
                setShowFAQContent={setShowFAQContent}
                qes={qes}
                ans={ans}
            />
            <UpdateFAQDialog
                isUpdateFAQ={isUpdateFAQ}
                setIsUpdateFAQ={setIsUpdateFAQ}
                serial_number={serial_number}
                last_question={qes}
                last_answer={ans}
                setReload={setReload}
            />
            <DeleteFAQDialog
                isDeleteFAQ={isDeleteFAQ}
                setIsDeleteFAQ={setIsDeleteFAQ}
                serial_number={serial_number}
                setReload={setReload}
            />
        </>
    );
}

export default FAQSection; 