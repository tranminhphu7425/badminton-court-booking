const API_BASE_URL = 'http://localhost:3001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const getCourts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching courts:', error);
    throw error;
  }
};

export const getBookings = async (date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}; 