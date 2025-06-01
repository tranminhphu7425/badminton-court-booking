const TestimonialCard = ({ name, comment, rating, sport }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={
          i < rating
            ? "text-yellow-400 drop-shadow-sm transition-all duration-300"
            : "text-gray-300 dark:text-gray-600"
        }
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 mr-4 overflow-hidden transform transition-transform duration-300 hover:scale-105">
          {/* Placeholder for user avatar */}
          <div className="w-full h-full bg-gray-400 dark:bg-gray-700"></div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
          <div className="text-yellow-500 flex space-x-1">{renderStars()}</div>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{comment}"</p>
      <span className="text-sm text-gray-400 dark:text-gray-500">{sport}</span>
    </div>
  );
};

export default TestimonialCard;
