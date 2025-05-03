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
} from "react-icons/fa";
import { GiTennisBall, GiShuttlecock, GiSoccerBall  } from "react-icons/gi";

import { MdSportsVolleyball } from "react-icons/md";



const api = {
  async fetchSportTypes(){
    try {
      const response = await fetch('http://localhost:8081/api/sporttypes');
      if (!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch courts");
      }

      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('Fetch courts error: ', error);
      throw new Error(`Lỗi tải danh sách các môn thể thao: ${error.message}`)
    }
  },
}


const translateIcon = {
  GiShuttlecock: <GiShuttlecock/>,
  GiSoccerBall: <GiSoccerBall/>,
  FaBasketballBall: <FaBasketballBall/>,
  MdSportsVolleyball: <MdSportsVolleyball/>,
  GiTennisBall: <GiTennisBall/>,
  FaTableTennis: <FaTableTennis/>
};


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSport, setActiveSport] = useState(null);
  const [sports, setSports] = useState([]);

  // const sports = [
  //   { id: "football", name: "Bóng đá", icon: <GiSoccerBall /> },
  //   { id: "badminton", name: "Cầu lông", icon: <GiShuttlecock /> },
  //   { id: "pickleball", name: "Pickleball", icon: <FaTableTennis /> },
  //   { id: "basketball", name: "Bóng rổ", icon: <FaBasketballBall /> },
  //   { id: "volleyball", name: "Bóng chuyền", icon: <MdSportsVolleyball /> },
  //   { id: "tennis", name: "Quần vợt", icon: <GiTennisBall /> },
  // ];
  useEffect(() => {
    const loadSportTypes = async() => {
      try{
        const data = await api.fetchSportTypes();
        setSports(data);
        console.log(data);

      } catch (err) {
             
          console.error(err);
      } 
    };
    loadSportTypes();
  }, []);

  // 0
  // : 
  // {SportTypeID: 1, SportName: 'Cầu lông', Description: 'Sân cầu lông tiêu chuẩn 6.1m x 13.4m', ImageURL: null, CreatedAt: '2025-04-25T11:17:39.000Z'}
  // 1
  // : 
  // {SportTypeID: 2, SportName: 'Bóng đá', Description: 'Sân bóng đá 5 người, 7 người hoặc 11 người', ImageURL: null, CreatedAt: '2025-04-25T11:17:39.000Z'}
  // 2
  // : 
  // {SportTypeID: 3, SportName: 'Bóng rổ', Description: 'Sân bóng rổ tiêu chuẩn 15m x 28m', ImageURL: null, CreatedAt: '2025-04-25T11:17:39.000Z'}
  // 3
  // : 
  // {SportTypeID: 4, SportName: 'Bóng chuyền', Description: 'Sân bóng chuyền tiêu chuẩn 9m x 18m', ImageURL: null, CreatedAt: '2025-04-25T11:17:39.000Z'}
  // 4
  // : 
  // {SportTypeID: 5, SportName: 'Tennis', Description: 'Sân tennis đơn hoặc đôi', ImageURL: null, CreatedAt: '2025-04-25T11:17:39.000Z'}
  

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
                          key={sport.SportCode}
                          to={`/sports/${sport.SportCode}`}
                          className="flex px-4 py-2 text-gray-800 hover:bg-green-100 items-center"
                        >
                          <span className="mr-2">{translateIcon[sport.Icon]}</span>
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
                <div>
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
                            key={sport.SportCode}
                            to={`/sports/${sport.SportCode}`}
                            className="flex py-2 px-3 text-white hover:bg-green-700 rounded items-center"
                          >
                            <span className="mr-2">{translateIcon[sport.Icon]}</span>
                            {sport.SportName}
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
