import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaUser,
  FaInfoCircle,
  FaShoppingCart,
  FaFootballBall,
  FaTableTennis,
  FaBasketballBall,
} from "react-icons/fa";
import { GiTennisBall } from "react-icons/gi";
import { MdSportsVolleyball } from "react-icons/md";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSport, setActiveSport] = useState(null);

  const sports = [
    { id: "football", name: "Bóng đá", icon: <FaFootballBall /> },
    { id: "badminton", name: "Cầu lông", icon: <GiTennisBall /> },
    { id: "pickleball", name: "Pickleball", icon: <FaTableTennis /> },
    { id: "basketball", name: "Bóng rổ", icon: <FaBasketballBall /> },
    { id: "volleyball", name: "Bóng chuyền", icon: <MdSportsVolleyball /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSportDropdown = (sportId) => {
    setActiveSport(activeSport === sportId ? null : sportId);
  };

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled ? "bg-green-800 shadow-lg" : "bg-green-900"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white text-2xl font-bold flex items-center"
            >
              <span className="bg-white text-green-800 rounded-lg p-2 mr-2">
                <FaFootballBall />
              </span>
              SportBooking
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button
                className="text-white hover:text-green-200 flex items-center space-x-1"
                onClick={() => toggleSportDropdown("sports")}
              >
                <span>Sân thể thao</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {activeSport === "sports" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      {sports.map((sport) => (
                        <Link
                          key={sport.id}
                          to={`/sport/${sport.id}`}
                          className="flex px-4 py-2 text-gray-800 hover:bg-green-100 items-center"
                        >
                          <span className="mr-2">{sport.icon}</span>
                          {sport.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/booking"
              className="text-white hover:text-green-200 flex items-center"
            >
              <FaCalendarAlt className="mr-1" /> Đặt sân
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-green-200 flex items-center"
            >
              <FaInfoCircle className="mr-1" /> Giới thiệu
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-green-200 flex items-center"
            >
              <FaUser className="mr-1" /> Liên hệ
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                <div className="px-2">
                  <button
                    className="w-full flex justify-between items-center text-white py-2 px-3 bg-green-700 rounded"
                    onClick={() => toggleSportDropdown("mobile-sports")}
                  >
                    <span>Sân thể thao</span>
                    <svg
                      className="w-4 h-4 transform transition-transform"
                      style={{
                        rotate:
                          activeSport === "mobile-sports" ? "180deg" : "0deg",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {activeSport === "mobile-sports" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 mt-2 space-y-1"
                      >
                        {sports.map((sport) => (
                          <Link
                            key={sport.id}
                            to={`/sport/${sport.id}`}
                            className="block py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                          >
                            <span className="mr-2">{sport.icon}</span>
                            {sport.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/booking"
                  className="flex py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                >
                  <FaCalendarAlt className="mr-2" /> Đặt sân
                </Link>
                <Link
                  to="/about"
                  className="flex py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                >
                  <FaInfoCircle className="mr-2" /> Giới thiệu
                </Link>
                <Link
                  to="/contact"
                  className="flex py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                >
                  <FaUser className="mr-2" /> Liên hệ
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navigation;
