import axios from 'axios';

const API_URL = "http://127.0.0.1:5000"; // Backend URL

// Get Users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
    }
};

// Delete User API 🔥 (This is Missing)
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete-user/${id}`); // ✅ Hyphen URL Fixed
    } catch (error) {
        console.error("Delete API Error:", error);
    }
};
