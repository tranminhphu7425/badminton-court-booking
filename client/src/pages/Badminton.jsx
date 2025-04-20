import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { getBookings, createBooking } from "../services/api";

function Badminton() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const numberCourts = 6;
  // Danh sách sân và giờ hoạt động
  const courts = Array.from({length: numberCourts}, (_, i) => i + 1);

  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7h - 22h
  

  // Format date thành YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Fetch bookings when date changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const formattedDate = formatDate(currentDate);
        const data = await getBookings(formattedDate);
        setBookings(data);
      } catch (err) {
        setError('Không thể tải dữ liệu đặt sân');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentDate]);

  // Thay đổi ngày
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    resetSelection();
  };

  // Reset lựa chọn khi chuyển ngày
  const resetSelection = () => {
    setSelectedCourt(null);
    setSelectedTime(null);
  };

  // Kiểm tra slot đã đặt chưa
  const isBooked = (court, time) => {
    return bookings.some(
      (booking) =>
        booking.CourtID === court &&
        booking.StartTime === time
    );
  };

  // Kiểm tra ngày hiện tại
  const isCurrentDay = () => {
    const now = new Date();
    return formatDate(currentDate) === formatDate(now);
  };

  // Kiểm tra sân trống trong 1 tiếng tới
  const getAvailableCourtsInNextHour = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = currentHour + 1;
    
    // Chỉ kiểm tra nếu giờ tiếp theo nằm trong khoảng hoạt động (7h-22h)
    if (nextHour < 7 || nextHour > 22) {
      return [];
    }
    return courts.filter(court => !isBooked(court, nextHour));
  };

  // Đặt sân
  const handleBookCourt = async () => {
    if (!selectedTime || !selectedCourt) return;

    try {
      setLoading(true);
      setError(null);
      
      const bookingData = {
        courtId: selectedCourt,
        date: formatDate(currentDate),
        startTime: selectedTime,
        endTime: selectedTime + 1,
        customerName: "Khách hàng A",
        customerPhone: "0123456789"
      };

      await createBooking(bookingData);
      
      // Refresh bookings after successful booking
      const formattedDate = formatDate(currentDate);
      const updatedBookings = await getBookings(formattedDate);
      setBookings(updatedBookings);
      
      resetSelection();
    } catch (err) {
      setError('Không thể đặt sân. Vui lòng thử lại sau.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
          ĐẶT LỊCH SÂN CẦU LÔNG
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sân 1 - 4 | Mở cửa 7h - 22h hàng ngày
        </p>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="text-center mb-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
          </div>
        )}

        {/* Current Availability */}
        {isCurrentDay() && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2 text-center">Sân trống trong 1 tiếng tới:</h2>
            <div className="flex flex-wrap gap-2">
              {getAvailableCourtsInNextHour().length > 0 ? (
                getAvailableCourtsInNextHour().map(court => (
                  <span key={court} className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Sân {court}
                  </span>
                ))
              ) : (
                <span className="text-gray-600">Không có sân trống</span>
              )}
            </div>
          </div>
        )}

        {/* Date Navigator */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={() => changeDate(-1)}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="relative">
              <DatePicker
                selected={currentDate}
                onChange={(date) => setCurrentDate(date)}
                dateFormat={"dd/MM/yyyy"}
                locale={vi}
                minDate={new Date(new Date().setDate(new Date().getDate() - 10))}
                className="px-4 py-2 bg-white text-blue-800 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Chọn ngày"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-2.5 text-blue-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => changeDate(-7)}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
            >
              Tuần trước
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Hôm nay
            </button>
            <button
              onClick={() => changeDate(7)}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
            >
              Tuần sau
            </button>
            
          </div>
        </div>

        {/* Booking Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="p-2 text-white font-bold text-center">Sân</th>
                {hours.map((hour) => (
                  <th
                    key={hour}
                    className={`p-2 text-center text-white font-bold ${
                      selectedTime === hour ? "bg-blue-700" : ""
                    }`}
                  >
                    {hour}h - {hour + 1}h
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courts.map((court) => (
                <tr
                  key={court}
                  className={`${
                    selectedCourt === court ? "bg-blue-50" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <td className="p-2 whitespace-nowrap text-center font-medium text-gray-900">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      Sân {court}
                    </span>
                  </td>
                  {hours.map((hour) => {
                    const isSlotBooked = isBooked(court, hour);
                    const isSlotSelected =
                      selectedCourt === court && selectedTime === hour;

                    return (
                      <td
                        key={`${court}-${hour}`}
                        onClick={() => {
                          if (!isSlotBooked) {
                            setSelectedCourt(court);
                            setSelectedTime(hour);
                          }
                        }}
                        className={`p-2 text-center font-medium cursor-pointer transition-all ${
                          isSlotBooked
                            ? "bg-red-100 text-red-800"
                            : isSlotSelected
                            ? "bg-green-200 text-green-800"
                            : "hover:bg-green-50 text-gray-700"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          {isSlotBooked ? (
                            <>
                              <span className="text-sm">Đã đặt</span>
                            </>
                          ) : (
                            "Trống"
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Booking Button */}
        {selectedCourt && selectedTime && (
          <div className="mt-6 text-center">
            <button
              onClick={handleBookCourt}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : `Đặt sân ${selectedCourt} lúc ${selectedTime}:00`}
            </button>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}

export default Badminton;
