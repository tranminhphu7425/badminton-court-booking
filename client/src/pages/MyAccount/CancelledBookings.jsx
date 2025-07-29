import { useState, useEffect } from "react";
import { FaTimesCircle, FaCalendarAlt, FaClock, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import Section from "../../components/Section";

const CancelledBookings = () => {
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCancelledBookings = async () => {
      try {
        // Mock API call - Thay bằng API thực tế
        setTimeout(() => {
          const mockData = [
            {
              id: "CAN-001",
              courtName: "Sân bóng đá Hoa Lư",
              sportType: "Bóng đá",
              date: "15/06/2024",
              time: "16:00 - 18:00",
              price: "350.000đ",
              cancelledDate: "14/06/2024",
              reason: "Thay đổi kế hoạch",
              image: "https://via.placeholder.com/150"
            },
            {
              id: "CAN-002",
              courtName: "Sân cầu lông Sunshine",
              sportType: "Cầu lông",
              date: "20/06/2024",
              time: "19:00 - 21:00",
              price: "200.000đ",
              cancelledDate: "18/06/2024",
              reason: "Thời tiết xấu",
              image: "https://via.placeholder.com/150"
            },
            {
              id: "CAN-003",
              courtName: "Sân tennis Quận 1",
              sportType: "Tennis",
              date: "10/06/2024",
              time: "08:00 - 09:30",
              price: "250.000đ",
              cancelledDate: "09/06/2024",
              reason: "Sân bảo trì",
              image: "https://via.placeholder.com/150"
            }
          ];
          setCancelledBookings(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Không thể tải danh sách đơn đã hủy");
        setLoading(false);
        console.error(err);
      }
    };

    fetchCancelledBookings();
  }, []);

  const handleReBook = (courtId) => {
    // Xử lý đặt lại sân
    console.log("Re-booking court:", courtId);
    // navigate(`/book/${courtId}`);
  };

  if (loading) {
    return (
      <div className="cancelled-bookings-page min-h-screen dark:bg-gray-800">
        <section className="hero-section bg-red-700 dark:bg-red-800 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">
                Đơn Đã Hủy
              </h1>
              <p className="text-lg dark:text-gray-200">
                Danh sách các đơn đặt sân đã hủy
              </p>
            </div>
          </div>
        </section>

        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Đang tải danh sách đơn hủy...
            </p>
          </div>
        </Section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cancelled-bookings-page min-h-screen dark:bg-gray-800">
        <section className="hero-section bg-red-700 dark:bg-red-800 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">
                Đơn Đã Hủy
              </h1>
            </div>
          </div>
        </section>

        <Section>
          <div className="text-center py-12">
            <FaTimesCircle className="mx-auto text-red-500 text-5xl mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="cancelled-bookings-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-red-700 dark:bg-red-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">
                Đơn Đã Hủy
              </h1>
              <p className="text-lg dark:text-gray-200">
                Danh sách các đơn đặt sân đã hủy
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white dark:bg-gray-100 text-red-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate('/sports/all')}
              >
                <GiTennisCourt className="mr-2" /> Đặt sân mới
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Section>
        <div className="container mx-auto px-4 py-8">
          {cancelledBookings.length === 0 ? (
            <div className="text-center py-12">
              <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Bạn chưa có đơn hủy nào
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Tất cả các đơn đặt sân của bạn đều hoạt động bình thường
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/sports/all')}
                  className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md text-sm font-medium hover:bg-red-700 dark:hover:bg-red-800"
                >
                  Đặt sân ngay
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {cancelledBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border-l-4 border-red-500"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img
                        src={booking.image}
                        alt={booking.courtName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {booking.courtName}
                        </h3>
                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                          Đã hủy
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {booking.date}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <FaClock className="text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {booking.time}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <FaMoneyBillWave className="text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {booking.price}
                          </span>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg mb-4">
                        <div className="flex items-start">
                          <FaInfoCircle className="text-red-500 dark:text-red-400 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              <span className="font-medium">Hủy lúc:</span> {booking.cancelledDate}
                              <br />
                              <span className="font-medium">Lý do:</span> {booking.reason}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300">
                          {booking.sportType}
                        </span>

                        <button
                          onClick={() => handleReBook(booking.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-md text-sm font-medium"
                        >
                          Đặt lại sân này
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default CancelledBookings;