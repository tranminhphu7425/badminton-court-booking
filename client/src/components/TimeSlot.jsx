const TimeSlot = ({ court, hour, isBooked, isSelected, booking, onSelect }) => (
    <td
      onClick={() => !isBooked && onSelect(court, hour)}
      className={`
        px-2 py-1 text-center transition-all
        ${isBooked ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <div
        role="button"
        tabIndex={isBooked ? -1 : 0}
        aria-disabled={isBooked}
        aria-pressed={isSelected}
        className={`
          relative inline-flex w-full min-w-17 min-h-[60px] h-18 flex-col items-center justify-center
          rounded-lg p-2 overflow-hidden transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
  
          ${isBooked
            ? `
              border border-rose-200 dark:border-rose-800
              bg-gray-50 dark:bg-gray-900 text-rose-600 dark:text-rose-400
              [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,0.06)_0_10px,rgba(0,0,0,0.02)_10px_20px)]
              animate-[stripes_1.2s_linear_infinite]
            `
            : isSelected
            ? `
              border-2 border-emerald-400 dark:border-emerald-300
              bg-gradient-to-br from-emerald-400/20 via-emerald-300/20 to-sky-300/20
              text-emerald-700 dark:text-emerald-300
              shadow-[0_8px_20px_rgba(16,185,129,0.25)]
            `
            : `
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
              hover:scale-[1.03] hover:-translate-y-[1px]
              hover:border-emerald-400 hover:shadow-[0_8px_24px_rgba(34,197,94,0.2)]
              active:scale-[0.98]
            `}
        `}
      >
        {/* Pulse ring khi selected */}
        {isSelected && (
          <span
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-lg
              ring-2 ring-emerald-400/40
              [box-shadow:0_0_0_8px_rgba(16,185,129,0.15)]
              animate-[pulseRing_1.6s_ease-out_infinite]
            "
          />
        )}
  
        {/* Ripple khi click (đơn giản, ở giữa) */}
        {!isBooked && !isSelected && (
          <span
            aria-hidden
            className="
              pointer-events-none absolute -z-10 inset-0
              after:absolute after:inset-1/2 after:-translate-x-1/2 after:-translate-y-1/2
              after:w-0 after:h-0 after:rounded-full
              after:bg-emerald-400/20 after:opacity-0
              active:after:w-[220px] active:after:h-[220px] active:after:opacity-100
              after:transition-all after:duration-300
            "
          />
        )}
  
        {/* Nội dung */}
        {isBooked ? (
          <span
            className="text-xs font-semibold"
            title={booking?.user || "Guest"}
          >
            Đã đặt
          </span>
        ) : (
          <>
            <span className={`text-sm font-medium ${isSelected ? "text-emerald-700 dark:text-emerald-300" : ""}`}>
              {isSelected ? "Đang chọn" : "Trống"}
            </span>
            {!isSelected && (
              <span className="mt-1 text-[10px] px-1 py-0.5 bg-emerald-100 text-emerald-700 rounded dark:bg-emerald-900 dark:text-emerald-300">
                Nhấn để đặt
              </span>
            )}
          </>
        )}
      </div>
    </td>
  );

  
  export default TimeSlot;