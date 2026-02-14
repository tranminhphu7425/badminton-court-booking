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
  FaPlus,
  FaChevronRight,
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
import userApi from "../api/userApi";

const sportIcons = {
  badminton: <GiShuttlecock className="text-blue-500" />,
  football: <GiSoccerBall className="text-emerald-500" />,
  pickleball: <FaBasketballBall className="text-black-500" />,
  basketball: <GiBasketballBall className="text-orange-500" />,
  volleyball: <MdSportsVolleyball className="text-red-500" />,
  tennis: <GiTennisBall className="text-yellow-500" />,
};

const navSubItems = [
  { to: "/booking/1/3", icon: <FaCalendarAlt />, text: "Đặt sân" },
  { to: "/about", icon: <FaInfoCircle />, text: "Giới thiệu" },
  { to: "/contact", icon: <FaUser />, text: "Liên hệ" },
];

const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sports, setSports] = useState([]);
  const location = useLocation();
  const controls = useAnimation();
  const [userData, setUserData] = useState();

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

  //load user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      const userId = localStorage.getItem("UserID");
      if (!userId) {
        setError("Không tìm thấy UserID trong localStorage");
        setLoading(false);
        return;
      }

      try {
        const result = await userApi.fetchUserProfile(userId);
        if (result.success) {
          setUserData(result.profile);
        } else {
          setError(result.message || "Dữ liệu không hợp lệ");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
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
      <div className="container mx-auto px-4 py-2">
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
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-emerald-100"
                  >
                    <motion.div
                      className="divide-y divide-emerald-50"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                    >
                      {/* Mục "Tất cả địa điểm" */}
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <Link
                          to="/sports/all"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-all group"
                          onClick={() => setActiveSport(null)}
                        >
                          <motion.span
                            className="mr-3 text-lg text-emerald-500 group-hover:scale-110 transition-transform"
                            whileHover={{ scale: 1.2 }}
                          >
                            <FaList />
                          </motion.span>
                          <span className="group-hover:font-medium group-hover:text-emerald-700 transition-all">
                            Tất cả địa điểm
                          </span>
                          <motion.span
                            className="ml-auto opacity-0 group-hover:opacity-100 text-emerald-500"
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <FaChevronRight className="text-xs" />
                          </motion.span>
                        </Link>
                      </motion.div>

                      {/* Danh sách môn thể thao */}
                      {sports.map((sport) => (
                        <motion.div
                          key={sport.SportCode}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            to={`/sports/${sport.SportCode}`}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-all group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <motion.span
                              className="mr-3 text-lg group-hover:scale-110 transition-transform"
                              whileHover={{ scale: 1.2 }}
                            >
                              {sportIcons[sport.SportCode]}
                            </motion.span>
                            <span className="group-hover:font-medium group-hover:text-emerald-700 transition-all">
                              {sport.SportName}
                            </span>
                            <motion.span
                              className="ml-auto opacity-0 group-hover:opacity-100 text-emerald-500"
                              initial={{ x: -10 }}
                              animate={{ x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <FaChevronRight className="text-xs" />
                            </motion.span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
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

                {activeDropdown === "account" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-emerald-100"
                  >
                    {/* User Profile Card with Animation */}
                    <motion.div
                      className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                            {"U".charAt(0)}
                          </div>
                          <motion.div
                            className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-1"
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 8,
                              ease: "linear",
                            }}
                          >
                            <FaCrown className="text-yellow-300 text-xs" />
                          </motion.div>
                        </motion.div>

                        <div className="ml-3">
                          <motion.p
                            className="text-lg font-bold text-emerald-900"
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                          >
                            {userData.FullName}
                          </motion.p>
                          <motion.div
                            className="flex items-center mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <FaStar className="text-yellow-400 text-sm mr-1" />
                            <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                              {0} lượt đánh giá
                            </span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Balance with pulse animation */}
                      <motion.div
                        className="mt-3 bg-white rounded-lg p-3 shadow-inner border border-emerald-100"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-500">
                              Số dư khả dụng
                            </p>
                            <motion.p
                              className="text-xl font-bold text-emerald-600"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              {0}đ
                            </motion.p>
                          </div>
                          <motion.button
                            className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaPlus className="inline mr-1" />
                            Nạp tiền
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Menu Items with Staggered Animation */}
                    <motion.div
                      className="divide-y divide-emerald-50"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                    >
                      {[
                        {
                          icon: <FaUser className="text-emerald-500" />,
                          text: "Trang cá nhân",
                          to: "/profile",
                        },
                        {
                          icon: <FaHistory className="text-blue-500" />,
                          text: "Lịch sử đặt sân",
                          to: "/history",
                        },
                        {
                          icon: <FaHeart className="text-rose-500" />,
                          text: "Sân yêu thích",
                          to: "/favorites",
                        },
                        {
                          icon: <FaStar className="text-yellow-500" />,
                          text: "Đánh giá của tôi",
                          to: "/reviews",
                        },
                        {
                          icon: <FaWallet className="text-purple-500" />,
                          text: "Ví thanh toán",
                          to: "/wallet",
                        },
                        {
                          icon: <FaCrown className="text-amber-500" />,
                          text: "Gói hội viên",
                          to: "/membership",
                        },
                        {
                          icon: <FaTimesCircle className="text-gray-500" />,
                          text: "Đơn đã hủy",
                          to: "/canceled",
                        },
                        {
                          icon: <FaHeadset className="text-sky-500" />,
                          text: "Hỗ trợ",
                          to: "/support",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.text}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            to={item.to}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-emerald-50 transition-all group"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <motion.span
                              className="mr-3 text-lg group-hover:scale-110 transition-transform"
                              whileHover={{ scale: 1.2 }}
                            >
                              {item.icon}
                            </motion.span>
                            <span className="group-hover:font-medium group-hover:text-emerald-700 transition-all">
                              {item.text}
                            </span>
                            <motion.span
                              className="ml-auto opacity-0 group-hover:opacity-100 text-emerald-500"
                              initial={{ x: -10 }}
                              animate={{ x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <FaChevronRight className="text-xs" />
                            </motion.span>
                          </Link>
                        </motion.div>
                      ))}

                      {/* Logout with special animation */}
                      <motion.div
                        className="border-t border-emerald-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 transition-colors group"
                          whileHover={{ x: [0, -3, 3, -2, 2, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.span
                            className="mr-3 group-hover:animate-pulse"
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <FaPowerOff />
                          </motion.span>
                          <span className="font-medium">Đăng xuất</span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
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
