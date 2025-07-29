import { useState, useEffect } from "react";
import { FaClock, FaCalendarAlt, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ShowList from "../../components/ShowList";

import Section from "../../components/Section";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(0);
  const navigate = useNavigate();

  // Mock data - Thay thế bằng API call thực tế
  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        // Giả lập API call
        setTimeout(() => {
          const mockBookings   = [
            {
              LocationID: 1,
              LocationName: "Sân bóng đá Hoa Lư",
              Address: "Địa chỉ chưa xác định",
              province: "TP. Hồ Chí Minh",
              district: "Quận 1",
              ward: "Không xác định",
              OpeningTime: "16:00:00",
              ClosingTime: "18:00:00",
              AverageRating: "Chưa có",
              ReviewCount: 0,
              Reviews: [],
              Description: null,
              Sports: [{ sportType: "Bóng đá", price: "350.000đ", date: "15/06/2024", status: "completed" }],
              amenities: {
                parking: 0,
                shower: 0,
                drinks: 0,
                lights: 0
              },
              ContactEmail: "Không có",
              ContactPhone: "Không có",
              image: "https://via.placeholder.com/150",
              Images: ["https://via.placeholder.com/150"]
            },
            {
              LocationID: 2,
              LocationName: "Sân cầu lôn Sunshine",
              Address: "Địa chỉ chưa xác định",
              province: "TP. Hồ Chí Minh",
              district: "Quận 2",
              ward: "Không xác định",
              OpeningTime: "19:00:00",
              ClosingTime: "21:00:00",
              AverageRating: "Chưa có",
              ReviewCount: 0,
              Reviews: [],
              Description: null,
              Sports: [{ sportType: "Cầu lông", price: "200.000đ", date: "20/06/2024", status: "upcoming" }],
              amenities: {
                parking: 0,
                shower: 0,
                drinks: 0,
                lights: 0
              },
              ContactEmail: "Không có",
              ContactPhone: "Không có",
              image: "https://via.placeholder.com/150",
              Images: ["https://via.placeholder.com/150"]
            },
            {
              LocationID: 3,
              LocationName: "Sân tennis Quận 1",
              Address: "Địa chỉ chưa xác định",
              province: "TP. Hồ Chí Minh",
              district: "Quận 1",
              ward: "Không xác định",
              OpeningTime: "08:00:00",
              ClosingTime: "09:30:00",
              AverageRating: "Chưa có",
              ReviewCount: 0,
              Reviews: [],
              Description: null,
              Sports: [{ sportType: "Tennis", price: "250.000đ", date: "10/06/2024", status: "cancelled" }],
              amenities: {
                parking: 0,
                shower: 0,
                drinks: 0,
                lights: 0
              },
              ContactEmail: "Không có",
              ContactPhone: "Không có",
              image: "https://via.placeholder.com/150",
              Images: ["https://via.placeholder.com/150"]
            }
          ];
          
          
          setBookings(mockBookings);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Không thể tải lịch sử đặt sân");
        setLoading(false);
        console.error(err);
      }
    };

    fetchBookingHistory();
  }, []);

  

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-4xl mb-4">
          <FaTimesCircle className="mx-auto" />
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="booking-history-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                Lịch sử đặt sân
              </h1>
              <p className="text-lg dark:text-gray-200">
                Xem lại các đặt sân đã hoàn thành và sắp tới
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate('/sports/all')}
              >
                <GiSoccerField className="mr-2" /> Đặt sân mới
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Section>
      {loading ?  
     (
      <div className="text-center py-12 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Đang tải lịch sử đặt sân...
        </p>
      </div>
    )
  :
        <div className="container mx-auto px-4 py-8">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <GiSoccerField className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Chưa có lịch sử đặt sân
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Hãy đặt sân để bắt đầu trải nghiệm
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/sports/all')}
                  className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                >
                  Đặt sân ngay
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <ShowList
                filteredCourts={bookings}
                sportCode={"all"}
                sportType={null}
                mode={mode}
                setMode={setMode}
                
              />
           
            </div>
          )}
        </div>
      }
  </Section>
  
    </div>
  );
};
export default BookingHistory;