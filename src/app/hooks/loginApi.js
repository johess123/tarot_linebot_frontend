import axios from 'axios';

const login = async (userId) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/admin/login",
            { userId },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        return 'fail';
    }
};

export default {
    login,
};
