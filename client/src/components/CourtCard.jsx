import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const CourtCard = ({ name, image, location, price, rating, link, badges }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition duration-300">{name}</h3>
          <div className="flex items-center text-gray-500 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-green-600 font-medium">{price}</span>
            
            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
            {badges && (
            <div className='mr-1'>{badges}</div>
              )}
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourtCard;