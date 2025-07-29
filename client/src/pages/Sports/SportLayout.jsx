import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaThLarge,
  FaList,
  FaFire,
  FaChevronRight,
} from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";

import sportTypeApi from "../../api/sportTypeApi";

import AddressSelector from "../../components/AddressSelector";

import LocationDetail from "../../components/LocationDetail";

import ShowList from "../../components/ShowList";

import locationApi from "../../api/locationApi";

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const SportLayout = () => {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [locations, setLocations] = useState([]);
  const [mode, setMode] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // State cho bộ lọc
  const [filters, setFilters] = useState({
    province: null,
    district: null,
    ward: null,
    priceRange: [0, 200000],
    availableWithinHour: false,
    rating: 0,
    amenities: {
      parking: false,
      shower: false,
      drinks: false,
      lights: false,
    },
  });

  const { sportCode } = useParams();
  if (sportCode === "all") {
    console.log("SportCode: all");
  }

  const [sportType, setSportType] = useState(null);
  console.log("Sport types: ", sportType);

  useEffect(() => {
    const loadSportTypes = async (sportCode) => {
      try {
        const data = await sportTypeApi.fetchSportTypes();
        console.log("sedfsdfs:", data);
        const targetsportType = data.find(
          (item) => item.SportCode === sportCode
        );
        setSportType(targetsportType);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    loadSportTypes(sportCode);
  }, [sportCode]);

  const handleAddressChange = (address) => {
    setFilters({
      ...filters,
      province: address.province || "",
      district: address.district || "",
      ward: address.ward || "",
    });
  };

  useEffect(() => {
    const loadLocations = async (sportCode) => {
      try {
        const data = await locationApi.fetchLocationsBySport(sportCode);
        setLocations(data);
        console.log("Locations:", data);
        setCourts(data);
        setFilteredCourts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    loadLocations(sportCode);
  }, [sportCode]);

  // Hàm áp dụng bộ lọc
  const applyFilters = () => {
    let results = [...courts];

    // Lọc theo địa điểm
    if (filters.province) {
      results = results.filter(
        (court) => court.province === filters.province.name
      );
    }
    if (filters.district) {
      results = results.filter(
        (court) => court.district === filters.district.name
      );
    }
    if (filters.ward) {
      results = results.filter((court) => court.ward === filters.ward.name);
    }

    // Lọc theo khoảng giá
    // results = results.filter(
    //   (court) =>
    //     court.priceRange[0] >= filters.priceRange[0] &&
    //     court.priceRange[1] <= filters.priceRange[1]
    // );

    // Lọc theo rating
    if (filters.rating > 0) {
      results = results.filter((court) => court.rating >= filters.rating);
    }

    // Lọc sân có slot trống trong 1h tới
    if (filters.availableWithinHour) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      results = results.filter((court) => {
        return court.availableSlots.some((slot) => {
          const [startTime] = slot.split("-");
          const [hour, minute] = startTime.split(":").map(Number);

          // Tính thời gian còn lại đến slot (tính bằng phút)
          const minutesUntilSlot =
            (hour - currentHour) * 60 + (minute - currentMinute);
          return minutesUntilSlot >= 0 && minutesUntilSlot <= 60;
        });
      });
    }

    // Lọc theo tiện ích
    const selectedAmenities = Object.entries(filters.amenities)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    if (selectedAmenities.length > 0) {
      results = results.filter((court) =>
        selectedAmenities.every((amenity) => court.amenities.includes(amenity))
      );
    }

    setFilteredCourts(results);
    setShowFilters(false);
  };

  console.log("Filtered courts:", filteredCourts);
  console.log("Filtered:", filters);
  // Reset bộ lọc
  const resetFilters = () => {
    setFilters({
      province: null,
      district: null,
      ward: null,
      priceRange: [0, 200000],
      availableWithinHour: false,
      rating: 0,
      amenities: {
        parking: false,
        shower: false,
        drinks: false,
        lights: false,
      },
    });
    setFilteredCourts(courts);
  };

  // Hàm kiểm tra xem có filter đang được áp dụng không

  const isFilterActive = () => {
    return (
      filters.province ||
      filters.district ||
      filters.ward ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 200000 ||
      filters.availableWithinHour ||
      filters.rating > 0 ||
      Object.values(filters.amenities).some(Boolean)
    );
  };
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    // console.log("Selected location: ", location);
    setShowLocationModal(true);
    // Thêm history push nếu muốn thay đổi URL
    // navigate(`/locations/${location.LocationID}`, { replace: false });
  };
  if (sportType) {
    var backgroundImage1 = new URL(
      `../../assets/images/backgrounds/sports/${capitalizeFirstLetter(
        sportType.SportCode
      )}.jpg`,
      import.meta.url
    ).href;
  }

  return sportType || sportCode === "all" ? (
    <div className="badminton-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section
        className={`hero-section text-white ${
          backgroundImage1
            ? "py-15 md:py-20 lg:py-45 "
            : "py-20 bg-green-700 dark:bg-green-800"
        } relative`}
        style={{
          backgroundImage: backgroundImage1
            ? `url(${backgroundImage1})`
            : undefined,

          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {!backgroundImage1 ? (
          ``
        ) : (
          <div className="absolute inset-0 bg-black opacity-20"></div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white leading-tight drop-shadow-[2px_2px_0_#000]">
                {sportCode !== "all"
                  ? `Sân ${sportType.SportName}`
                  : `Danh sách tất cả các sân`}
              </h1>
              <p className="text-lg dark:text-gray-200 leading-tight drop-shadow-[2px_2px_0_#000]">
                Tìm và đặt sân{" "}
                {sportCode !== "all" ? sportType.SportName.toLowerCase() : null}{" "}
                ưng ý nhất
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate("/booking")}
              >
                <FaCalendarAlt className="mr-2" /> Đặt sân ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-gray-50 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={`Tìm sân${
                  sportCode !== "all"
                    ? ` ${sportType.SportName.toLowerCase()}`
                    : ""
                }...`}
                className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            </div>
            <button
              className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center ${
                isFilterActive()
                  ? "bg-green-600 dark:bg-green-700 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
              }`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" /> Bộ lọc{" "}
              {isFilterActive() && `(${filteredCourts.length})`}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Lọc theo địa điểm */}
                <AddressSelector
                  onAddressChange={handleAddressChange}
                  selectedProvince={filters.province}
                  selectedDistrict={filters.district}
                  selectedWard={filters.ward}
                />

                {/* Lọc theo giá */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Khoảng giá: {filters.priceRange[0].toLocaleString()} -{" "}
                    {filters.priceRange[1].toLocaleString()} VNĐ
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="10000"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [
                            parseInt(e.target.value),
                            filters.priceRange[1],
                          ],
                        })
                      }
                      className="w-full dark:bg-gray-700"
                    />
                    <input
                      type="range"
                      min={filters.priceRange[0]}
                      max="200000"
                      step="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          priceRange: [
                            filters.priceRange[0],
                            parseInt(e.target.value),
                          ],
                        })
                      }
                      className="w-full dark:bg-gray-700"
                    />
                  </div>
                </div>

                {/* Lọc theo rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Đánh giá từ
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        rating: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="0">Tất cả</option>
                    <option value="4">4 sao trở lên</option>
                    <option value="4.5">4.5 sao trở lên</option>
                  </select>
                </div>

                {/* Lọc theo thời gian trống */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="availableWithinHour"
                    checked={filters.availableWithinHour}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        availableWithinHour: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-700"
                  />
                  <label
                    htmlFor="availableWithinHour"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <FaClock className="mr-1" /> Có lịch trống trong 1h tới
                  </label>
                </div>

                {/* Lọc theo tiện ích */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tiện ích
                  </label>
                  <div className="space-y-2">
                    {Object.entries(filters.amenities).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`amenity-${key}`}
                          checked={value}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              amenities: {
                                ...filters.amenities,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-700"
                        />
                        <label
                          htmlFor={`amenity-${key}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300 capitalize"
                        >
                          {key === "parking" && "Chỗ đậu xe"}
                          {key === "shower" && "Phòng tắm"}
                          {key === "drinks" && "Nước uống"}
                          {key === "lights" && "Đèn chiếu sáng"}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Đặt lại
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-4 dark:bg-gray-800 relative">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Đang tải danh sách sân...
              </p>
            </div>
          ) : filteredCourts.length === 0 ? (
            <div className="text-center py-12">
              <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Không tìm thấy sân phù hợp
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Hãy thử điều chỉnh bộ lọc của bạn
              </p>
              <div className="mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row">
              {/* Main content */}
              <div className="w-full lg:w-3/4">
                <ShowList
                  filteredCourts={filteredCourts}
                  sportCode={sportCode}
                  sportType={sportType}
                  mode={mode}
                  setMode={setMode}
                  handleLocationClick={handleLocationClick}
                />
              </div>

              {/* Top sân bên phải - chỉ hiển thị trên desktop */}
              <div className="hidden lg:block lg:w-1/4 lg:pl-8 lg:pr-0 lg:ml-8 lg:-mr-8">
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 sticky top-20">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded mr-2">
                      TOP
                    </span>
                    Sân đặt nhiều nhất hôm nay
                  </h3>

                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        name: "Sân bóng Hoa Lư",
                        bookings: 42,
                        sport: "Bóng đá",
                      },
                      {
                        id: 2,
                        name: "Sân cầu lông Sunshine",
                        bookings: 35,
                        sport: "Cầu lông",
                      },
                      {
                        id: 3,
                        name: "Sân tennis Q1",
                        bookings: 28,
                        sport: "Tennis",
                      },
                      {
                        id: 4,
                        name: "Sân bóng rổ Galaxy",
                        bookings: 22,
                        sport: "Bóng rổ",
                      },
                      {
                        id: 5,
                        name: "Sân bóng chuyền Sài Gòn",
                        bookings: 18,
                        sport: "Bóng chuyền",
                      },
                    ].map((court) => (
                      <div
                        key={court.id}
                        className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition cursor-pointer"
                        onClick={() =>
                          handleLocationClick({ LocationID: court.id })
                        }
                      >
                        <span className="bg-green-500 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full mr-3 mt-1">
                          {court.id}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            {court.name}
                          </h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-500 rounded-full text-gray-600 dark:text-gray-200">
                              {court.sport}
                            </span>
                            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                              {court.bookings} lượt
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg text-sm font-medium transition">
                    Xem tất cả
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Location Detail Modal */}
      {selectedLocation && showLocationModal && (
        <div className="fixed md:w-3/4 h-5/6 m-auto inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowLocationModal(false)}
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-2 sm:align-middle sm:max-w-6xl sm:w-full">
              <LocationDetail
                locationId={selectedLocation.LocationID}
                onClose={() => setShowLocationModal(false)}
                isModal={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default SportLayout;
