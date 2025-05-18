import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

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

function AnnouncementGeneratorDialog(props) {
  
    const {
        isGenerating,
        setIsGenerating,
        generatedAnnouncement,
    } = props;

    const textareaRef = useRef(null);
    const [isCopy, setIsCopy] = useState(false);
    const [copyTip, setCopyTip] = useState("");

    const handleCopy = async () => {
        if (textareaRef.current) {
            try {
                await navigator.clipboard.writeText(textareaRef.current.value);
                setCopyTip("複製成功");
            } catch (err) {
                setCopyTip("複製失敗，請手動複製！");
            }
            setIsCopy(true);
            setTimeout(() => {
                setIsCopy(false);
            }, 3000)
        }
    };
    
    return (
        <Modal
          open={isGenerating}
          onClose={() => setIsGenerating(false)}
        >
            <div>
                <StyledDialog>
                    <div className="absolute top-3 right-2">
                        <IoMdClose
                            className="text-gray-600 w-6 h-6"
                            onClick={() => setIsGenerating(false)}
                        />
                    </div>
                    <div className="w-full relative flex flex-col items-center">
                        <div className="flex justify-center mb-2">
                            <h2 className="text-xl font-bold">生成公告</h2>
                        </div>
                        <div className="absolute top-1 right-0 mr-2">
                            <MdContentCopy
                                onClick={handleCopy}
                            >
                            </MdContentCopy>
                        </div>
                        {isCopy &&
                            <p className="text-white bg-indigo-500 rounded-md p-1 text-sm">
                                {copyTip}
                            </p>
                        }
                        <textarea
                            className="w-full h-50 mt-2 border-1 p-2 bg-gray-100 border-gray-300 rounded-md"
                            value={generatedAnnouncement}
                            ref={textareaRef}
                            disabled
                        ></textarea>
                    </div>
                </StyledDialog>
            </div>
        </Modal>
    );
}

export default AnnouncementGeneratorDialog; 