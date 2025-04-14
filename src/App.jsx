import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Danh sách sân và giờ hoạt động
  const courts = [1, 2, 3, 4, 5, 6];
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7h - 22h

  // Format date thành YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

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
        booking.court === court &&
        booking.date === formatDate(currentDate) &&
        booking.time === time
    );
  };

  // Kiểm tra slot hiện tại (real-time highlight)
  const isCurrentHour = (hour) => {
    const now = new Date();
    return (
      formatDate(currentDate) === formatDate(now) && hour === now.getHours()
    );
  };

  // Đặt sân
  const handleBookCourt = () => {
    if (!selectedTime || !selectedCourt) return;

    const newBooking = {
      court: selectedCourt,
      date: formatDate(currentDate),
      time: selectedTime,
      user: "Khách hàng A",
    };

    setBookings([...bookings, newBooking]);
    resetSelection();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
          ĐẶT LỊCH SÂN CẦU LÔNG
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sân 1 - 4 | Mở cửa 7h - 22h hàng ngày
        </p>

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
                dateFormat="dd/MM/yyyy"
                locale={vi}
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

        {/* Booking Form Modal */}
        {selectedTime && selectedCourt && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Xác nhận đặt lịch
                </h3>
                <button
                  onClick={resetSelection}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Sân:</p>
                  <p className="text-xl font-bold text-blue-700">
                    Sân {selectedCourt}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Thời gian:</p>
                  <p className="text-xl font-bold text-blue-700">
                    {selectedTime}h - {selectedTime + 1}h
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Ngày:</p>
                  <p className="text-xl font-bold text-blue-700">
                    {formatDate(currentDate)}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Giá:</p>
                  <p className="text-xl font-bold text-blue-700">50.000đ</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={resetSelection}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleBookCourt}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors shadow-md"
                >
                  Đặt ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
