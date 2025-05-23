import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify"; // Added for better notifications
import { useParams } from "react-router-dom";
import LocationDetail from "../Sports/LocationDetail";

// Extract reusable components
const CourtCell = ({ court }) => (
  <td className="px-4 py-2 whitespace-nowrap">
    <div className="flex items-center">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
        <svg
          className="h-5 w-5 text-green-600"
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
      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Sân {parseInt(court.court.replace("S0", ""))}
      </div>
    </div>
  </td>
);

const TimeSlot = ({ court, hour, isBooked, isSelected, booking, onSelect }) => (
  <td
    onClick={() => !isBooked && onSelect(court, hour)}
    className={`px-2 py-1 text-center cursor-pointer transition-all ${
      isBooked
        ? "bg-rose-50/70 hover:bg-rose-100/70 dark:bg-rose-900/30 dark:hover:bg-rose-900/50"
        : isSelected
        ? "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900 dark:hover:bg-emerald-800"
        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
    }`}
  >
    <div
      className={`inline-flex min-w-17 h-18 flex-col items-center justify-center p-2 rounded-lg min-h-[60px] w-full ${
        isBooked
          ? "border border-rose-200 bg-white dark:bg-gray-900 dark:border-rose-800"
          : isSelected
          ? "border-2 border-emerald-400 dark:border-emerald-300"
          : "border border-gray-200 dark:border-gray-700 dark:bg-gray-900"
      }`}
    >
      {isBooked ? (
        <>
          <span
            className="text-xs font-semibold text-rose-600 dark:text-rose-400"
            title={booking?.user || "Guest"}
          >
            Đã được đặt
          </span>
        </>
      ) : (
        <>
          <span
            className={`text-sm font-medium ${
              isSelected
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Trống
          </span>
          {!isSelected && (
            <span className="mt-1 text-[10px] px-1 py-0.5 bg-green-100 text-green-700 rounded dark:bg-green-900 dark:text-green-300">
              Nhấn để đặt
            </span>
          )}
        </>
      )}
    </div>
  </td>
);

const BookingModal = ({
  selectedCourt,
  selectedTime,
  currentDate,
  formatDate,
  courts,
  onCancel,
  onConfirm,
  isSubmitting,
}) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in max-w-md w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Xác nhận đặt lịch</h3>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close booking form"
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
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600">Sân:</p>
          <p className="text-xl font-bold text-green-700">
            Sân {selectedCourt}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600">Thời gian:</p>
          <p className="text-xl font-bold text-green-700">
            {selectedTime}h - {selectedTime + 1}h
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600">Ngày:</p>
          <p className="text-xl font-bold text-green-700">
            {formatDate(currentDate)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600">Giá:</p>
          {/* <p className="text-xl font-bold text-green-700">
            {courts && selectedCourt
              ? parseInt(
                  courts.find(
                    (c) =>
                      parseInt(c.CourtNumber.replace("S0", "")) ===
                      selectedCourt
                  )?.HourlyRate
                ) + "đ/giờ"
              : "Đang tải..."}
          </p> */}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors shadow-md disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang xử lý
            </>
          ) : (
            "Đặt ngay"
          )}
        </button>
      </div>
    </div>
  </div>
);

// API service functions
const api = {
  async fetchCourts(locationId, sportTypeId) {
    try {
      const response = await fetch(
        `http://localhost:8081/api/courts?locationId=${locationId}&sportTypeId=${sportTypeId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch courts");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch courts error:", error);
      throw new Error(`Lỗi tải danh sách sân: ${error.message}`);
    }
  },
  async fetchBookings(date, locationId, sportTypeId) {
    try {
      const formattedDate = formatDate(date);
      const response = await fetch(
        `http://localhost:8081/api/bookings?date=${formattedDate}&locationId=${locationId}&sportTypeId=${sportTypeId}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch bookings");
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch bookings error:", error);
      throw new Error(`Lỗi tải lịch đặt: ${error.message}`);
    }
  },

  async createBooking(bookingData) {
    try {
      // Format thời gian
      const startTime = `${bookingData.time}:00:00`;
      const endTime = `${parseInt(bookingData.time) + 1}:00:00`;

      const response = await fetch("http://localhost:8081/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courtId: bookingData.courtId,
          customerId: bookingData.customerId || null, // Cho phép null nếu là khách vãng lai
          bookingDate: bookingData.date,
          startTime: startTime,
          endTime: endTime,
          notes: bookingData.notes || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking");
      }

      const result = await response.json();
      return {
        success: true,
        bookingId: result.booking.BookingID,
        courtNumber: result.booking.CourtNumber,
        locationName: result.booking.LocationName,
        date: result.booking.BookingDate,
        time: result.booking.StartTime,
        message: result.message,
      };
    } catch (error) {
      console.error("Create booking error:", error);
      throw new Error(`Lỗi đặt sân: ${error.message}`);
    }
  },
};

// Utility functions
const formatDate = (date) => {
  if (!date) return "";
  if (typeof date === "string") {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }
  return date.toISOString().split("T")[0];
};

// Main component
function Main() {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [selectedSport, setSelectedSport] = useState(1);

  const [loading, setLoading] = useState({
    courts: false,
    bookings: false,
    submission: false,
  });
  const [error, setError] = useState(null);

  // List of operating hours
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7h - 22h

  const { locationId, sportTypeId } = useParams();
  console.log("Location ID:", locationId);
  console.log("Sport Type ID:", sportTypeId);
  // Load courts on component mount
  useEffect(() => {
    const loadCourts = async (locationId, sportTypeId) => {
      try {
        setLoading((prev) => ({ ...prev, courts: true }));
        const data = await api.fetchCourts(locationId, sportTypeId);
        setCourts(data);

        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, courts: false }));
      }
    };

    loadCourts(locationId, sportTypeId);
  }, [locationId, sportTypeId]);

  // Load bookings when date changes
  useEffect(() => {
    const loadBookings = async (date, locationId, sportTypeId) => {
      try {
        setLoading((prev) => ({ ...prev, bookings: true }));
        const data = await api.fetchBookings(date, locationId, sportTypeId);
        setBookings(data);
        // console.log(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading((prev) => ({ ...prev, bookings: false }));
      }
    };

    loadBookings(currentDate, locationId, sportTypeId);
  }, [currentDate, locationId, sportTypeId]);

  // Check if a slot is booked
  const isBooked = (court, time) => {
    const currentFormattedDate = formatDate(currentDate);

    // Check in confirmed bookings
    const confirmedBooked = bookings.some((booking) => {
      if (!booking?.court || !booking?.time || !booking?.date) return false;

      const bookingCourt = parseInt(booking.court.replace("S0", ""));
      const bookingTime = parseInt(booking.time);
      const bookingFormattedDate = formatDate(booking.date);

      return (
        bookingCourt === court &&
        bookingTime === time &&
        bookingFormattedDate === currentFormattedDate
      );
    });

    // Check in pending bookings
    const pendingBooked = pendingBookings.some((booking) => {
      const bookingCourt = parseInt(booking.court.replace("S0", ""));
      const bookingTime = parseInt(booking.time);
      const bookingFormattedDate = formatDate(booking.date);

      return (
        bookingCourt === court &&
        bookingTime === time &&
        bookingFormattedDate === currentFormattedDate
      );
    });

    return confirmedBooked || pendingBooked;
  };

  // Change date handler
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    resetSelection();
  };

  // Reset selection handler
  const resetSelection = () => {
    setSelectedCourt(null);
    setSelectedTime(null);
  };

  // Handle slot selection
  const handleSlotSelect = (court, time) => {
    setSelectedCourt(court);
    setSelectedTime(time);
    console.log("Selected court:", court);
    console.log("Selected time:", time);
  };

  // Book court handler with improved error handling and user feedback
  const handleBookCourt = async () => {
    if (!selectedTime || !selectedCourt) {
      toast.error("Vui lòng chọn thời gian và sân");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, submission: true }));
      console.log("Selected court data:", courts);

      // Tìm thông tin sân được chọn
      const courtData = courts.find(
        (c) => c.court && parseInt(c.court.replace("S0", "")) === selectedCourt
      );
      console.log("Selected court data1:", selectedCourt);

      console.log("Court data:", courtData);

      if (!courtData) {
        throw new Error("Không tìm thấy thông tin sân");
      }

      // Chuẩn bị dữ liệu booking
      const bookingData = {
        courtId: courtData.CourtID,
        customerId: 1, // Sử dụng ID người dùng nếu đã đăng nhập
        date: formatDate(currentDate),
        time: selectedTime,
        notes: `Đặt sân ${courtData.CourtNumber}`,
      };

      // Gọi API tạo booking
      const newBooking = await api.createBooking(bookingData);

      // Thay vì thêm booking vào state hiện tại, hãy tải lại toàn bộ dữ liệu
      const updatedBookings = await api.fetchBookings(
        currentDate,
        locationId,
        sportTypeId
      );
      setBookings(updatedBookings);

      resetSelection();
      toast.success("Đặt sân thành công!");
    } catch (err) {
      console.error("Lỗi khi đặt sân:", err);
      toast.error(err.message || "Đã xảy ra lỗi khi đặt sân");
    } finally {
      setLoading((prev) => ({ ...prev, submission: false }));
    }
  };

  // Show loading indicators
  const isLoading = loading.courts || loading.bookings;

  console.log("ahsgda", courts);
  return courts ? (
    <div className="relative">
      <div>
        {/* Loading & Error States */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 bg-green-500 dark:bg-green-700 text-white p-2 text-center flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang tải dữ liệu...
          </div>
        )}

        {error && (
          <div className="bg-red-500 dark:bg-red-700 text-white p-2 text-center">
            Lỗi: {error}
          </div>
        )}
      </div>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 dark:text-green-300 mb-2">
            ĐẶT LỊCH SÂN{" "}
            {courts && courts.length > 0 ? courts[0].sportType.toUpperCase() : ""}
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Sân 1 - 4 | Mở cửa 7h - 22h hàng ngày
          </p>

          {/* Date Navigator */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={() => changeDate(-1)}
                className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-300"
                aria-label="Previous day"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
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
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-green-800 dark:text-white rounded-lg border border-green-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholderText="Chọn ngày"
                  aria-label="Select date"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-2.5 text-green-500 dark:text-green-400 pointer-events-none"
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
                className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-green-50 dark:hover:bg-gray-600 transition-all duration-300"
                aria-label="Next day"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
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
                className="px-4 py-2 bg-green-100 dark:bg-gray-700 text-green-800 dark:text-gray-200 rounded-lg hover:bg-green-200 dark:hover:bg-gray-600 transition-colors text-sm"
                aria-label="Previous week"
              >
                Tuần trước
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors text-sm"
                aria-label="Today"
              >
                Hôm nay
              </button>
              <button
                onClick={() => changeDate(7)}
                className="px-4 py-2 bg-green-100 dark:bg-gray-700 text-green-800 dark:text-gray-200 rounded-lg hover:bg-green-200 dark:hover:bg-gray-600 transition-colors text-sm"
                aria-label="Next week"
              >
                Tuần sau
              </button>
            </div>
          </div>

          {/* Booking Table */}
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden my-8">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-800 dark:to-green-700">
                <tr>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-white uppercase tracking-wider rounded-tl-2xl">
                    Sân
                  </th>
                  {hours.map((hour) => (
                    <th
                      key={hour}
                      className={`px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider ${
                        selectedTime === hour
                          ? "bg-green-700/90 dark:bg-green-900/90"
                          : ""
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
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {courts.map((court) => {
                  //
                  // kiểm tra CourtNumber phải bắt đầu bằng "S"
                  if (!court.court.startsWith("S")) {
                    return null; // bỏ qua court không hợp lệ
                  }

                  const courtNumber = parseInt(court.court.replace("S0", ""));
                  return (
                    <tr
                      key={courtNumber}
                      className={`${
                        selectedCourt === courtNumber
                          ? "bg-green-50 dark:bg-gray-700"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      } transition-colors`}
                    >
                      <CourtCell court={court} />
                      {hours.map((hour) => {
                        const isSlotBooked = isBooked(courtNumber, hour);
                        const isSlotSelected =
                          selectedCourt === courtNumber &&
                          selectedTime === hour;
                        const booking = bookings.find(
                          (b) =>
                            b.court &&
                            parseInt(b.court.replace("S0", "")) ===
                              courtNumber &&
                            parseInt(b.time) === hour
                        );

                        return (
                          <TimeSlot
                            key={`${courtNumber}-${hour}`}
                            court={courtNumber}
                            hour={hour}
                            isBooked={isSlotBooked}
                            isSelected={isSlotSelected}
                            booking={booking}
                            onSelect={handleSlotSelect}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-6xl sm:w-full">
              <LocationDetail
                locationId={locationId}
              
                isModal={true}
              />
            </div>
            

          {/* Booking Modal */}
          {selectedTime && selectedCourt && (
            <BookingModal
              selectedCourt={selectedCourt}
              selectedTime={selectedTime}
              currentDate={currentDate}
              formatDate={formatDate}
              courts={courts}
              onCancel={resetSelection}
              onConfirm={handleBookCourt}
              isSubmitting={loading.submission}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Main;
