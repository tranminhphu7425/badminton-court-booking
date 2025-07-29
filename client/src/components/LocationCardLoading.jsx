import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const LocationCardLoading = ({ mode }) => {
  return (
    <div className="group block focus:outline-none rounded-xl animate-pulse">
      {mode === 0 ? (
        // CARD VIEW LOADING
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden relative" />
          <div className="p-5">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4" />
            <div className="flex items-center mb-3">
              <FaMapMarkerAlt className="mr-2 text-gray-300 dark:text-gray-600 flex-shrink-0" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                <FaStar className="text-gray-300 dark:text-gray-600 mr-1.5 flex-shrink-0" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-6" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // LIST VIEW LOADING
        <div className="flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-40 h-32 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
          <div className="flex flex-col justify-between p-4 flex-grow">
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4" />
              <div className="flex items-center mt-1">
                <FaMapMarkerAlt className="mr-2 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                <FaStar className="text-gray-300 dark:text-gray-600 mr-1.5 flex-shrink-0" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-6" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCardLoading;