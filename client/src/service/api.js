import axios from 'axios';
// Replace with your API base URL


const API_BASE_URL = 'http://localhost:3000';
// Function to fetch products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};






export default getProducts;