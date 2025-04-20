const TestimonialCard = ({ name, comment, rating, sport }) => {
    const renderStars = () => {
      return Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
      ));
    };
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
            {/* Placeholder for user avatar */}
            <div className="w-full h-full bg-gray-400"></div>
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <div className="text-yellow-500">{renderStars()}</div>
          </div>
        </div>
        <p className="text-gray-600 mb-4">"{comment}"</p>
        <span className="text-sm text-gray-400">{sport}</span>
      </div>
    );
  };
  
  export default TestimonialCard;