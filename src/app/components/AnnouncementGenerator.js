import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import AnnouncementGeneratorDialog from './AnnouncementGeneratorDialog';
import { FaHandshake } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import AnnouncementApi from '../hooks/AnnouncementApi';
import ErrorDialog from './ErrorDialog';

const StyledLoading = styled(AiOutlineLoading3Quarters)`
    font-size: 3rem;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
        transform: rotate(360deg);
        }
    }
`;

function AnnouncementGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [generatedAnnouncement, setGeneratedAnnouncement] = useState("");
    const [showError, setShowError] = useState(false);
    const [announcementEmpty, setAnnouncementEmpty] = useState(false);
    const textareaRef = useRef(null);

    const GenerateAnnouncementHandler = (tone) => {
        if (textareaRef.current.value === "") {
            setAnnouncementEmpty(true);
            setTimeout(() => {
                setAnnouncementEmpty(false);
            }, 3000);
        }
        // call api
        startGenerateAnnouncement(textareaRef.current.value, tone);
    }

    const startGenerateAnnouncement = async (announcement, tone) => {
        try {
            setShowLoading(true);
            const result = await AnnouncementApi.generateAnnouncement(announcement, tone);
            setShowLoading(false);
            // const result = 'fail';
            if (result === 'fail') {
                setShowError(true);
            } else {
                setGeneratedAnnouncement(result.result);
                setIsGenerating(true);
            }
        } catch (error) {
            console.error('Failed to create FAQ:', error);
            setShowError(true);
        }
    };

    return (
        <>
            <div className="min-h-3/10 flex flex-col items-center w-full">
                <h2 className="text-xl font-bold my-4">公告產生器</h2>
                {showLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <StyledLoading>
                            <AiOutlineLoading3Quarters />
                        </StyledLoading>
                    </div>
                ): (
                    <>
                        <label className="mr-auto font-medium">輸入您的公告訊息:</label>
                        <textarea
                            ref={textareaRef}
                            placeholder="例如：明天下午三點開會"
                            className="bg-gray-100 rounded-lg p-2 w-full h-20 focus:outline-indigo-500"
                        >
                        </textarea>
                        <div className="flex justify-center w-full mt-4">
                            <div className="w-22 flex justify-center items-center mr-4 rounded-lg border-1 border-gray-300 px-4 py-2 font-medium">
                                <FaHandshake className="w-4 h-4 mr-1"/>
                                <button onClick={() => {GenerateAnnouncementHandler("polite")}}>
                                    禮貌
                                </button>
                            </div>
                            <div className="w-22 flex justify-center items-center mr-4 rounded-lg border-1 border-gray-300 px-4 py-2 font-medium">
                                <FaLightbulb className="w-4 h-4 mr-1"/>
                                <button onClick={() => {GenerateAnnouncementHandler("lively")}}>
                                    活潑
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <AnnouncementGeneratorDialog
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                generatedAnnouncement={generatedAnnouncement}
            />
            <ErrorDialog
                showError={showError}
                setShowError={setShowError}
            />
        </>
    );
}

export default AnnouncementGenerator; 