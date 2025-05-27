import React, { useState, useEffect } from "react";
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
  FaUserCircle,
} from "react-icons/fa";
import { GiTennisBall, GiShuttlecock, GiSoccerBall } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { MdSportsVolleyball } from "react-icons/md";
import { sportTypeApi } from "../api/sportTypeApi";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
const logoSrc = "/assets/images/logos/logo.png";

const translateIcon = {
  GiShuttlecock: <GiShuttlecock />,
  GiSoccerBall: <GiSoccerBall />,
  FaBasketballBall: <FaBasketballBall />,
  MdSportsVolleyball: <MdSportsVolleyball />,
  GiTennisBall: <GiTennisBall />,
  FaTableTennis: <FaTableTennis />,
};

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSport, setActiveSport] = useState(null);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const loadSportTypes = async () => {
      try {
        const data = await sportTypeApi.fetchSportTypes();
        setSports(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadSportTypes();
  }, []);

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

  const toggleDropdown = (sportId) => {
    setActiveSport(activeSport === sportId ? null : sportId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // setActiveSport(null);
    // You might want to add additional logout logic here
    // such as clearing local storage, cookies, etc.
  };

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled ? "bg-green-800 shadow-lg" : "bg-green-900"
      } relative z-30`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white text-2xl font-bold flex items-center"
            >
              <img
                src={logoSrc}
                className="rounded-lg mr-2"
                alt=""
                width={40}
                height={40}
              />
              SportBooking
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="relative group">
              <button
                className="text-white hover:text-green-200 flex items-center space-x-1"
                onClick={() => toggleDropdown("sports")}
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
                    className="absolute left-0 mt-2 w-max bg-white rounded-md shadow-lg z-30"
                  >
                    <div className="py-1">
                      <Link
                        key={0}
                        to={`/sports/all`}
                        className="flex px-4 py-2 text-gray-800 hover:bg-green-100 items-center"
                        onClick={() => setActiveSport(null)}
                      >
                        <span className="mr-2">
                          <FaList />
                        </span>
                        Tất cả địa điểm
                      </Link>
                      {sports.map((sport) => (
                        <Link
                          key={sport.SportCode}
                          to={`/sports/${sport.SportCode}`}
                          className="flex px-4 py-2 text-gray-800 hover:bg-green-100 items-center"
                          onClick={() => setActiveSport(null)}
                        >
                          <span className="mr-2">
                            {translateIcon[sport.Icon]}
                          </span>
                          {sport.SportName}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/booking/1/1"
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

            {/* ✅ Hiển thị tùy theo đăng nhập hay chưa */}
            {isLoggedIn ? (
              <div className="relative group">
                <button
                  className="text-white hover:text-green-200 flex items-center space-x-1"
                  onClick={() => toggleDropdown("account")}
                >
                  <FaUserCircle />
                  <span>Tài khoản</span>
                </button>

                <AnimatePresence>
                  {activeSport === "account" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -left-10 mt-2 w-max bg-white rounded-md shadow-lg z-30"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-green-100"
                        >
                          Trang cá nhân
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100"
                        >
                          <FaPowerOff />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-green-200 flex items-center bg-green-600 px-4 py-2 rounded-lg"
              >
                <FaSignInAlt className="mr-2" />
                Đăng nhập
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
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
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-2">
                <div>
                  <button
                    className="w-full flex justify-between items-center text-white py-2 px-3 bg-green-700 rounded"
                    onClick={() => toggleDropdown("mobile-sports")}
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
                        <Link
                          key={0}
                          to={`/sports/all`}
                          className="flex py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                          onClick={() => {
                            setActiveSport(null);
                            setIsOpen(false);
                          }}
                        >
                          <span className="mr-2">
                            <FaList />
                          </span>
                          Tất cả địa điểm
                        </Link>
                        {sports.map((sport) => (
                          <Link
                            key={sport.SportCode}
                            to={`/sports/${sport.SportCode}`}
                            className="flex py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                            onClick={() => {
                              setActiveSport(null);
                              setIsOpen(false);
                            }}
                          >
                            <span className="mr-2">
                              {translateIcon[sport.Icon]}
                            </span>
                            {sport.SportName}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/booking/1/1"
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

                

                <div className="flex items-center space-x-4 justify-center">

                {isLoggedIn ? (
             <>
                <Link
                 to="/profile"
                  className="text-white hover:text-green-200 flex items-center space-x-1 gap-1 bg-green-500 px-4 py-2 rounded-lg"
                  
                >
                 
                  <span>Trang cá nhân</span>
                </Link>
                <button
                  className="text-white hover:text-green-200 flex items-center space-x-1 gap-1 bg-red-500 px-4 py-2 rounded-lg"
                  onClick={handleLogout}
                >
                 <FaPowerOff />
                  <span>Đăng xuất</span>
                </button>
            
                      </>
            ) : (
              <>
              <Link
                    to="/login"
                    className="text-white hover:text-green-200 flex items-center bg-green-600 px-4 py-2 rounded-lg"
                  >
                    <FaSignInAlt className="mr-2" />
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="text-white hover:text-green-200 flex items-center bg-green-500 px-4 py-2 rounded-lg"
                  >
                    <FaUserPlus className="mr-2" />
                    Đăng ký
                  </Link>
              </>
            )}





                  
                </div>




              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navigation;
