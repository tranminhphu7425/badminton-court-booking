export const sportTypeApi = {
    async fetchSportTypes(){
      try {
        const response = await fetch('http://localhost:8081/api/sporttypes');
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch courts");
        }
  
        const data = await response.json();
        return data;
      }
      catch(error){
        console.error('Fetch courts error: ', error);
        throw new Error(`Lỗi tải danh sách các môn thể thao: ${error.message}`)
      }
    },
}