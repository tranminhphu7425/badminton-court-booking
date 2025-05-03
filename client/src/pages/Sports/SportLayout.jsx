import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { GiTennisCourt } from 'react-icons/gi';
import Select from 'react-select';
import AddressSelector from '../../components/AddressSelector'; 
import {sportTypeApi} from "../../api/sportTypeApi";

import CourtCard from '../../components/CourtCard';
import { useParams } from 'react-router-dom';


const api =  {
  async fetchLocations(){
    try {
      const response = await fetch('http://localhost:8081/api/locations');
      if (!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch locations");
      }

      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('Fetch locations error: ', error);
      throw new Error(`Lỗi tải danh sách các địa điểm: ${error.message}`)
    }
  },
};



const SportLayout  = () => {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [locations, setLocations] = useState([]);
  
  // State cho bộ lọc
  const [filters, setFilters] = useState({
    province: null,
    district: null,
    ward: null,
    priceRange: [0, 200000],
    availableWithinHour: false,
    rating: 0,
    amenities: {
      parking: false,
      shower: false,
      drinks: false,
      lights: false
    }
  });

  const {sportCode} = useParams();
  console.log('SportCode:', sportCode);
  const [sportType, setSportType] = useState(null);
  
  const handleAddressChange = (address) => {
    setFilters({
      ...filters,
      province: address.province?.name || '',
      district: address.district?.name || '',
      ward: address.ward?.name || ''
    });
  };

  useEffect(() => {
    const loadSportTypes = async(sportCode) => {
      try{
        const data = await sportTypeApi.fetchSportTypes();
        console.log('sedfsdfs:', data);
        const targetsportType = data.find(item => item.SportCode === sportCode);
        setSportType(targetsportType);
        setLoading(false);
      } catch (err) {
             
          console.error(err);
      } 
    };
    loadSportTypes(sportCode);
  }, [sportCode]);

  console.log('SportType:', sportType);
  // Dữ liệu mẫu - trong thực tế bạn sẽ fetch từ API
  useEffect(() => {
    // const mockCourts = [
    //   {
    //     id: 1,
    //     name: 'Sân cầu lông Phú Thọ',
    //     image: '/images/badminton-1.jpg',
    //     address: '1 Lữ Gia, Phường 15, Quận 11, TP.HCM',
    //     priceRange: [100000, 150000],
    //     rating: 4.5,
    //     availableSlots: ['15:00-16:00', '16:00-17:00', '19:00-20:00'],
    //     amenities: ['parking', 'lights', 'drinks'],
    //     province: 'TP.HCM',
    //     district: 'Quận 11',
    //     ward: 'Phường 15'
    //   },
    //   {
    //     id: 2,
    //     name: 'Sân cầu lông Quận 7',
    //     image: '/images/badminton-2.jpg',
    //     address: '78 Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM',
    //     priceRange: [120000, 180000],
    //     rating: 4.7,
    //     availableSlots: ['14:00-15:00', '17:00-18:00'],
    //     amenities: ['parking', 'shower', 'lights'],
    //     province: 'TP.HCM',
    //     district: 'Quận 7',
    //     ward: 'Phường Tân Phú'
    //   },
    //   {
    //     id: 3,
    //     name: 'Sân cầu lông Thủ Đức',
    //     image: '/images/badminton-3.jpg',
    //     address: '12 Võ Văn Ngân, Phường Linh Chiểu, Thủ Đức, TP.HCM',
    //     priceRange: [80000, 120000],
    //     rating: 4.2,
    //     availableSlots: ['16:00-17:00', '20:00-21:00'],
    //     amenities: ['parking', 'drinks'],
    //     province: 'TP.HCM',
    //     district: 'Thủ Đức',
    //     ward: 'Phường Linh Chiểu'
    //   },
    //   {
    //     id: 4,
    //     name: 'Sân cầu lông Gò Vấp',
    //     image: '/images/badminton-4.jpg',
    //     address: '45 Quang Trung, Phường 10, Gò Vấp, TP.HCM',
    //     priceRange: [150000, 200000],
    //     rating: 4.8,
    //     availableSlots: ['15:00-16:00', '18:00-19:00'],
    //     amenities: ['parking', 'shower', 'lights', 'drinks'],
    //     province: 'TP.HCM',
    //     district: 'Gò Vấp',
    //     ward: 'Phường 10'
    //   }
    // ];

    const loadLocations = async() => {
      try{
        const data = await api.fetchLocations();
        setLocations(data);
        console.log('Locations:', data);
        setFilteredCourts(data);
        setLoading(false);
      } catch (err) {
             
          console.error(err);
      } 
    };
    loadLocations();

    
  }, []);

  // Hàm áp dụng bộ lọc
  const applyFilters = () => {
    let results = [...courts];

    // Lọc theo địa điểm
    if (filters.province) {
      results = results.filter(court => court.province === filters.province);
    }
    if (filters.district) {
      results = results.filter(court => court.district === filters.district);
    }
    if (filters.ward) {
      results = results.filter(court => court.ward === filters.ward);
    }

    // Lọc theo khoảng giá
    results = results.filter(court => 
      court.priceRange[0] >= filters.priceRange[0] && 
      court.priceRange[1] <= filters.priceRange[1]
    );

    // Lọc theo rating
    if (filters.rating > 0) {
      results = results.filter(court => court.rating >= filters.rating);
    }

    // Lọc sân có slot trống trong 1h tới
    if (filters.availableWithinHour) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      results = results.filter(court => {
        return court.availableSlots.some(slot => {
          const [startTime] = slot.split('-');
          const [hour, minute] = startTime.split(':').map(Number);
          
          // Tính thời gian còn lại đến slot (tính bằng phút)
          const minutesUntilSlot = (hour - currentHour) * 60 + (minute - currentMinute);
          return minutesUntilSlot >= 0 && minutesUntilSlot <= 60;
        });
      });
    }

    // Lọc theo tiện ích
    const selectedAmenities = Object.entries(filters.amenities)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    if (selectedAmenities.length > 0) {
      results = results.filter(court => 
        selectedAmenities.every(amenity => court.amenities.includes(amenity)));
    }

    setFilteredCourts(results);
    setShowFilters(false);
  };

  // Reset bộ lọc
  const resetFilters = () => {
    setFilters({
      province: null,
      district: null,
      ward: null,
      priceRange: [0, 200000],
      availableWithinHour: false,
      rating: 0,
      amenities: {
        parking: false,
        shower: false,
        drinks: false,
        lights: false
      }
    });
    setFilteredCourts(courts);
  };

  // Hàm kiểm tra xem có filter đang được áp dụng không
    
    const isFilterActive = () => {
      return (
        filters.province ||
        filters.district ||
        filters.ward ||
        filters.priceRange[0] !== 0 || 
        filters.priceRange[1] !== 200000 ||
        filters.availableWithinHour ||
        filters.rating > 0 ||
        Object.values(filters.amenities).some(Boolean)
      );
    };
  
  return sportType ? (
    <div className="badminton-page">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">Sân {sportType.SportName}</h1>
              <p className="text-lg">Tìm và đặt sân {sportType.SportName.toLowerCase()} ưng ý nhất</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate('/booking')}
              >
                <FaCalendarAlt className="mr-2" /> Đặt sân ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={`Tìm sân ${sportType.SportName.toLowerCase()}...`}
                className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center ${isFilterActive() ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" /> Bộ lọc {isFilterActive() && `(${filteredCourts.length})`}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Lọc theo địa điểm */}
               
                  
                  <AddressSelector onAddressChange={handleAddressChange} />
               

                {/* Lọc theo giá */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khoảng giá: {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} VNĐ
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters({...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]]})}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min={filters.priceRange[0]}
                      max="200000"
                      step="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Lọc theo rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá từ</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: parseInt(e.target.value)})}
                  >
                    <option value="0">Tất cả</option>
                    <option value="4">4 sao trở lên</option>
                    <option value="4.5">4.5 sao trở lên</option>
                  </select>
                </div>

                {/* Lọc theo thời gian trống */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="availableWithinHour"
                    checked={filters.availableWithinHour}
                    onChange={(e) => setFilters({...filters, availableWithinHour: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="availableWithinHour" className="ml-2 block text-sm text-gray-700 flex items-center">
                    <FaClock className="mr-1" /> Có lịch trống trong 1h tới
                  </label>
                </div>

                {/* Lọc theo tiện ích */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tiện ích</label>
                  <div className="space-y-2">
                    {Object.entries(filters.amenities).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`amenity-${key}`}
                          checked={value}
                          onChange={(e) => setFilters({
                            ...filters,
                            amenities: {
                              ...filters.amenities,
                              [key]: e.target.checked
                            }
                          })}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`amenity-${key}`} className="ml-2 block text-sm text-gray-700 capitalize">
                          {key === 'parking' && 'Chỗ đậu xe'}
                          {key === 'shower' && 'Phòng tắm'}
                          {key === 'drinks' && 'Nước uống'}
                          {key === 'lights' && 'Đèn chiếu sáng'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Đặt lại
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải danh sách sân...</p>
            </div>
          ) : filteredCourts.length === 0 ? (
            <div className="text-center py-12">
              <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Không tìm thấy sân phù hợp</h3>
              <p className="mt-1 text-gray-500">Hãy thử điều chỉnh bộ lọc của bạn</p>
              <div className="mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800">
                  {filteredCourts.length} sân {sportType.SportName.toLowerCase()} phù hợp
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sắp xếp:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>Phổ biến nhất</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourts.map((location) => (
                  <CourtCard 
                    key={location.LoactionID}
                    name={location.LocationName}
                    image={location.image}
                    location={location.Address}
                    // price={`${court.priceRange[0].toLocaleString()} - ${court.priceRange[1].toLocaleString()}đ/giờ`}
                    rating={location.AverageRating}
                    sport={sportType.SportCode}
                    link={`/court/${location.LocationID}`}
                    badges={
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded mr-1 inline-flex items-center">
                        <FaClock className="mr-1" /> 
                        {location.OpeningTime.split(":").slice(0, 2).join(":")} - {location.ClosingTime.split(":").slice(0, 2).join(":")}
                      </span>
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  ) : null;
};

export default SportLayout;