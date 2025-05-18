"use client";
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateFAQ from './components/CreateFAQ';
import FAQSection from './components/FAQSection';
import AnnouncementGenerator from './components/AnnouncementGenerator';
import FAQApi from './hooks/FAQApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import loginApi from './hooks/loginApi';

const StyledLoading = styled(AiOutlineLoading3Quarters)`
    font-size: 3rem;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
        transform: rotate(360deg);
        }
    }
`;

export default function Home() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [FAQList, setFAQList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const initLIFF = async () => {
            try {
                await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFFID });
                if (!liff.isLoggedIn()) {
                    liff.login();
                    return;
                }
                const profile = await liff.getProfile();
                const userId = profile.userId;

                const result = await loginApi.login(userId);
                if (result.isAdmin) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error('LIFF 初始化失敗:', error);
                setIsAuthorized(false);
            } finally {
                setIsVerifying(false);
            }
        };
        initLIFF();
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            fetchFAQs();
        }
    }, [isAuthorized]);

    useEffect(() => {
        if (reload) {
            fetchFAQs();
            setReload(false);
        }
    }, [reload]);

    async function fetchFAQs() {
        setLoading(true);
        const result = await FAQApi.getFAQs();
        setLoading(false);
        if (result !== 'fail') {
            setFAQList(result);
        }
    }

    let htmlContent; // 回傳的 html
    if (isVerifying) {
        htmlContent = (
            <div className="flex justify-center items-center w-full h-full bg-white rounded-lg">
                <StyledLoading>
                    <AiOutlineLoading3Quarters />
                </StyledLoading>
            </div>
        );
    } else if (!isAuthorized) {
        htmlContent = (
            <div className="text-center mt-8 text-red-500">
                您沒有管理員權限，無法進入此頁面。
            </div>
        );
    } else {
        htmlContent = (
            <div className="flex flex-col items-center w-full h-full bg-white rounded-lg p-4 overflow-y-auto p-4">
                {/* 新增FAQ區塊 */}
                <CreateFAQ setReload={setReload} />
                <hr className="w-full text-gray-200"></hr>
                {loading ?
                    (
                        <div className="flex justify-center items-center w-full h-full bg-white rounded-lg">
                            <StyledLoading>
                                <AiOutlineLoading3Quarters />
                            </StyledLoading>
                        </div>
                    ) : (
                        <div className="h-4/5 my-4 overflow-y-auto">
                            {FAQList.map((item) => (
                                !item.question.is_deleted && !item.answer.is_deleted && (
                                    <FAQSection key={item.question.serial_number} serial_number={item.question.serial_number} qes={item.question.content} ans={item.answer.content} setReload={setReload} />
                                )
                            ))}
                        </div>
                    )
                }
                <hr className="w-full text-gray-200"></hr>
                {/* 公告產生器區塊 */}
                <AnnouncementGenerator/>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center bg-gray-200 w-full h-full overflow-y-auto">
            {htmlContent}
        </div>
    );
}
