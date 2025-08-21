import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const LocationCard = ({
  name,
  image,
  location,
  price,
  rating,
  badges,
  mode,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="flex h-full w-full group block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded-2xl"
    >
      {mode === 0 ? (
        /* CARD VIEW */
        <div className="
          relative rounded-2xl p-[1px]
          bg-gradient-to-r from-green-400/15 via-lime-400/15 to-teal-400/15
          transition-all duration-300 ease-out
          hover:from-green-400 hover:via-lime-400 hover:to-teal-400
          hover:shadow-[0_12px_40px_rgba(56,189,248,0.35)]
          hover:-translate-y-1 hover:scale-[1.01]
          active:scale-[0.99] w-full
        ">
          <div className="
            relative flex flex-col h-full overflow-hidden
            bg-white dark:bg-gray-800 rounded-2xl
            border border-gray-100 dark:border-gray-700
            transition-all duration-300
            group-hover:border-transparent
          ">
            {/* Sheen */}
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
            {/* Ảnh */}
            <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[0.8deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Nội dung */}
            <div className="p-5 flex flex-col h-60">
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400 line-clamp-2">
                  {name}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                  <FaMapMarkerAlt className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="line-clamp-1">{location}</span>
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-end justify-between">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {price}
                </span>
                <div className="flex items-center bg-green-100 dark:bg-green-900/50 px-2.5 py-1 rounded-full transition-all duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:shadow-[0_0_12px_rgba(34,197,94,0.35)]">
                  {badges && <div className="mr-1.5">{badges}</div>}
                  <FaStar className="text-yellow-500 mr-1.5 flex-shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Viền sáng trong khi hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-green-400/40 transition-all duration-300"
            />
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="
          relative rounded-2xl p-[1px]
          bg-gradient-to-r from-green-400/15 via-sky-400/15 to-violet-400/15
          transition-all duration-300 ease-out
          hover:from-green-400 hover:via-sky-400 hover:to-violet-400
          hover:shadow-[0_10px_30px_rgba(56,189,248,0.3)]
          hover:-translate-y-0.5 hover:scale-[1.005]
          active:scale-[0.99]
        ">
          <div className="
            relative flex bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
            shadow-sm transition-all
            border border-gray-100 dark:border-gray-700 group-hover:border-transparent
          ">
            {/* Sheen */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0 rounded-2xl
                before:absolute before:-inset-1 before:rounded-2xl
                before:bg-[linear-gradient(115deg,rgba(255,255,255,0)_10%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_90%)]
                before:opacity-0 group-hover:before:opacity-100
                before:transition-opacity before:duration-500
              "
            />
            <div className="w-40 h-30 bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[0.5deg]"
              />
            </div>
            <div className="flex flex-col justify-between p-4 flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors group-hover:text-green-600 dark:group-hover:text-green-400">
                  {name}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                  <FaMapMarkerAlt className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {price}
                </span>
                <div className="flex items-center bg-green-100 dark:bg-green-900/50 px-2.5 py-1 rounded-full transition-all duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  {badges && <div className="mr-1.5">{badges}</div>}
                  <FaStar className="text-yellow-500 mr-1.5 flex-shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {rating}
                  </span>
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-green-400/40 transition-all duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
