import axios from "axios";

export const getToken = () => localStorage.getItem('token');

export const saveToken = token => localStorage.setItem('token', token);

export const removeToken = () => localStorage.removeItem('token');

export const getUserDetails = async(token) => {
    try {
        const response = await axios.get('/api/user/details', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Assuming the API returns user details in response data
    } catch (error) {
        console.error('Error fetching user details', error);
        return null;
    }
};