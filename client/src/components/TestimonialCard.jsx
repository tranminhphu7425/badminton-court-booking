import { useState, useMemo } from "react";

const TestimonialCard = ({ name, comment = "", rating = 0, sport }) => {
  const [expanded, setExpanded] = useState(false);

  // Tính % sao vàng (hỗ trợ nửa sao)
  const percent = useMemo(() => {
    const r = Math.max(0, Math.min(5, Number(rating) || 0));
    return (r / 5) * 100;
  }, [rating]);

  // Cắt comment dài
  const MAX_CHARS = 120;
  const isLong = comment.length > MAX_CHARS;
  const shownComment = expanded || !isLong ? comment : comment.slice(0, MAX_CHARS) + "…";

  return (
    <div
      className="
        relative rounded-2xl p-[1px]
        hover:from-green-400/50 hover:via-lime-400/50 hover:to-teal-400/50
        transition-all duration-300 ease-out
        hover:from-green-400/40 hover:via-lime-400/40 hover:to-teal-400/40
        hover:shadow-[0_10px_30px_rgba(56,189,248,0.25)]
        hover:-translate-y-1
      "
    >
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
        {/* Sheen effect */}
        <span
          aria-hidden
          className="
            pointer-events-none absolute inset-0
            before:absolute before:-inset-1 before:rounded-2xl
            before:bg-[linear-gradient(115deg,rgba(255,255,255,0)_10%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_90%)]
            before:opacity-0 hover:before:opacity-100
            before:transition-opacity before:duration-500
          "
        />

        {/* Header */}
        <div className="flex items-center mb-4">
          {/* Avatar với vòng sáng */}
          <div
            className="
              relative w-12 h-12 rounded-full mr-4 p-[2px]
              bg-gradient-to-br from-green-400 via-sky-400 to-violet-400
              transition-transform duration-300 hover:scale-105
            "
          >
            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
              {/* Avatar image placeholder */}
              <div className="w-full h-full bg-gray-400 dark:bg-gray-700"></div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>

            {/* Rating half-star */}
            <div className="relative inline-flex text-yellow-400">
              {/* Sao nền xám */}
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={`bg-${i}`} className="text-gray-300 dark:text-gray-600">★</span>
                ))}
              </div>
              {/* Sao vàng phủ theo % */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${percent}%` }}
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={`fg-${i}`} className="text-yellow-400 drop-shadow-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
          “{shownComment}”
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-xs text-green-600 dark:text-green-400 hover:underline"
          >
            {expanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}

        {/* Sport */}
        <span className="text-sm text-gray-400 dark:text-gray-500">{sport}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
