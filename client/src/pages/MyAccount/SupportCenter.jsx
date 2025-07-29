import { useState, useEffect } from "react";
import { FaHeadset, FaSearch, FaQuestionCircle, FaTicketAlt, FaBook, FaPhone, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Section from "../../components/Section";

const SupportCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API call for popular questions
    const fetchPopularQuestions = async () => {
      try {
        setTimeout(() => {
          const mockQuestions = [
            {
              id: 1,
              question: "Làm cách nào để đặt sân?",
              category: "Đặt sân"
            },
            {
              id: 2,
              question: "Tôi có thể hủy đặt sân không?",
              category: "Hủy đặt sân"
            },
            {
              id: 3,
              question: "Cách thức thanh toán được chấp nhận?",
              category: "Thanh toán"
            },
            {
              id: 4,
              question: "Làm sao để trở thành hội viên?",
              category: "Hội viên"
            },
            {
              id: 5,
              question: "Tôi không nhận được mã xác nhận?",
              category: "Tài khoản"
            },
            {
              id: 6,
              question: "Cách đánh giá sân sau khi chơi?",
              category: "Đánh giá"
            }
          ];
          setPopularQuestions(mockQuestions);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
      }
    };

    fetchPopularQuestions();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Xử lý tìm kiếm
    console.log("Searching for:", searchQuery);
  };

  if (loading) {
    return (
      <div className="support-center-page min-h-screen dark:bg-gray-800">
        <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">
                Trung Tâm Hỗ Trợ
              </h1>
              <p className="text-lg dark:text-gray-200">
                Chúng tôi luôn sẵn sàng giúp đỡ bạn
              </p>
            </div>
          </div>
        </section>

        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Đang tải thông tin hỗ trợ...
            </p>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="support-center-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FaHeadset className="text-4xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">
              Trung Tâm Hỗ Trợ
            </h1>
            <p className="text-lg dark:text-gray-200">
              Chúng tôi luôn sẵn sàng giúp đỡ bạn
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <Section>
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tìm kiếm câu hỏi hoặc vấn đề của bạn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-4 py-2"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </Section>

      {/* Main Content */}
      <Section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Help Card 1 */}
            <div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/support/faq')}
            >
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
                <FaQuestionCircle />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Câu hỏi thường gặp</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tìm câu trả lời cho các câu hỏi phổ biến nhất
              </p>
            </div>

            {/* Help Card 2 */}
            <div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/support/tickets')}
            >
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
                <FaTicketAlt />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Yêu cầu hỗ trợ</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gửi yêu cầu hỗ trợ trực tiếp đến đội ngũ của chúng tôi
              </p>
            </div>

            {/* Help Card 3 */}
            <div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate('/support/guides')}
            >
              <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
                <FaBook />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Hướng dẫn</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Các hướng dẫn chi tiết sử dụng hệ thống
              </p>
            </div>
          </div>

          {/* Popular Questions */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Câu hỏi phổ biến
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularQuestions.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/support/question/${item.id}`)}
                >
                  <div className="flex items-start">
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded mr-3">
                      {item.category}
                    </span>
                    <h3 className="text-gray-800 dark:text-white font-medium">
                      {item.question}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Liên hệ hỗ trợ trực tiếp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <FaPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Điện thoại</h3>
                    <p className="text-gray-600 dark:text-gray-300">1900 1234</p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Thứ 2 - Thứ 6: 8:00 - 18:00 | Thứ 7 - CN: 8:00 - 12:00
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <FaEnvelope className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@sportbooking.vn</p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Phản hồi trong vòng 24 giờ làm việc
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default SupportCenter;