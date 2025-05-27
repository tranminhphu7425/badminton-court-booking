import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaStar, FaClock, FaCalendarAlt } from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import CourtCard from "../../components/CourtCard";
import Div from "../../components/Div";
import { FaThLarge, FaList } from "react-icons/fa";
import LocationDetail from "../../components/LocationDetail";

const Favorite = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // Watch for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
      setFavoriteIds(savedFavorites);
    };

    // Initial load
    handleStorageChange();

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Fetch favorite locations when favoriteIds changes
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (favoriteIds.length > 0) {
          const response = await Promise.all(
            favoriteIds.map(id => 
              fetch(`http://localhost:8081/api/locations/${id}`).then(res => res.json())
          ));
          setFavorites(response);
        } else {
          setFavorites([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteIds]);

  const handleRemoveFavorite = (locationId) => {
    const updatedFavorites = favorites.filter(loc => loc.LocationID !== locationId);
    setFavorites(updatedFavorites);
    
    const favoriteIds = updatedFavorites.map(loc => loc.LocationID);
    localStorage.setItem('favoriteLocations', JSON.stringify(favoriteIds));
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    // console.log("Selected location: ", location);
    setShowLocationModal(true);
    // Thêm history push nếu muốn thay đổi URL
    // navigate(`/locations/${location.LocationID}`, { replace: false });
  };

  const handleCloseModal = () => {
    setShowLocationModal(false);
    // Refresh favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteLocations')) || [];
    setFavoriteIds(savedFavorites);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Đang tải danh sách yêu thích...
        </p>
      </div>
    );
  }

  return (
    <div className="favorite-page min-h-screen dark:bg-gray-800">
      {/* Hero Section - Giống với SportLayout */}
      <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
              
                Địa điểm yêu thích
              </h1>
              <p className="text-lg dark:text-gray-200">
                Danh sách các địa điểm bạn đã lưu
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate('/sports/all')}
              >
                <FaMapMarkerAlt className="mr-2" /> Khám phá địa điểm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Chưa có địa điểm yêu thích
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Hãy thêm địa điểm vào danh sách yêu thích của bạn
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/sports/all')}
                  className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                >
                  Khám phá địa điểm
                </button>
              </div>
            </div>
          ) : (
            <>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                 Có {favorites.length} địa điểm yêu thích
                </h2>

                <div className="flex items-center space-x-4">
                  {/* Dropdown sắp xếp */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                      Sắp xếp:
                    </span>
                    <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm dark:bg-gray-700 dark:text-white">
                      <option>Phổ biến nhất</option>
                      <option>Đánh giá cao nhất</option>
                      <option>Giá thấp đến cao</option>
                      <option>Giá cao đến thấp</option>
                    </select>
                  </div>

                  {/* Nút chuyển chế độ */}
                  <button
                    onClick={() => setMode((prev) => (prev === 0 ? 1 : 0))}
                    className="p-2 border rounded-md text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={
                      mode === 0
                        ? "Chuyển sang dạng danh sách"
                        : "Chuyển sang dạng lưới"
                    }
                  >
                    {mode === 0 ? <FaList /> : <FaThLarge />}
                  </button>
                </div>
              </div>
             

              <div className={`grid grid-cols-1 ${
                  mode == 0 ? "md:grid-cols-2 lg:grid-cols-3" : ""
                } gap-8`}>
                {favorites.map((location) => (
                  <Div key={location.LocationID}>
                    <CourtCard
                      name={location.LocationName}
                      image={location.image}
                      location={location.Address}
                      rating={parseFloat(location.AverageRating).toFixed(1)}
                      sport={location.Sports?.[0]?.SportCode}
                      badges={
                        <>
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-2 py-1 rounded mr-1 inline-flex items-center">
                            <FaClock className="mr-1" />
                            {location.OpeningTime.split(":").slice(0, 2).join(":")} -{" "}
                            {location.ClosingTime.split(":").slice(0, 2).join(":")}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFavorite(location.LocationID);
                            }}
                            className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm px-2 py-1 rounded inline-flex items-center"
                          >
                            <FaHeart className="mr-1" />
                            Bỏ yêu thích
                          </button>
                        </>
                      }
                      mode = {mode}
                      onClick={() => handleLocationClick(location)}
                    />
                  </Div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      {/* Location Detail Modal */}
      { selectedLocation && showLocationModal && (
        <div className="fixed md:w-3/4 h-5/6 m-auto inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-6xl sm:w-full">
              <LocationDetail
                locationId={selectedLocation.LocationID}
                onClose={handleCloseModal}
                isModal={true}
                isFavoritePage = {true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;