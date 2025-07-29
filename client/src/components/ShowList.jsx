import { Suspense, lazy, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaThLarge,
  FaList,
  FaChevronDown,
  FaHeart,
} from "react-icons/fa";

import Div from "./Div";

import LocationCardLoading from "./LocationCardLoading";

const LocationCard = lazy(() => import("./LocationCard"));

const ShowList = ({
  filteredCourts,
  sportCode,
  sportType,
  mode,
  setMode,
  handleLocationClick,
  isFavorite,
  handleRemoveFavorite
}) => {
  const PAGE_SIZE = 12;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + PAGE_SIZE);
  };

  // console.log("filteredCourts", filteredCourts);
  // console.log("sportCode", sportCode);
  // console.log("sportType", sportType);
  // console.log("mode", mode);
  // console.log("visibleCount", visibleCount);
  // console.log("handleLoadMore", handleLoadMore);
  // console.log("isfavorite page", isFavorite);
  return (
    sportCode && (
      <>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {filteredCourts.length} sân{" "}
            {sportCode !== "all" ? sportType.SportName.toLowerCase() : null} phù
            hợp
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

        <div
          className={`grid grid-cols-1 auto-rows-[1fr] ${
            mode == 0 ? "md:grid-cols-2 lg:grid-cols-3 " : ""
          } gap-8`}
        >
          {filteredCourts.slice(0, visibleCount).map((location) => (
            <Div key={location.LocationID}>
              <Suspense fallback={<LocationCardLoading mode={mode} />}>
                <LocationCard
                  name={location.LocationName}
                  image={location.PrimaryImageUrl}
                  location={location.Address}
                  rating={parseFloat(location.AverageRating).toFixed(1)}
                  sport={sportCode !== "all" ? sportType.SportCode : null}
                  badges={
                    <>
                      {isFavorite ? (
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
                      ) : <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-2 py-1 rounded mr-1 inline-flex items-center">
                      <FaClock className="mr-1" />
                      {location.OpeningTime.split(":")
                        .slice(0, 2)
                        .join(":")}{" "}
                      -{" "}
                      {location.ClosingTime.split(":").slice(0, 2).join(":")}
                    </span>}
                    </>
                  }
                  mode={mode}
                  onClick={() => handleLocationClick(location)} // Sửa lại thành arrow function
                />
              </Suspense>
            </Div>
          ))}
        </div>
        {visibleCount < filteredCourts.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 flex items-center space-x-2"
            >
              <span>Xem thêm {filteredCourts.length - visibleCount} sân</span>
              <FaChevronDown className="animate-bounce" />
            </button>
          </div>
        )}
      </>
    )
  );
};

export default ShowList;
