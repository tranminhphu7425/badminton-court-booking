import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";

function Badminton() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([
    {
      id: 1,
      court: "S01",
      date: "2025-04-22",
      time: "7",
      user: "Nguyễn Văn A",
      phone: "0987654321",
      status: "confirmed",
    },
    {
      id: 2,
      court: "S02",
      date: "2025-04-22",
      time: "8",
      user: "Trần Thị B",
      phone: "0912345678",
      status: "confirmed",
    },
    {
      id: 3,
      court: "S03",
      date: "2025-04-22",
      time: "9",
      user: "Lê Văn C",
      phone: "0978123456",
      status: "confirmed",
    },
    {
      id: 4,
      court: "S01",
      date: "2025-04-22",
      time: "10",
      user: "Phạm Thị D",
      phone: "0965432187",
      status: "confirmed",
    },
    {
      id: 5,
      court: "S02",
      date: "2025-04-22",
      time: "11",
      user: "Hoàng Văn E",
      phone: "0934567890",
      status: "confirmed",
    },
    {
      id: 6,
      court: "S03",
      date: "2024-04-22",
      time: "12",
      user: "Vũ Thị F",
      phone: "0945678901",
      status: "confirmed",
    },
    {
      id: 7,
      court: "S01",
      date: "2024-04-22",
      time: "13",
      user: "Đặng Văn G",
      phone: "0923456789",
      status: "confirmed",
    },
    {
      id: 8,
      court: "S02",
      date: "2024-04-22",
      time: "14",
      user: "Bùi Thị H",
      phone: "0956789012",
      status: "confirmed",
    },
    {
      id: 9,
      court: "S03",
      date: "2024-04-22",
      time: "15",
      user: "Mai Văn I",
      phone: "0967890123",
      status: "confirmed",
    },
    {
      id: 10,
      court: "S01",
      date: "2024-04-22",
      time: "16",
      user: "Lý Thị K",
      phone: "0978901234",
      status: "confirmed",
    },
  ]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Danh sách sân và giờ hoạt động
  const courts = [1, 2, 3, 4, 5, 6];
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7h - 22h

  // Format date thành YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    if (typeof date === "string") {
      const d = new Date(date);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split("T")[0];
    }
    return date.toISOString().split("T")[0];
  };

  // Kiểm tra slot đã đặt chưa
  const isBooked = (court, time) => {
    return bookings.some((booking) => {
      const bookingCourt = parseInt(booking.court.replace("S0", ""));
      const bookingTime = parseInt(booking.time);
      const currentFormattedDate = formatDate(currentDate);
      const bookingFormattedDate = formatDate(booking.date);

      return (
        bookingCourt === court &&
        bookingTime === time &&
        bookingFormattedDate === currentFormattedDate
      );
    });
  };

  // Fetch bookings từ API
  const fetchBookings = async (date) => {
    try {
      setLoading(true);
      const formattedDate = formatDate(date);
      console.log("Fetching bookings for date:", formattedDate);

      const response = await fetch(
        `http://localhost:8081/api/bookings/${formattedDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch bookings");
      }

      const data = await response.json();
      console.log("Received bookings:", data);
      setBookings(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  // Đặt sân
  const handleBookCourt = async () => {
    if (!selectedTime || !selectedCourt) return;

    try {
      const response = await fetch("http://localhost:8081/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          court: selectedCourt,
          date: formatDate(currentDate),
          time: selectedTime,
          user: "Khách hàng A",
        }),
      });

      if (!response.ok) throw new Error("Failed to book court");

      const newBooking = await response.json();
      setBookings([...bookings, newBooking]);
      resetSelection();
    } catch (err) {
      console.error("Error booking court:", err);
      setError(err.message);
    }
  };

  // Load bookings khi component mount hoặc ngày thay đổi
  useEffect(() => {
    fetchBookings(currentDate);
  }, [currentDate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
          ĐẶT LỊCH SÂN CẦU LÔNG
        </h1>
        {loading && (
          <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-2 text-center">
            Đang tải dữ liệu...
          </div>
        )}
        {error && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
            Lỗi: {error}
          </div>
        )}
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
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider rounded-tl-2xl">
                  Sân
                </th>
                {hours.map((hour) => (
                  <th
                    key={hour}
                    className={`px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider ${
                      selectedTime === hour ? "bg-blue-700/90" : ""
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{hour}h - </span>
                      <span className="text-xs font-normal opacity-90">
                        {hour + 1}h
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courts.map((court) => (
                <tr
                  key={court}
                  className={`${
                    selectedCourt === court ? "bg-blue-50" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Sân {court}
                      </div>
                    </div>
                  </td>
                  {hours.map((hour) => {
                    const isSlotBooked = isBooked(court, hour);
                    const isSlotSelected =
                      selectedCourt === court && selectedTime === hour;
                    const booking = bookings.find(
                      (b) =>
                        parseInt(b.court) === court && parseInt(b.time) === hour
                    );

                    return (
                      <td
                        key={`${court}-${hour}`}
                        onClick={() => {
                          if (!isSlotBooked) {
                            setSelectedCourt(court);
                            setSelectedTime(hour);
                          }
                        }}
                        className={`px-2 py-1 text-center cursor-pointer transition-all ${
                          isSlotBooked
                            ? "bg-rose-50/70 hover:bg-rose-100/70"
                            : isSlotSelected
                            ? "bg-emerald-100 hover:bg-emerald-200"
                            : "hover:bg-emerald-50"
                        }`}
                      >
                        <div
                          className={`inline-flex min-w-17 h-20 flex-col items-center justify-center p-2 rounded-lg min-h-[60px] w-full ${
                            isSlotBooked
                              ? "border border-rose-200 bg-white"
                              : isSlotSelected
                              ? "border-2 border-emerald-400"
                              : "border border-gray-200"
                          }`}
                        >
                          {isSlotBooked ? (
                            <>
                              <span className="text-xs font-semibold text-rose-600">
                                Đã được đặt
                              </span>
                              <span className="text-xs mt-1 text-rose-500 truncate max-w-[80px]">
                                {booking?.user || "Guest"}
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                className={`text-sm font-medium ${
                                  isSlotSelected
                                    ? "text-emerald-700"
                                    : "text-gray-600"
                                }`}
                              >
                                Trống
                              </span>
                              {!isSlotSelected && (
                                <span className="mt-1 text-[10px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded">
                                  Nhấn để đặt
                                </span>
                              )}
                            </>
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

export default Badminton;
