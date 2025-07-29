// React & Hooks
import React, { useState, useEffect } from "react";

// Thư viện bên ngoài
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// Biểu tượng
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaPowerOff,
  FaUserCircle,
  FaHeart,
  FaHistory,
  FaStar,
  FaWallet,
  FaCrown,
  FaTimesCircle,
  FaHeadset,
  FaBasketballBall,
  FaList,
} from "react-icons/fa";
import {
  GiBasketballBall,
  GiSoccerBall,
  GiTennisBall,
  GiShuttlecock,
} from "react-icons/gi";
import { MdSportsVolleyball } from "react-icons/md";
// Assets
import logoSrc from "../assets/images/logos/logo.png";

// Tài nguyên nội bộ
import sportTypeApi from "../api/sportTypeApi";

const sportIcons = {
  badminton: <GiShuttlecock className="text-blue-500" />,
  football: <GiSoccerBall className="text-emerald-500" />,
  pickleball: <FaBasketballBall className="text-black-500" />,
  basketball: <GiBasketballBall className="text-orange-500" />,
  volleyball: <MdSportsVolleyball className="text-red-500" />,
  tennis: <GiTennisBall className="text-yellow-500" />,
};
const navSubItems = [
  { to: "/booking/1/1", icon: <FaCalendarAlt />, text: "Đặt sân" },
  { to: "/about", icon: <FaInfoCircle />, text: "Giới thiệu" },
  { to: "/contact", icon: <FaUser />, text: "Liên hệ" },
];

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sports, setSports] = useState([]);
  const location = useLocation();
  const controls = useAnimation();

  // Animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: -20 },
  };

  const bounceTransition = {
    y: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeOut",
    },
  };

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo với hiệu ứng bounce */}
          <motion.div
            animate={controls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/">
              <div className="flex space-x-2 items-center">
                <motion.img
                  src={logoSrc}
                  alt="Logo"
                  className="h-12 w-12"
                  transition={bounceTransition}
                />
                <motion.span
                  className="text-white font-bold text-3xl font-mono"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  SportBooking
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {/* Sports Dropdown */}
            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <motion.button
                className="flex items-center space-x-1 text-white p-3 rounded-lg hover:bg-green-700 transition-all"
                onClick={() => toggleDropdown("sports")}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium">Sân thể thao</span>
                <motion.span
                  animate={{ rotate: activeDropdown === "sports" ? 180 : 0 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {activeDropdown === "sports" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden"
                  >
                    <Link
                      key={0}
                      to={`/sports/all`}
                      className="flex items-center px-4 py-2 text-gray-800 hover:bg-emerald-100 transition-colors"
                      onClick={() => setActiveSport(null)}
                    >
                      <span className="mr-3 text-xl">
                        <FaList />
                      </span>
                      Tất cả địa điểm
                    </Link>
                    {sports.map((sport, index) => (
                      <motion.div
                        key={sport.SportCode}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={`/sports/${sport.SportCode}`}
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-emerald-100 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="mr-3 text-xl">
                            {sportIcons[sport.SportCode]}
                          </span>
                          <span>{sport.SportName}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Main Nav Items */}
            {navSubItems.map((item, index) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.to}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                    location.pathname === item.to
                      ? "bg-white text-emerald-600"
                      : "text-white hover:bg-green-700"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </Link>
              </motion.div>
            ))}

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                <motion.button
                  className="flex items-center space-x-2 text-white p-3 rounded-lg hover:bg-emerald-700 transition-all"
                  onClick={() => toggleDropdown("account")}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUserCircle className="text-xl" />
                  <span className="font-medium">Tài khoản</span>
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === "account" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      {[
                        {
                          icon: <FaUser />,
                          text: "Trang cá nhân",
                          to: "/profile",
                        },
                        {
                          icon: <FaHistory />,
                          text: "Lịch sử đặt sân",
                          to: "/history",
                        },
                        {
                          icon: <FaHeart />,
                          text: "Sân yêu thích",
                          to: "/favorites",
                        },
                        {
                          icon: <FaStar />,
                          text: "Đánh giá của tôi",
                          to: "/reviews",
                        },
                        {
                          icon: <FaWallet />,
                          text: "Ví thanh toán",
                          to: "/wallet",
                        },
                        {
                          icon: <FaCrown />,
                          text: "Gói hội viên",
                          to: "/membership",
                        },
                        {
                          icon: <FaTimesCircle />,
                          text: "Đơn đã hủy",
                          to: "/canceled",
                        },
                        { icon: <FaHeadset />, text: "Hỗ trợ", to: "/support" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.text}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={item.to}
                            className="flex items-center px-4 py-3 text-gray-800 hover:bg-emerald-100 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="mr-3 text-emerald-600">
                              {item.icon}
                            </span>
                            <span>{item.text}</span>
                          </Link>
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="border-t border-gray-200"
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FaPowerOff className="mr-3" />
                          <span>Đăng xuất</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium"
                  >
                    <FaSignInAlt />
                    <span>Đăng nhập</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    <FaUserPlus />
                    <span>Đăng ký</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                className="pt-4 pb-2 space-y-2"
                variants={menuVariants}
              >
                {/* Sports Dropdown */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    className="w-full flex justify-between items-center rounded-lg text-white hover:bg-emerald-700 py-3 px-4 hover:bg-emerald-50 transition"
                    onClick={() => toggleDropdown("mobile-sports")}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Sân thể thao</span>
                    <motion.span
                      animate={{
                        rotate: activeDropdown === "mobile-sports" ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="text-sm"
                    >
                      ▼
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {activeDropdown === "mobile-sports" && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="mt-2 space-y-1 bg-emerald-100 border border-emerald-200 rounded-xl shadow-lg px-2 py-2"
                      >
                        <Link
                          key={0}
                          to={`/sports/all`}
                          className="flex items-center gap-3 py-2 px-3 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 rounded-lg transition"
                          onClick={() => {
                            setActiveSport(null);
                            setIsOpen(false);
                          }}
                        >
                          <span className="text-lg">
                            <FaList />
                          </span>
                          <span className="text-sm font-medium">
                            Tất cả địa điểm
                          </span>
                        </Link>
                        {sports.map((sport) => (
                          <motion.div
                            key={sport.SportCode}
                            variants={itemVariants}
                          >
                            <Link
                              to={`/sports/${sport.SportCode}`}
                              className="flex items-center gap-3 py-2 px-3 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-900 rounded-lg transition"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsOpen(false);
                              }}
                            >
                              <span className="text-lg">
                                {sportIcons[sport.SportCode]}
                              </span>
                              <span className="text-sm font-medium">
                                {sport.SportName}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Main Mobile Nav Items */}
                {navSubItems.map((item) => (
                  <motion.div key={item.to} variants={itemVariants}>
                    <Link
                      to={item.to}
                      className={`flex items-center py-3 px-4 rounded-lg ${
                        location.pathname === item.to
                          ? "bg-white text-emerald-600"
                          : "text-white hover:bg-emerald-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Buttons */}
                <motion.div
                  className="flex flex-col space-y-2 mt-4"
                  variants={itemVariants}
                >
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex justify-center items-center py-3 px-4 bg-white text-emerald-600 rounded-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUserCircle className="mr-2" />
                        <span>Tài khoản</span>
                      </Link>
                      <button
                        className="flex justify-center items-center py-3 px-4 bg-red-500 text-white rounded-lg font-medium"
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                      >
                        <FaPowerOff className="mr-2" />
                        <span>Đăng xuất</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex justify-center items-center py-3 px-4 bg-white text-emerald-600 rounded-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaSignInAlt className="mr-2" />
                        <span>Đăng nhập</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex justify-center items-center py-3 px-4 bg-yellow-400 text-white rounded-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUserPlus className="mr-2" />
                        <span>Đăng ký</span>
                      </Link>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navigation;
