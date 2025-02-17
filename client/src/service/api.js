import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000';

const getProducts = async ({ page = 1, limit = 10, search = "", categoryId = "" }) => {
  try {
    // Prepare the query parameters
    const params = {
      page,
      limit,
      ...(search && { search }),        // Only include search if it's not an empty string
      ...(categoryId && { categoryId }), // Only include categoryId if it's not an empty string
    };

    // Make the GET request with the params
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    return response.data // Return the data from the response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Optionally throw the error for use in the calling component
  }
}

const getUserProducts = async (id) => {
  try {
    // Make the GET request with the params
    const response = await axios.get(`${API_BASE_URL}/user/${id}/products`);
    return response.data // Return the data from the response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Optionally throw the error for use in the calling component
  }
}


const getUserLikes = async (id) => {
  try {
    // Make the GET request with the params
    const response = await axios.get(`${API_BASE_URL}/user/${id}/likes`);
    return response.data // Return the data from the response
  } catch (error) {
    console.error("Error fetching Likes:", error);
    throw error; // Optionally throw the error for use in the calling component
  }
}



const getUserReviews = async (id) => {
  try {
    // Make the GET request with the params
    const response = await axios.get(`${API_BASE_URL}/user/${id}/reviews`);
    return response.data // Return the data from the response
  } catch (error) {
    console.error("Error fetching Reviews:", error);
    throw error; // Optionally throw the error for use in the calling component
  }
}
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
    formData.append("product_images", image);
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


const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);

    return response.data; // Return the response data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Something went wrong');
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

const getLikeStatus = async (userId, productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/like/status`, {
      params: { userId, productId }, // Pass as query parameters
    });
    console.log()
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error fetching like status:', error);
    throw error;
  }
};

const likeProduct = async (userId, productId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/like`, { userId, productId });
    return response.data; // Return the created like
  } catch (error) {
    console.error('Error liking product:', error);
    throw error;
  }
};

export const unlikeProduct = async (userId, productId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/like`, { data: { userId, productId }});
    return response.data;  // Assuming the response confirms the unlike
  } catch (error) {
    console.error('Error unliking product:', error);
    throw error;
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

const sendMessage = async (senderId, receiverId, message) => {


  const messageData = {
    senderId,
    receiverId,
    message : message,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/messages/send` ,messageData, )
    return response.data
  } 
  catch(e){
    throw e
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
      return response.data
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        // Server responded with a status other than 2xx
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


  
const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_BASE_URL}/user/${id}`, 
      {
        headers: { Authorization: `Bearer ${token}` } // Headers should be in the third argument
      }
    );
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      // Server responded with a status other than 2xx
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



  const updateUser = async (id, userData) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("email", userData.email);
    if (userData.image) {
      formData.append("user_image", userData.image);
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/user/${id}`, formData, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error
    }
  
  };

export {getProducts ,getProductById, getUserProducts, getUserLikes, getUserReviews,updateUser, addProduct, deleteProduct, getCategories, 
  getMessages, sendMessage, getLikeStatus, likeProduct, authenticateSignup, authenticateLogin, getUserById}