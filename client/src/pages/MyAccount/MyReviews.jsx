import { useState, useEffect } from "react";
import {
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import Section from "../../components/Section";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock data - Thay thế bằng API call thực tế
  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        // Giả lập API call
        setTimeout(() => {
          const mockReviews = [
            {
              id: 1,
              courtName: "Sân bóng đá Hoa Lư",
              sportType: "Bóng đá",
              date: "15/06/2024",
              rating: 5,
              comment:
                "Sân rất tốt, mặt cỏ đẹp, nhân viên nhiệt tình. Sẽ quay lại đây thường xuyên!",
              image: "https://via.placeholder.com/150",
              editable: true,
            },
            {
              id: 2,
              courtName: "Sân cầu lông Sunshine",
              sportType: "Cầu lông",
              date: "20/06/2024",
              rating: 4,
              comment:
                "Sân ổn, giá cả hợp lý nhưng đèn hơi tối. Nên cải thiện hệ thống chiếu sáng.",
              image: "https://via.placeholder.com/150",
              editable: true,
            },
            {
              id: 3,
              courtName: "Sân tennis Quận 1",
              sportType: "Tennis",
              date: "10/06/2024",
              rating: 3,
              comment:
                "Mặt sân hơi trơn khi trời mưa, cần bảo trì thường xuyên hơn.",
              image: "https://via.placeholder.com/150",
              editable: false,
            },
          ];
          setReviews(mockReviews);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Không thể tải đánh giá của bạn");
        setLoading(false);
        console.error(err);
      }
    };

    fetchMyReviews();
  }, []);

  const handleEditReview = (reviewId) => {
    // Xử lý chỉnh sửa đánh giá
    console.log("Edit review:", reviewId);
    // navigate(`/reviews/edit/${reviewId}`);
  };

  const handleDeleteReview = (reviewId) => {
    // Xử lý xóa đánh giá
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-4xl mb-4">
          <FaTimesCircle className="mx-auto" />
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="my-reviews-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                Đánh giá của tôi
              </h1>
              <p className="text-lg dark:text-gray-200">
                Xem và quản lý các đánh giá bạn đã đăng
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-6 py-3 rounded-lg font-medium flex items-center"
                onClick={() => navigate("/sports/all")}
              >
                <GiTennisCourt className="mr-2" /> Đặt sân mới
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Section>
        {loading ? (
          <div className="text-center py-12 ">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Đang tải đánh giá của bạn...
            </p>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <GiTennisCourt className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  Bạn chưa có đánh giá nào
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Hãy đặt sân và trải nghiệm để để lại đánh giá
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/sports/all")}
                    className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:hover:bg-green-800"
                  >
                    Đặt sân ngay
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img
                          src={review.image}
                          alt={review.courtName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {review.courtName}
                          </h3>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-gray-600 dark:text-gray-300">
                              ({review.rating}/5)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                          <FaUser className="mr-1" />
                          <span className="text-sm mr-4">Bạn</span>
                          <FaClock className="mr-1" />
                          <span className="text-sm">{review.date}</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {review.comment}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300">
                            {review.sportType}
                          </span>

                          {review.editable && (
                            <div className="space-x-2">
                              <button
                                onClick={() => handleEditReview(review.id)}
                                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900"
                                title="Chỉnh sửa"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteReview(review.id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                                title="Xóa"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Section>
    </div>
  );
};

export default MyReviews;
