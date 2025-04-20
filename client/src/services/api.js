const API_BASE_URL = 'http://localhost:3001/api';

export const getCourts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courts`);
    if (!response.ok) {
      throw new Error('Failed to fetch courts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching courts:', error);
    throw error;
  }
};

export const getBookings = async (date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${date}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return await response.json();
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
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}; 