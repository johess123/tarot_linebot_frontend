import React from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { IoMdClose } from "react-icons/io";

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

function ShowFAQContentDialog(props) {
  
    const {
        showFAQContent,
        setShowFAQContent,
        qes,
        ans
    } = props;
    
    return (
        <Modal
          open={showFAQContent}
          onClose={() => setShowFAQContent(false)}
        >
            <StyledDialog>
                <div className="absolute top-3 right-2">
                    <IoMdClose
                        className="text-gray-600 w-6 h-6"
                        onClick={() => setShowFAQContent(false)}
                    />
                </div>
                <div className="h-full flex flex-col justify-center">
                    <div className="mb-4">
                        <label className="font-medium">問題標題:</label>
                        <input
                            type="text"
                            className="w-full border-1 mt-1 p-2 bg-gray-100 border-gray-300 rounded-md"
                            value={qes}
                            disabled
                        />
                    </div>
                    <div>
                        <label className="font-medium">問題內容:</label>
                        <textarea
                            className="w-full h-50 mt-1 border-1 p-2 bg-gray-100 border-gray-300 rounded-md"
                            value={ans}
                            disabled
                        />
                    </div>
                </div>
            </StyledDialog>
        </Modal>
    );
}

export default ShowFAQContentDialog; 