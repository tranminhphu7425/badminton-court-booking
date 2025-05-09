import { Link } from "react-router-dom";

const SportCard = ({ icon, name, count, link }) => {
  return (
    <Link to={link} className="group block">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center group-hover:border-green-500 dark:group-hover:border-green-400 border border-transparent dark:border-gray-700">
        <div className="text-green-600 dark:text-green-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-1 dark:text-white">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{count} sân</p>
      </div>
    </Link>
  );
};

export default SportCard;
