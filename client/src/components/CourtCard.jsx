import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const CourtCard = ({
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
  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded-xl"
>
  {mode === 0 ? (
    // CARD VIEW
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:border-green-500 dark:group-hover:border-green-400 group-active:scale-[0.98]">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-600 dark:group-hover:text-green-400 line-clamp-2">
          {name}
        </h3>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
          <FaMapMarkerAlt className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-green-600 dark:text-green-400 font-medium">{price}</span>
          <div className="flex items-center bg-green-100 dark:bg-green-900/50 px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800">
            {badges && <div className="mr-1.5">{badges}</div>}
            <FaStar className="text-yellow-500 mr-1.5 flex-shrink-0" />
            <span className="font-medium text-gray-800 dark:text-gray-200">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // LIST VIEW
    <div className="flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 group-hover:border-green-500">
      <div className="w-40 h-32 bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
            {name}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
            <FaMapMarkerAlt className="mr-2 text-green-600 dark:text-green-400 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-green-600 dark:text-green-400 font-medium">{price}</span>
          <div className="flex items-center bg-green-100 dark:bg-green-900/50 px-2.5 py-1 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800">
            {badges && <div className="mr-1.5">{badges}</div>}
            <FaStar className="text-yellow-500 mr-1.5 flex-shrink-0" />
            <span className="font-medium text-gray-800 dark:text-gray-200">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default CourtCard;
