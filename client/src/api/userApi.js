const userApi = {
    async fetchUserProfile(userId) {
      try {
        const response = await fetch(`http://localhost:8081/api/profile/${userId}`);
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Không thể tải thông tin tài khoản");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Lỗi khi gọi API fetchUserProfile:", error);
        throw new Error(`Lỗi tải thông tin tài khoản: ${error.message}`);
      }
    },
  };
  
  export default userApi;
  