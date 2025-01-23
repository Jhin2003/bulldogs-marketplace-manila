import axios from 'axios';



const API_BASE_URL = 'http://localhost:3000';

// Function to fetch products
const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch product by ID
 const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Re-throw the error so the hook can handle it
  }
};

 const addProduct= async (productData, images) => {
  const formData = new FormData();

  // Append product details
  formData.append("name", productData.name);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("categoryId", productData.categoryId);
  formData.append("userId", productData.userId);

  // Append each image file to the FormData
  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    // Make a POST request to the backend API
    const response = await axios.post(`${API_BASE_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to handle file uploads
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Rethrow error to be handled in the hook
  }
};




// Fetch all categories
const getCategories = async () => {
  try {
    const response = await axios(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error
  }
};


 const getMessages = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/messages/${userId}`);  // Assuming your API filters messages by userId
    return response.data;  // Return the messages for the logged-in user
  } catch (error) {
    throw new Error('Error fetching messages: ' + error.message);
  }
};
const authenticateSignup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data; // Return parsed response data
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error for the caller to handle
  }
};


  const authenticateLogin = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
      } else {
        // Something else happened during setup
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  };




export {getProducts,getProductById, addProduct, getCategories, getMessages, authenticateSignup, authenticateLogin}