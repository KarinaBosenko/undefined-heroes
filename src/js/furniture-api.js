import axios from 'axios';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';

// categories
export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
// furniture
export async function fetchDefaultFurniture() {
  try {
    const response = await axios.get(`${BASE_URL}/furnitures`, {
      params: {
        limit: 8,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching default furniture:', error);
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
  }
}
// popular furniture
export async function fetchPopularFurniture() {
  try {
    const response = await axios.get(`${BASE_URL}/furnitures`, {
      params: {
        type: 'popular',
        limit: 3,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular furniture:', error);
  }
}
