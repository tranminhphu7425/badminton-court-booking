// CourtCell.jsx
import clsx from "clsx";

export default function CourtCell({
  court,
  as = "td",           // "td" cho table, "div" cho mobile card
  compact = false,      // true cho phiên bản gọn
  className = "",
}) {
  const Comp = as;

  const base = compact
    ? "text-lg font-medium text-gray-800 dark:text-gray-100"
    : "px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100";

  // Nội dung hiển thị tên sân (tuỳ bạn thay đổi theo dữ liệu)
  const label =  court?.court ;

  return (
    <Comp className={clsx(base, className)}>
     Sân {label}
    </Comp>
  );
}
