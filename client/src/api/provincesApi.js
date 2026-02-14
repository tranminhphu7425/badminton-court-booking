import axios from 'axios';

const API_BASE_URL = 'https://provinces.open-api.vn/api/v2/';


export const getProvinces = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}p`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching provinces:', error);
        throw error;
    }
}

export const getDistricts = async (provinceCode) => {
    try{
        const response = await axios.get(`${API_BASE_URL}p/${provinceCode}?depth=2`);
        return response.data.districts || [];
    }
    catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
}

export const getWards = async (districtCode) => {
    try {
      const response = await axios.get(`${API_BASE_URL}d/${districtCode}?depth=2`);
      return response.data.wards || [];
    } catch (error) {
      console.error('Error fetching wards:', error);
      return [];
    }
  };