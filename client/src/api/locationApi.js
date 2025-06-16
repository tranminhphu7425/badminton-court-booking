const api = {
  // Lấy danh sách địa điểm (theo sportCode hoặc tất cả)
  async fetchLocationsBySport(sportCode) {
    try {
      let response;
      if (sportCode === "all") {
        response = await fetch(`http://localhost:8081/api/locations`);
      } else {
        response = await fetch(
          `http://localhost:8081/api/locations?sportcode=${sportCode}`
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch locations");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch locations (by sport) error: ", error);
      throw new Error(`Lỗi tải danh sách các địa điểm: ${error.message}`);
    }
  },

  // Lấy thông tin chi tiết của một địa điểm cụ thể theo ID
  async fetchLocationById(locationId) {
    try {
      const response = await fetch(
        `http://localhost:8081/api/locations/${locationId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch location");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch location (by ID) error: ", error);
      throw new Error(`Lỗi tải thông tin địa điểm: ${error.message}`);
    }
  },
};

export default api;

  

