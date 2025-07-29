import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaParking,
  FaShower,
  // FaGlassWater,
  FaLightbulb,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/locations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch location details");
        }
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error("Error fetching location details:", error);
        toast.error("Không thể tải thông tin sân");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Không tìm thấy thông tin sân
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = (courtId, sportTypeId) => {
    navigate(`/booking/${id}/${sportTypeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-[400px] bg-gray-200 dark:bg-gray-800">
        {location.Images && location.Images.length > 0 ? (
          <>
            <img
              src={location.Images[selectedImage]}
              alt={location.LocationName}
              className="w-full h-full object-cover"
            />
            {location.Images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {location.Images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full ${
                      selectedImage === index
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">
              Không có hình ảnh
            </span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {location.LocationName}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500 mr-1.5" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {parseFloat(location.AverageRating || 0).toFixed(1)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    ({location.TotalReviews || 0} đánh giá)
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{location.Address}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaClock className="mr-2" />
                  <span>
                    {location.OpeningTime?.split(":").slice(0, 2).join(":")} -{" "}
                    {location.ClosingTime?.split(":").slice(0, 2).join(":")}
                  </span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {location.Description || "Chưa có mô tả"}
                </p>
              </div>

              {/* Features */}
              {location.Features && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {location.Features.Parking && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaParking className="mr-2 text-green-500" />
                      <span>Chỗ đậu xe</span>
                    </div>
                  )}
                  {location.Features.Shower && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaShower className="mr-2 text-green-500" />
                      <span>Phòng tắm</span>
                    </div>
                  )}
                  {location.Features.Drinks && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaGlassWater className="mr-2 text-green-500" />
                      <span>Nước uống</span>
                    </div>
                  )}
                  {location.Features.Lights && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FaLightbulb className="mr-2 text-green-500" />
                      <span>Đèn chiếu sáng</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "overview"
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "reviews"
                        ? "border-green-500 text-green-600 dark:text-green-400"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Đánh giá ({location.TotalReviews || 0})
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      Danh sách sân
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {location.Courts.map((court) => (
                        <div
                          key={court.CourtID}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-800 dark:text-white">
                              Sân {court.CourtNumber}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {court.SportName}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleBookNow(court.CourtID, court.SportTypeID)
                            }
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                          >
                            <FaCalendarAlt className="mr-2" />
                            Đặt sân
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    {location.Reviews && location.Reviews.length > 0 ? (
                      <div className="space-y-6">
                        {location.Reviews.map((review) => (
                          <div
                            key={review.ReviewID}
                            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                          >
                            <div className="flex items-center mb-4">
                              <img
                                src={
                                  review.CustomerAvatar ||
                                  "https://via.placeholder.com/40"
                                }
                                alt={review.CustomerName}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <div>
                                <h4 className="font-medium text-gray-800 dark:text-white">
                                  {review.CustomerName}
                                </h4>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <FaStar className="text-yellow-500 mr-1" />
                                  <span>{review.Rating}</span>
                                  <span className="mx-2">•</span>
                                  <span>
                                    {new Date(
                                      review.CreatedAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              {review.Comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          Chưa có đánh giá nào
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaPhone className="mr-3 text-green-500" />
                  <span>{location.Phone || "Chưa có số điện thoại"}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaEnvelope className="mr-3 text-green-500" />
                  <span>{location.Email || "Chưa có email"}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaFacebook className="mr-3 text-green-500" />
                  <span>{location.Facebook || "Chưa có Facebook"}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FaInstagram className="mr-3 text-green-500" />
                  <span>{location.Instagram || "Chưa có Instagram"}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Vị trí
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241779445467!2d106.6983!3d10.7756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzMyLjEiTiAxMDbCsDQxJzUzLjUiRQ!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

