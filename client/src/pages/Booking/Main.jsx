import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify"; // Added for better notifications
import { useParams } from "react-router-dom";
import LocationDetail from "../../components/LocationDetail";
import TimeSlot from "../../components/TimeSlot";
import CourtCell from "../../components/CourtCell";

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

      const bookingCourt = parseInt(
        booking.court.replace(booking.court.slice(0, 2), "")
      );
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
      const bookingCourt = parseInt(
        booking.court.replace(booking.court.slice(0, 2), "")
      );
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
        (c) =>
          c.court &&
          parseInt(c.court.replace(c.court.slice(0, 2), "")) === selectedCourt
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
        notes: `Đặt sân ${courtData.court}`,
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
            {courts && courts.length > 0
              ? courts[0].sportType.toUpperCase()
              : ""}
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
          {/* ===== Desktop (sm+) — giữ nguyên table của bạn ===== */}
          <div className="hidden md:block">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-green-400/20 via-sky-400/20 to-violet-400/20 shadow-lg my-8">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl
        before:absolute before:-inset-1 before:rounded-2xl
        before:bg-[linear-gradient(115deg,rgba(255,255,255,0)_10%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0)_90%)]
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700"
              />
              <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-group">
                  <thead className="relative bg-gradient-to-r from-green-600 to-green-500 dark:from-green-800 dark:to-green-700 text-white">
                    <tr className="relative">
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider rounded-tl-2xl">
                        Sân
                      </th>
                      {hours.map((hour) => (
                        <th
                          key={hour}
                          className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider relative overflow-hidden"
                        >
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-sm">
                              {hour}h -{" "}
                            </span>
                            <span className="text-xs font-normal opacity-90">
                              {hour + 1}h
                            </span>
                          </div>
                          <span
                            aria-hidden
                            className="pointer-events-none absolute inset-0
                    before:absolute before:-left-1/2 before:top-0 before:bottom-0 before:w-1/2
                    before:bg-[linear-gradient(100deg,rgba(255,255,255,0.0),rgba(255,255,255,0.35),rgba(255,255,255,0.0))]
                    before:translate-x-[-100%] group-[.table-group]:before:animate-[shine_2.6s_ease-in-out_infinite]"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {courts.map((court) => {
                      if (!court.court) return null;
                      const courtNumber = parseInt(
                        court.court.replace(court.court.slice(0, 2), "")
                      );
                      return (
                        <tr
                          key={courtNumber}
                          className={`transition-colors ${
                            selectedCourt === courtNumber
                              ? "bg-green-50 dark:bg-gray-700"
                              : "hover:bg-gray-50/60 dark:hover:bg-gray-700/60"
                          }`}
                        >
                          <CourtCell court={court} as="td" />
                          {hours.map((hour) => {
                            const isSlotBooked = isBooked(courtNumber, hour);
                            const isSlotSelected =
                              selectedCourt === courtNumber &&
                              selectedTime === hour;
                            const booking = bookings.find(
                              (b) =>
                                b.court &&
                                parseInt(
                                  b.court.replace(b.court.slice(0, 2), "")
                                ) === courtNumber &&
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
            </div>
          </div>

          {/* ===== Mobile (xs) — card + chip thời gian ===== */}
          <div className="md:hidden my-6 space-y-4">
            {courts
              .filter((court) => court.court)
              .map((court) => {
                const courtNumber = parseInt(
                  court.court.replace(court.court.slice(0, 2), "")
                );
                const selectedInThisCourt =
                  selectedCourt === courtNumber ? selectedTime : null;

                return (
                  <div
                    key={courtNumber}
                    className="relative rounded-2xl p-[1px] bg-gradient-to-r from-green-400/15 via-sky-400/15 to-violet-400/15"
                  >
                    <div className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4">
                      {/* Header sân */}
                      <div className="flex items-center justify-between mb-3">
                        <CourtCell
                          court={court}
                          as="div"
                          compact
                          className="font-semibold"
                        />
                        {selectedInThisCourt !== null && (
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                            Chọn: {selectedInThisCourt}h–
                            {selectedInThisCourt + 1}h
                          </span>
                        )}
                      </div>

                      {/* Khung giờ dạng chip: cuộn ngang + snap */}
                      <div className="relative">
                        {/* gradient hint hai bên */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white dark:from-gray-800 to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white dark:from-gray-800 to-transparent" />

                        <div
                          className="
                  flex gap-2 overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-1 py-1
                  scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
                "
                        >
                          {hours.map((hour) => {
                            const isSlotBooked = isBooked(courtNumber, hour);
                            const isSlotSelected =
                              selectedCourt === courtNumber &&
                              selectedTime === hour;
                            const booking = bookings.find(
                              (b) =>
                                b.court &&
                                parseInt(
                                  b.court.replace(b.court.slice(0, 2), "")
                                ) === courtNumber &&
                                parseInt(b.time) === hour
                            );

                            // Chip theo idea "TimeSlot" đã hoạt hình hóa
                            return (
                              <button
                                key={`${courtNumber}-${hour}`}
                                onClick={() =>
                                  !isSlotBooked &&
                                  handleSlotSelect(courtNumber, hour)
                                }
                                disabled={isSlotBooked}
                                className={`
                        snap-start shrink-0 min-w-[96px] px-3 py-4 rounded-xl text-sm font-medium
                        transition-all duration-300 relative overflow-hidden
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                        ${
                          isSlotBooked
                            ? `cursor-not-allowed text-rose-600 dark:text-rose-400
                              border border-rose-200 dark:border-rose-800
                              bg-gray-50 dark:bg-gray-900
                              [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,0.06)_0_10px,rgba(0,0,0,0.02)_10px_20px)]
                              animate-[stripes_1.2s_linear_infinite]`
                            : isSlotSelected
                            ? `text-emerald-700 dark:text-emerald-300
                              border-2 border-emerald-400 dark:border-emerald-300
                              bg-gradient-to-br from-emerald-400/20 via-emerald-300/20 to-sky-300/20
                              shadow-[0_8px_20px_rgba(16,185,129,0.25)]`
                            : `text-gray-700 dark:text-gray-200
                              border border-gray-200 dark:border-gray-700
                              bg-white dark:bg-gray-900
                              hover:scale-[1.03] active:scale-95 hover:border-emerald-400
                              hover:shadow-[0_8px_24px_rgba(34,197,94,0.2)]`
                        }
                      `}
                              >
                                {isSlotSelected
                                  ? "Đang chọn"
                                  : isSlotBooked
                                  ? "Đã đặt"
                                  : `${hour}h-${hour + 1}h`}

                                {/* pulse ring khi selected */}
                                {isSlotSelected && (
                                  <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-emerald-400/40 [box-shadow:0_0_0_8px_rgba(16,185,129,0.15)] animate-[pulseRing_1.6s_ease-out_infinite]"
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ===== Sticky action bar khi đã chọn (mobile ưu tiên, desktop cũng dùng được) ===== */}
          {selectedCourt != null && selectedTime != null && (
            <div className="fixed inset-x-0 bottom-0 z-40">
              <div className="mx-auto max-w-7xl px-4 pb-4">
                <div className="rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg p-3 flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      Sân {selectedCourt}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {selectedTime}h – {selectedTime + 1}h
                    </div>
                  </div>
                  <button
                    onClick={() => /* gọi action đặt sân */ {}}
                    className="rounded-full px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-6xl sm:w-full">
            <LocationDetail locationId={parseInt(locationId)} isModal={false} />
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
