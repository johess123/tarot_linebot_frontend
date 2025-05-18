import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoMdClose } from "react-icons/io";
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';
import FAQApi from '../hooks/FAQApi';

const StyledDialog = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

const StyledLoading = styled(AiOutlineLoading3Quarters)`
    font-size: 3rem;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
        transform: rotate(360deg);
        }
    }
`;

function CreateFAQDialog(props) {
  
    const {
        isCreateFAQ,
        setIsCreateFAQ,
        setReload,
    } = props;
    
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    
    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const [questionEmpty, setQuestionEmpty] = useState(false);
    const [answerEmpty, setAnswerEmpty] = useState(false);

    const createFAQHandler = () => {
        if (question === "" || answer === "") {
            if (!questionEmpty && question === "") {
                setQuestionEmpty(true);
                setTimeout(() => {
                    setQuestionEmpty(false);
                }, 3000);
            }
            if (!answerEmpty && answer === "") {
                setAnswerEmpty(true);
                setTimeout(() => {
                    setAnswerEmpty(false);
                }, 3000);
            }
            return;
        }
        startCreateFAQ();
    }

    const startCreateFAQ = async () => {
        try {
            setShowLoading(true);
            const result = await FAQApi.createFAQ(question, answer);
            setShowLoading(false);
            // const result = 'fail';
            if (result === 'fail') {
                setShowError(true);
            } else {
                setShowSuccess(true);
                setAnswer("");
                setQuestion("");
            }
        } catch (error) {
            console.error('Failed to create FAQ:', error);
            setShowError(true);
        }
    };
    
    return (
        <Modal
          open={isCreateFAQ}
          onClose={() => setIsCreateFAQ(false)}
        >
            <div>
                <StyledDialog>
                    {showLoading ?
                        (
                            <div className="w-full h-full flex justify-center items-center">
                                <StyledLoading>
                                    <AiOutlineLoading3Quarters />
                                </StyledLoading>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col">
                                <div className="absolute top-3 right-2">
                                    <IoMdClose
                                        className="text-gray-600 w-6 h-6"
                                        onClick={() => setIsCreateFAQ(false)}
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <h2 className="text-xl font-bold mb-4">新增 FAQ</h2>
                                </div>
                                <div className="mb-2">
                                    <label className="font-medium">問題標題:</label>
                                    <input
                                        type="text"
                                        placeholder="請輸入問題標題"
                                        className="w-full border-1 mt-1 p-2 bg-gray-100 border-gray-300 rounded-md focus:outline-indigo-500"
                                        value={question}
                                        onChange={handleQuestionChange}
                                    />
                                    <p className={`text-red-500 text-sm ${questionEmpty ? 'visible' : 'invisible'}`}>
                                        請填此欄位
                                    </p>
                                </div>
                                <div>
                                    <label className="font-medium">問題內容:</label>
                                    <textarea
                                        placeholder="請輸入問題的內容，可換行輸入多點。"
                                        className="w-full h-50 mt-1 border-1 p-2 bg-gray-100 border-gray-300 rounded-md focus:outline-indigo-500"
                                        value={answer}
                                        onChange={handleAnswerChange}
                                    />
                                    <p className={`text-red-500 text-sm ${answerEmpty ? 'visible' : 'invisible'}`}>
                                        請填此欄位
                                    </p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-md mr-4"
                                        onClick={() => {setIsCreateFAQ(false)}}>
                                        取消
                                    </button>
                                    <button
                                        className="bg-indigo-700 text-white font-bold px-4 py-2 rounded-md"
                                        onClick={() => {createFAQHandler()}}>
                                        確認新增
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </StyledDialog>
                <SuccessDialog
                    showSuccess={showSuccess}
                    setShowSuccess={setShowSuccess}
                    showParentDialog={setIsCreateFAQ}
                    setReload={setReload}
                />
                <ErrorDialog
                    showError={showError}
                    setShowError={setShowError}
                />
            </div>
        </Modal>
    );
}

export default CreateFAQDialog; 