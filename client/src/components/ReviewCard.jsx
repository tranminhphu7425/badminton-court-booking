import { FaStar, FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const ReviewCard = ({ author, rating, date, content }) => {
  // Format date to Vietnamese locale
  const formattedDate = format(new Date(date), "dd/MM/yyyy", { locale: vi });

  // Create star rating display
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`${i <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"} text-sm`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-600">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className="mr-3">
            <FaUserCircle className="text-3xl text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">{author}</h4>
            <div className="flex items-center mt-1">
              {renderStars()}
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm">{content}</p>
      
      {/* Review photos (if any) */}
      {/* <div className="mt-3 flex space-x-2">
        {[1, 2, 3].map((photo) => (
          <img
            key={photo}
            src={`https://via.placeholder.com/100?text=Photo+${photo}`}
            alt="Review"
            className="w-16 h-16 object-cover rounded"
          />
        ))}
      </div> */}
    </div>
  );
};

export default ReviewCard;