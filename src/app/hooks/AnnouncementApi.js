import axios from 'axios';

const generateAnnouncement = async (announcement, tone) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/admin/announcement", {
            announcement: announcement,
            tone: tone
        });
        return response.data;
    } catch (error) {
        console.error('Error generating announcement:', error);
        return 'fail';
    }
};

export default {
    generateAnnouncement,
};
