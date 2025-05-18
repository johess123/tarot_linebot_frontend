import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoIosWarning } from "react-icons/io";
import SuccessDialog from './SuccessDialog';
import ErrorDialog from './ErrorDialog';

import FAQApi from '../hooks/FAQApi';

const StyledDialog = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    background-color: white;
    padding: 1rem;
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

function DeleteFAQDialog(props) {
  
    const {
        isDeleteFAQ,
        setIsDeleteFAQ,
        serial_number,
        setReload,
    } = props;
    
    const [showLoading, setShowLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    
    const deleteFAQHandler = async () => {
        try {
            setShowLoading(true);
            const result = await FAQApi.deleteFAQ(serial_number);
            setShowLoading(false);
            // const result = 'success';
            if (result === 'fail') {
                setShowError(true);
            } else {
                setShowSuccess(true);
            }
        } catch (error) {
            console.error('Failed to delete FAQ:', error);
            setShowError(true);
        }
    };
    
    return (
        <Modal
          open={isDeleteFAQ}
          onClose={() => setIsDeleteFAQ(false)}
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
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <IoIosWarning className="text-red-600 w-8 h-8" />
                                <h2 className="text-lg font-bold my-2">確認刪除</h2>
                                <p className="text-sm">您確定要刪除此 FAQ 嗎？</p>
                                <p className="text-sm">此操作無法復原。</p>
                                <div className="flex mt-4 justify-center">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded-md mr-4"
                                        onClick={() => setIsDeleteFAQ(false)}
                                    >
                                        取消
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                                        onClick={() => deleteFAQHandler()}
                                    >
                                        確認刪除
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </StyledDialog>
                <SuccessDialog
                    showSuccess={showSuccess}
                    setShowSuccess={setShowSuccess}
                    showParentDialog={setIsDeleteFAQ}
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

export default DeleteFAQDialog; 