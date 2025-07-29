import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    
<footer className="bg-gray-300 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-12 pb-6 transition-colors duration-300">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      {/* Column 1: About */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
          SportBooking
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Nền tảng đặt sân thể thao hàng đầu Việt Nam, kết nối người chơi
          với các sân thể thao chất lượng.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition duration-300"
            aria-label="YouTube"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      {/* Column 2: Quick Links */}
      <div>
        <h3 className="text-xl font-bold mb-4 dark:text-white">Liên kết nhanh</h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Về chúng tôi
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Liên hệ
            </Link>
          </li>
          <li>
            <Link
              to="/sports/all"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Môn thể thao
            </Link>
          </li>
          <li>
            <Link
              to="/courts"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Danh sách sân
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 3: Sports */}
      <div>
        <h3 className="text-xl font-bold mb-4 dark:text-white">Môn thể thao</h3>
        <ul className="space-y-2">
          <li>
            <Link
              to="/sports/football"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Bóng đá
            </Link>
          </li>
          <li>
            <Link
              to="/sports/badminton"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Cầu lông
            </Link>
          </li>
          <li>
            <Link
              to="/sports/basketball"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Bóng rổ
            </Link>
          </li>
          <li>
            <Link
              to="/sports/tennis"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Tennis
            </Link>
          </li>
          <li>
            <Link
              to="/sports/volleyball"
              className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 transition duration-300"
            >
              Bóng chuyền
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 4: Contact Info */}
      <div>
        <h3 className="text-xl font-bold mb-4 dark:text-white">Thông tin liên hệ</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <FaMapMarkerAlt className="text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-300">
              123 Đường ABC, Quận 1, TP.HCM
            </span>
          </li>
          <li className="flex items-center">
            <FaPhone className="text-green-600 dark:text-green-400 mr-3" />
            <span className="text-gray-600 dark:text-gray-300">1900 1234</span>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="text-green-600 dark:text-green-400 mr-3" />
            <span className="text-gray-600 dark:text-gray-300">support@sportbooking.vn</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

    {/* Copyright */}
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-full p-1 text-gray-700 dark:text-gray-300 text-sm">
          <ThemeToggle />
        </div>
      </div>
      <div className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-right">
        © {new Date().getFullYear()} SportBooking. Tất cả quyền được bảo lưu.
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;
