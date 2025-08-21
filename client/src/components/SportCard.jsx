import { Link } from "react-router-dom";

const SportCard = ({ icon, name, count, link }) => {
  return (
    <Link
      to={link}
      className="group block"
    >
      {/* Lớp viền gradient + glow khi hover */}
      <div
        className="
          relative rounded-2xl p-[1px]
          bg-gradient-to-r from-green-400/20 via-lime-400/20 to-teal-400/20
          transition-all duration-300
          hover:from-green-400 hover:via-lime-400 hover:to-teal-400
          hover:shadow-[0_10px_30px_rgba(56,189,248,0.35)]
          hover:-translate-y-1 hover:scale-[1.02]
        "
      >
        {/* Thân thẻ */}
        <div
          className="
            relative bg-white dark:bg-gray-800 rounded-2xl p-6 text-center
            border border-transparent dark:border-gray-700
            transition-all duration-300
          "
        >
          {/* Hiệu ứng sheen (ánh sáng lướt) */}
          <span
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-2xl
              before:absolute before:-inset-1 before:rounded-2xl
              before:bg-[linear-gradient(115deg,rgba(255,255,255,0)_10%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0)_90%)]
              before:opacity-0 group-hover:before:opacity-100
              before:transition-opacity before:duration-500
            "
          />

          {/* Icon */}
          <div
            className="
              text-green-600 dark:text-green-400 mb-4 flex justify-center
              transition-transform duration-300
              group-hover:scale-110 group-hover:rotate-3
              group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.55)]
            "
          >
            {icon}
          </div>

          {/* Tiêu đề */}
          <h3 className="text-lg font-semibold mb-1 dark:text-white">
            {name}
          </h3>

          {/* Số sân */}
          <p
            className="
              text-gray-500 dark:text-gray-400 transition-transform duration-300
              group-hover:-translate-y-0.5
            "
          >
            {count} sân
          </p>

          {/* Viền sáng bên trong khi hover */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-2xl
              ring-0 group-hover:ring-2 ring-green-400/40
              transition-all duration-300
            "
          />
        </div>
      </div>
    </Link>
  );
};

export default SportCard;
