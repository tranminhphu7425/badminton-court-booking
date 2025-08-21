import { useState, useMemo } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const ReviewCard = ({ author, rating = 0, date, content = "", photos = [] }) => {
  const [expanded, setExpanded] = useState(false);

  // Format date (VN)
  const formattedDate = useMemo(() => {
    try {
      return format(new Date(date), "dd/MM/yyyy", { locale: vi });
    } catch {
      return ""; // nếu date không hợp lệ
    }
  }, [date]);

  // Tính % sao vàng (nửa sao / thập phân)
  const percent = useMemo(() => {
    const r = Math.max(0, Math.min(5, Number(rating) || 0));
    return (r / 5) * 100; // phủ vàng theo % trên 5 sao
  }, [rating]);

  // Nội dung cắt gọn
  const MAX_CHARS = 160;
  const isLong = content.length > MAX_CHARS;
  const shownText = expanded || !isLong ? content : content.slice(0, MAX_CHARS) + "…";

  return (
    <div
      className="
        relative rounded-2xl p-[1px]
        bg-gradient-to-r from-green-400/10 via-lime-400/10 to-teal-400/10
        transition-all duration-300 ease-out
        hover:from-green-400/50 hover:via-lime-400/50 hover:to-teal-400/50
        hover:shadow-[0_10px_30px_rgba(56,189,248,0.25)]
        motion-reduce:transition-none motion-reduce:hover:shadow-none
      "
    >
      <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm p-4 border border-gray-100 dark:border-gray-600">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            {/* Avatar với vòng sáng gradient */}
            <div
              className="
                relative mr-3 rounded-full p-[2px]
                bg-gradient-to-br from-green-400 via-sky-400 to-violet-400
              "
            >
              <div className="bg-white dark:bg-gray-700 rounded-full">
                <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">{author}</h4>

              {/* Star rating 2 lớp: nền xám + phủ vàng theo % */}
              <div className="mt-1 flex items-center">
                <div className="relative inline-flex" aria-label={`Đánh giá ${rating}/5`}>
                  {/* Lớp sao nền (xám) */}
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={`bg-${i}`} className="text-gray-300 dark:text-gray-500 text-sm" />
                    ))}
                  </div>
                  {/* Lớp sao vàng (clip theo % tổng) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${percent}%` }}
                  >
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={`fg-${i}`} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {Number(rating).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {formattedDate && (
            <span className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</span>
          )}
        </div>

        {/* Nội dung */}
        <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm">
          {shownText}
        </p>

        {/* Read more / Thu gọn */}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="
              mt-2 text-xs font-medium text-green-600 dark:text-green-400
              hover:underline focus:outline-none focus-visible:ring-2
              focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded
            "
          >
            {expanded ? "Thu gọn" : "Đọc thêm"}
          </button>
        )}

        {/* Ảnh đính kèm (tùy chọn) */}
        {Array.isArray(photos) && photos.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {photos.slice(0, 6).map((src, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-600"
              >
                <img
                  src={src}
                  alt={`Ảnh đánh giá ${idx + 1}`}
                  className="
                    w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105
                    motion-reduce:transition-none
                  "
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
