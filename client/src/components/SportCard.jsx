import { Link } from 'react-router-dom';

const SportCard = ({ icon, name, count, link }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center group-hover:border-green-500 border border-transparent">
        <div className="text-green-600 mb-4 flex justify-center">{icon}</div>
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-gray-500">{count} sân</p>
      </div>
    </Link>
  );
};

export default SportCard;