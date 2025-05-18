import React from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { VscError } from "react-icons/vsc";

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

function ErrorDialog(props) {
  
    const {
        showError,
        setShowError
    } = props;
    
    return (
        <Modal
          open={showError}
          onClose={() => setShowError(false)}
        >
            <StyledDialog
                onClick={() => setShowError(false)}
            >
                <div className="absolute top-2 right-2">
                    <IoMdClose
                        className="text-gray-600 w-6 h-6"
                    />
                </div>
                <VscError
                    className="text-red-600 w-10 h-10 mb-4"
                />
                <h2 className="text-xl font-bold">操作失敗</h2>
                <p className="text-sm text-gray-600">請重新嘗試</p>
            </StyledDialog>
          
        </Modal>
    );
}

export default ErrorDialog; 