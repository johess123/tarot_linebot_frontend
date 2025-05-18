import React from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const StyledDialog = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

function SuccessDialog(props) {
  
    const {
        showSuccess,
        setShowSuccess,
        showParentDialog,
        setReload,
    } = props;
    
    return (
        <Modal
            open={showSuccess}
            onClose={() => {
                setShowSuccess(false);
                showParentDialog(false);
                setReload(true);
            }}
        >
            <StyledDialog
                onClick={() => {
                    setShowSuccess(false);
                    showParentDialog(false);
                    setReload(true);
                }}
            >
                <div className="absolute top-2 right-2">
                    <IoMdClose
                        className="text-gray-600 w-6 h-6"
                    />
                </div>
                <FaCheckCircle
                    className="text-green-600 w-10 h-10 mb-4"
                />
                <h2 className="text-xl font-bold">操作成功</h2>
            </StyledDialog>
          
        </Modal>
    );
}

export default SuccessDialog; 