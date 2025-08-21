import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaHeart,
  FaList,
} from "react-icons/fa";
import {
  GiTennisCourt,
  GiSoccerBall,
  GiBasketballBall,
  GiVolleyballBall,
} from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { MdPool } from "react-icons/md";
import ReviewCard from "./ReviewCard";
import locationApi from "../api/locationApi";

const LocationDetail = ({ onClose, isModal, locationId, isFavoritePage }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavoritesList, setShowFavoritesList] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [selectedSport, setSelectedSport] = useState(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    const loadLocationDetail = async (locationId) => {
      try {
        const data = await locationApi.fetchLocationById(locationId);
        setLocation(data);
        setLoading(false);
        console.log("Thong tin ve dia diem: ", data);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    loadLocationDetail(locationId);
  }, [locationId]);

  useEffect(() => {
    // Check if location is in favorites when component mounts
    const favorites =
      JSON.parse(localStorage.getItem("favoriteLocations")) || [];
    setIsFavorite(favorites.includes(locationId));
    console.log(favorites);
    console.log(locationId);
  }, [locationId]);

  const getSportIcon = (sportCode) => {
    switch (sportCode) {
      case "BAD":
        return <GiTennisCourt className="text-blue-500" />;
      case "FOT":
        return <GiSoccerBall className="text-green-500" />;
      case "BAS":
        return <GiBasketballBall className="text-orange-500" />;
      case "VOL":
        return <GiVolleyball className="text-purple-500" />;
      case "SWI":
        return <MdPool className="text-cyan-500" />;
      case "GYM":
        return <IoIosFitness className="text-red-500" />;
      default:
        return <GiTennisCourt className="text-gray-500" />;
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddFavorite = (locationId) => {
    handleFavoriteToggle();
    if (!isFavorite) {
      (e) => {
        e.stopPropagation();
        handleRemoveFavorite(locationId);
      };
    }
    const favorites =
      JSON.parse(localStorage.getItem("favoriteLocations")) || [];
    if (!favorites.includes(locationId)) {
      const updatedFavorites = [...favorites, locationId];
      localStorage.setItem(
        "favoriteLocations",
        JSON.stringify(updatedFavorites)
      );
    } else {
      // Remove from favorites if already exists
      const updatedFavorites = favorites.filter((id) => id !== locationId);
      localStorage.setItem(
        "favoriteLocations",
        JSON.stringify(updatedFavorites)
      );
    }
  };
  const handleRemoveFavorite = (locationId) => {
    const updatedFavorites = favorites.filter(
      (loc) => loc.LocationID !== locationId
    );
    setFavorites(updatedFavorites);

    const favoriteIds = updatedFavorites.map((loc) => loc.LocationID);
    localStorage.setItem("favoriteLocations", JSON.stringify(favoriteIds));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Đang tải thông tin sân...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
          Đã xảy ra lỗi
        </h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{error}</p>
        <div className="mt-6">
          <button
            onClick={() => navigate(0)}
            className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return (
    <div className={`${isModal ? "" : "min-h-screen dark:bg-gray-800"}`}>
      {/* Header - Chỉ hiển thị nút đóng khi là modal */}

      <div className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {location?.LocationName}
          </h1>
          <div className="flex items-center gap-4">
            {!isFavoritePage && (
              <Link
                to="/favorites"
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <FaList className="w-5 h-5" />
                <span className="text-sm font-medium">Danh sách yêu thích</span>
              </Link>
            )}

            <button
              onClick={() => handleAddFavorite(locationId)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              <FaHeart className="w-6 h-6" />
            </button>

            {isModal && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {/* Image gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={
                location.Images[mainImageIndex] ||
                "https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/495958050_1017980043814723_5626933874150903583_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFzelKbwhjOIvvs-ZT6rn1mRO31um_gkVpE7fW6b-CRWhHMeS0XWieRbAr9flfhblf-IvZl8EJoZnA4ak9QMWwI&_nc_ohc=A4zMW4igbCYQ7kNvwGNd_i3&_nc_oc=AdlTJId8hokB1aaGAhhI2lJdAj4pYRpMda8D3gPnaObwQgcGp-xMIYF5dhdWJth2aqQ&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=GZg2X7GGhYIFk05X-5NYHQ&oh=00_AfJffIJrBmC3irZGT-ZVtgJkPPq9mkBVTB9psEeArcvO_w&oe=683B073E"
              }
              alt={location.LocationName}
              className="w-full h-64 lg:h-96 object-cover rounded-lg"
              onClick={() => {
                setMainImageIndex(
                  (prev) => (prev + 1) % location.Images.length
                );
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={
                  location.Images[i] ||
                  "https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/495958050_1017980043814723_5626933874150903583_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFzelKbwhjOIvvs-ZT6rn1mRO31um_gkVpE7fW6b-CRWhHMeS0XWieRbAr9flfhblf-IvZl8EJoZnA4ak9QMWwI&_nc_ohc=A4zMW4igbCYQ7kNvwGNd_i3&_nc_oc=AdlTJId8hokB1aaGAhhI2lJdAj4pYRpMda8D3gPnaObwQgcGp-xMIYF5dhdWJth2aqQ&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=GZg2X7GGhYIFk05X-5NYHQ&oh=00_AfJffIJrBmC3irZGT-ZVtgJkPPq9mkBVTB9psEeArcvO_w&oe=683B073E"
                }
                alt={`${location.LocationName} ${i}`}
                className="w-full h-32 object-cover rounded-lg"
                onClick={() => setMainImageIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Basic info and tabs */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Basic info */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {location.LocationName}
                  </h2>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>
                      {location.Address}, {location.ward}, {location.district},{" "}
                      {location.province}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full mr-3">
                        <FaStar className="mr-1" />
                        <span>
                          {parseFloat(location.AverageRating).toFixed(1)}
                        </span>
                      </div>
                      <span
                        className="text-gray-600 dark:text-gray-300"
                        onClick={() => {
                          setActiveTab("reviews");
                          setTimeout(() => {
                            reviewRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 100); // delay nhẹ nếu cần chờ tab content render xong
                        }}
                      >
                        ({location.ReviewCount} đánh giá)
                      </span>
                    </div>

                    <div className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
                      <FaClock className="mr-1" />
                      <span>
                        {location.OpeningTime.split(":").slice(0, 2).join(":")}{" "}
                        -{" "}
                        {location.ClosingTime.split(":").slice(0, 2).join(":")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mt-4">
                {location.Description}
              </p>

              {/* Amenities */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  Tiện ích
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {location.amenities?.parking == "1" && (
                    <div className="flex items-center">
                      <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                        🅿️ Chỗ đậu xe
                      </span>
                    </div>
                  )}
                  {location.amenities?.shower == "1" && (
                    <div className="flex items-center">
                      <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                        🚿 Phòng tắm
                      </span>
                    </div>
                  )}
                  {location.amenities?.drinks == "1" && (
                    <div className="flex items-center">
                      <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                        🥤 Nước uống
                      </span>
                    </div>
                  )}
                  {location.amenities?.lights == "1" && (
                    <div className="flex items-center">
                      <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                        💡 Đèn chiếu sáng
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden mb-6" ref={reviewRef} id="review-section">
              <div className="border-b border-gray-200 dark:border-gray-600">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "info"
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    Thông tin sân
                  </button>
                  <button
                    onClick={() => setActiveTab("sports")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "sports"
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    Các môn thể thao
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === "reviews"
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    Đánh giá ({location.ReviewCount})
                  </button>
                </nav>
              </div>

              <div className="p-6" >
                {activeTab === "info" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Giới thiệu
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {location.Description}
                    </p>

                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Giờ mở cửa
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg mb-4">
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-600 dark:text-gray-300" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {location.OpeningTime.split(":")
                            .slice(0, 2)
                            .join(":")}{" "}
                          -{" "}
                          {location.ClosingTime.split(":")
                            .slice(0, 2)
                            .join(":")}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Giá tham khảo
                    </h3>
                    <div className="space-y-2">
                      {location.Sports?.map((sport) => (
                        <div
                          key={sport.SportCode}
                          className="flex justify-between items-center bg-gray-50 dark:bg-gray-600 p-3 rounded-lg"
                        >
                          <div className="flex items-center">
                            {getSportIcon(sport.SportCode)}
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {sport.SportName}
                            </span>
                          </div>
                          <span className="text-gray-800 dark:text-white font-medium">
                            {sport.MinPrice?.toLocaleString()} -{" "}
                            {sport.MaxPrice?.toLocaleString()} VNĐ
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "sports" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Các môn thể thao tại sân
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {location.Sports?.map((sport) => (
                        <div
                          key={sport.SportCode}
                          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center mb-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3">
                              {getSportIcon(sport.SportCode)}
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                              {sport.SportName}
                            </h4>
                          </div>
                          <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <div>
                              <span className="font-medium">Giá:</span>{" "}
                              {sport.MinPrice?.toLocaleString()} -{" "}
                              {sport.MaxPrice?.toLocaleString()} VNĐ
                            </div>
                            <div>
                              <span className="font-medium">Số sân:</span>{" "}
                              {sport.CourtCount}
                            </div>
                          </div>
                          <Link
                            to={`/booking/${location.LocationID}/${sport.SportTypeID}`}
                            className="mt-4 w-full bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                          >
                            <FaCalendarAlt className="mr-2" />
                            Đặt sân {sport.SportName.toLowerCase()}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Đánh giá từ khách hàng
                      </h3>
                      <button className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded-lg">
                        Viết đánh giá
                      </button>
                    </div>

                    {location.Reviews?.length > 0 ? (
                      <div className="space-y-4">
                        {location.Reviews.map((review) => (
                          <ReviewCard
                            key={review.ReviewID}
                            author={review.UserName}
                            rating={review.Rating}
                            date={review.ReviewDate}
                            content={review.Comment}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                        <h4 className="mt-2 text-gray-600 dark:text-gray-300">
                          Chưa có đánh giá nào
                        </h4>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                          Hãy là người đầu tiên đánh giá sân này
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Booking card */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Đặt sân ngay
              </h3>

              <div className="space-y-4">
                {location.Sports?.map((sport) => (
                  <div
                    key={sport.SportCode}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                  >
                    <div className="flex items-center mb-2">
                      {getSportIcon(sport.SportCode)}
                      <span className="ml-2 font-medium text-gray-800 dark:text-white">
                        {sport.SportName}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Giá: {sport.MinPrice?.toLocaleString()} -{" "}
                      {sport.MaxPrice?.toLocaleString()} VNĐ
                    </div>
                    <Link
                      to={`/booking/${location.LocationID}/${sport.SportTypeID}`}
                      className="w-full bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                    >
                      <FaCalendarAlt className="mr-2" />
                      Đặt sân {sport.SportName.toLowerCase()}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Thêm nút đóng ở dưới cùng cho mobile */}
      {isModal && (
        <div className="lg:hidden bg-white dark:bg-gray-800 py-4 px-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800 text-white py-2 px-4 rounded-lg"
          >
            Đóng
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationDetail;
