import axios from 'axios';

const createFAQ = async (question, answer) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/admin/qes_ans', {
            qes: question,
            ans: answer,
        });
        return response.status === 200 ? response.data : 'fail';
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return 'fail';
    }
};

const getFAQs = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/admin/qes_ans');
        return response.status === 200 ? response.data : 'fail';
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return 'fail';
    }
};

const updateFAQ = async (serial_number, question, answer) => {
    try {
        const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/admin/qes_ans/${serial_number}`, {
            qes: question,
            ans: answer,
        });
        return response.status === 200 ? response.data : 'fail';
    } catch (error) {
        console.error('Error updating FAQ:', error);
        return 'fail';
    }
};

const deleteFAQ = async (id) => {
    try {
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/admin/qes_ans/${id}`);
        return response.status === 200 ? response.data : 'fail';
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        return 'fail';
    }
};

export default {
    createFAQ,
    getFAQs,
    updateFAQ,
    deleteFAQ,
};
