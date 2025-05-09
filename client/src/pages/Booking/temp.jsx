<>
  <div>
    {/* Loading & Error States */}
    {isLoading && (
      <div className="bg-blue-500 dark:bg-blue-700 text-white p-2 text-center flex items-center justify-center">
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
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-8">
    {/* Header */}
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-300 mb-2">
        ĐẶT LỊCH SÂN CẦU LÔNG
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Sân 1 - 4 | Mở cửa 7h - 22h hàng ngày
      </p>

      {/* Date Navigator */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() => changeDate(-1)}
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300"
            aria-label="Previous day"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
              className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-800 dark:text-white rounded-lg border border-blue-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholderText="Chọn ngày"
              aria-label="Select date"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-2.5 text-blue-500 dark:text-blue-400 pointer-events-none"
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
            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300"
            aria-label="Next day"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
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
            className="px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors text-sm"
            aria-label="Previous week"
          >
            Tuần trước
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm"
            aria-label="Today"
          >
            Hôm nay
          </button>
          <button
            onClick={() => changeDate(7)}
            className="px-4 py-2 bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-gray-200 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors text-sm"
            aria-label="Next week"
          >
            Tuần sau
          </button>
        </div>
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700">
            <tr>
              <th className="px-4 py-2 text-center text-xs font-semibold text-white uppercase tracking-wider rounded-tl-2xl">
                Sân
              </th>
              {hours.map((hour) => (
                <th
                  key={hour}
                  className={`px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider ${
                    selectedTime === hour
                      ? "bg-blue-700/90 dark:bg-blue-900/90"
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
              if (!court.court.startsWith("S")) {
                return null;
              }

              const courtNumber = parseInt(court.court.replace("S0", ""));
              return (
                <tr
                  key={courtNumber}
                  className={`${
                    selectedCourt === courtNumber
                      ? "bg-blue-50 dark:bg-gray-700"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  } transition-colors`}
                >
                  <CourtCell court={court} />
                  {hours.map((hour) => {
                    const isSlotBooked = isBooked(courtNumber, hour);
                    const isSlotSelected =
                      selectedCourt === courtNumber && selectedTime === hour;
                    const booking = bookings.find(
                      (b) =>
                        parseInt(b.court.replace("S0", "")) === courtNumber &&
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
</>;
