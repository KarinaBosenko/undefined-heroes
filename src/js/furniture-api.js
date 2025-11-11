import axios from 'axios';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';

// categories
export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
// furniture
export async function fetchDefaultFurniture(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/furnitures`, {
      params: {
        limit: 8,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching default furniture:', error);
    throw error;
  }
}

// furniture by category
export async function fetchFurnitureByCategory(category, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/furnitures`, {
      params: {
        category: category,
        limit: 8,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching furniture for category ${category}:`, error);
    throw error;
  }
}
// furniture by id
export async function fetchFurnitureById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/furnitures/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching furniture with id ${id}:`, error);
    throw error;
  }
}

// feedback
export async function fetchFeedbacks() {
  try {
    const response = await axios.get(`${BASE_URL}/feedbacks`, {
      params: {
        limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
}
// submit order
export async function submitOrder(orderData) {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}

// popular furniture
export async function fetchPopularFurniture() {
  try {
    const response = await axios.get(`${BASE_URL}/furnitures`, {
      params: {
        type: 'popular',
        // limit: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular furniture:', error);
    throw error;
  }
}
