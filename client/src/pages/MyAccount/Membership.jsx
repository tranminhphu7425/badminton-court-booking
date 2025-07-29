import { useState, useEffect } from "react";
import { FaCrown, FaStar, FaCheck, FaArrowRight, FaGift } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import Section from "../../components/Section";

const Membership = () => {
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState([]);
  const [userMembership, setUserMembership] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API call
    const fetchMemberships = async () => {
      try {
        setTimeout(() => {
          const mockMemberships = [
            {
              id: 1,
              name: "Thành viên Đồng",
              price: "199.000đ",
              duration: "1 tháng",
              benefits: [
                "Giảm 5% khi đặt sân",
                "Ưu tiên đặt sân",
                "Tích điểm 1.2x"
              ],
              popular: false,
              icon: <FaStar className="text-amber-500" />
            },
            {
              id: 2,
              name: "Thành viên Bạc",
              price: "499.000đ",
              duration: "3 tháng",
              benefits: [
                "Giảm 10% khi đặt sân",
                "Ưu tiên đặt sân",
                "Tích điểm 1.5x",
                "1 lần đổi lịch miễn phí"
              ],
              popular: true,
              icon: <FaCrown className="text-gray-400" />
            },
            {
              id: 3,
              name: "Thành viên Vàng",
              price: "899.000đ",
              duration: "6 tháng",
              benefits: [
                "Giảm 15% khi đặt sân",
                "Ưu tiên đặt sân cao nhất",
                "Tích điểm 2x",
                "3 lần đổi lịch miễn phí",
                "Tặng 1 lần đặt sân miễn phí"
              ],
              popular: false,
              icon: <GiTrophyCup className="text-yellow-500" />
            }
          ];

          const mockUserMembership = {
            id: 2,
            expires: "15/10/2024"
          };

          setMemberships(mockMemberships);
          setUserMembership(mockUserMembership);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching memberships:", err);
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const handleUpgrade = (membershipId) => {
    console.log("Upgrade to membership:", membershipId);
    // navigate(`/checkout/membership/${membershipId}`);
  };

  if (loading) {
    return (
      <div className="membership-page min-h-screen dark:bg-gray-800">
        <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                  Gói Hội Viên
                </h1>
                <p className="text-lg dark:text-gray-200">
                  Nâng cấp trải nghiệm đặt sân của bạn
                </p>
              </div>
            </div>
          </div>
        </section>

        <Section>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Đang tải thông tin gói hội viên...
            </p>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="membership-page min-h-screen dark:bg-gray-800">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 dark:bg-green-800 text-white py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left dark:text-white">
                Gói Hội Viên
              </h1>
              <p className="text-lg dark:text-gray-200">
                Nâng cấp trải nghiệm đặt sân của bạn
              </p>
            </div>
            
            {userMembership && (
              <div className="mt-4 md:mt-0 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg shadow-sm">
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Gói hiện tại: {memberships.find(m => m.id === userMembership.id)?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hết hạn: {userMembership.expires}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Section>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Chọn gói phù hợp với bạn
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Nâng cấp để nhận nhiều ưu đãi và tiết kiệm hơn khi đặt sân
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  membership.popular
                    ? "border-2 border-green-500 dark:border-green-400 transform md:-translate-y-4"
                    : "border border-gray-200 dark:border-gray-600"
                }`}
              >
                {membership.popular && (
                  <div className="absolute top-0 right-0 bg-green-500 dark:bg-green-600 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                    PHỔ BIẾN
                  </div>
                )}

                <div
                  className={`p-6 text-center ${
                    membership.popular
                      ? "bg-green-600 dark:bg-green-700 text-white"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <div className="text-4xl mb-2 flex justify-center">
                    {membership.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{membership.name}</h3>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-3xl font-bold mr-2">
                      {membership.price}
                    </span>
                    <span
                      className={`text-sm ${
                        membership.popular
                          ? "text-green-100"
                          : "text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      /{membership.duration}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6">
                  <ul className="space-y-3 mb-8">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgrade(membership.id)}
                    className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center ${
                      membership.popular
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
                    }`}
                  >
                    {userMembership?.id === membership.id ? (
                      "Gói hiện tại"
                    ) : (
                      <>
                        {userMembership ? "Nâng cấp ngay" : "Đăng ký ngay"}
                        <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Lợi ích khi trở thành hội viên
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-sm">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-4">
                  <FaGift />
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white">
                  Ưu đãi đặc biệt
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Nhận các ưu đãi, khuyến mãi đặc biệt chỉ dành cho hội viên
                </p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-sm">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-4">
                  <FaStar />
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white">
                  Tích điểm nhanh
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Tích lũy điểm nhanh hơn để đổi quà và các ưu đãi hấp dẫn
                </p>
              </div>
              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-sm">
                <div className="text-green-500 dark:text-green-400 text-3xl mb-4">
                  <FaCheck />
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white">
                  Hỗ trợ ưu tiên
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Được hỗ trợ nhanh chóng và ưu tiên giải quyết các vấn đề
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Membership;