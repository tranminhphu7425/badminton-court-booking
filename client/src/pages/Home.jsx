import { useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { GiTennisCourt, GiSoccerBall, GiBasketballBall } from "react-icons/gi";
import { MdSportsTennis, MdSportsVolleyball } from "react-icons/md";
import SportCard from "../components/SportCard";
import CourtCard from "../components/CourtCard";
import TestimonialCard from "../components/TestimonialCard";
import Section from "../components/Section";
import backgroundImage from "../../public/assets/images/backgrounds/home/home_bg.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dữ liệu mẫu
  const popularSports = [
    {
      id: "football",
      name: "Bóng đá",
      icon: <GiSoccerBall size={24} />,
      count: 32,
    },
    {
      id: "badminton",
      name: "Cầu lông",
      icon: <MdSportsTennis size={24} />,
      count: 28,
    },
    {
      id: "pickleball",
      name: "Pickleball",
      icon: <GiTennisCourt size={24} />,
      count: 25,
    },
    {
      id: "basketball",
      name: "Bóng rổ",
      icon: <GiBasketballBall size={24} />,
      count: 18,
    },
    {
      id: "volleyball",
      name: "Bóng chuyền",
      icon: <MdSportsVolleyball size={24} />,
      count: 15,
    },
    {
      id: "tennis",
      name: "Tennis",
      icon: <GiTennisCourt size={24} />,
      count: 12,
    },
  ];

  const popularCourts = [
    {
      id: 1,
      name: "Sân bóng đá Hoa Lư",
      image: "/images/football-court.jpg",
      location: "Quận 1, TP.HCM",
      price: "300.000 - 500.000đ/giờ",
      rating: 4.8,
      sport: "football",
    },
    {
      id: 2,
      name: "Sân cầu lông Phú Thọ",
      image: "/images/badminton-court.jpg",
      location: "Quận 11, TP.HCM",
      price: "100.000 - 200.000đ/giờ",
      rating: 4.5,
      sport: "badminton",
    },
    {
      id: 3,
      name: "Sân bóng rổ Quận 7",
      image: "/images/basketball-court.jpg",
      location: "Quận 7, TP.HCM",
      price: "150.000đ/giờ",
      rating: 4.7,
      sport: "basketball",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      comment: "Đặt sân rất dễ dàng và nhanh chóng. Sân bóng chất lượng tốt!",
      rating: 5,
      sport: "football",
    },
    {
      id: 2,
      name: "Trần Thị B",
      comment:
        "Lần đầu sử dụng dịch vụ rất hài lòng. Sân cầu lông rộng rãi, sạch sẽ.",
      rating: 4,
      sport: "badminton",
    },
    {
      id: 3,
      name: "Lê Văn C",
      comment:
        "Giá cả hợp lý, nhân viên hỗ trợ nhiệt tình. Sẽ tiếp tục ủng hộ.",
      rating: 5,
      sport: "basketball",
    },
  ];

  return (
    <div className="home-page dark:bg-gray-800">
      {/* Hero Section */}
      <section
        className="hero-section text-white py-20 md:py-30 lg:py-40 relative mb-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white text-white leading-tight drop-shadow-[2px_2px_0_#000]">
              Đặt Sân Thể Thao Dễ Dàng
            </h1>
            <p className="text-xl mb-8 dark:text-gray-200">
              Tìm và đặt sân bóng đá, cầu lông, tennis,... nhanh chóng với giá
              tốt nhất
            </p>

            <div className="search-box bg-white dark:bg-gray-700 rounded-lg p-2 flex items-center shadow-lg">
              <div className="flex-grow flex items-center">
                <FaSearch className="text-gray-400 dark:text-gray-300 mx-3" />
                <input
                  type="text"
                  placeholder="Tìm sân thể thao, địa điểm..."
                  className="flex-grow py-3 outline-none text-gray-800 dark:text-gray-200 dark:bg-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Sports Section */}
      <Section>
        <div className="bg-gray-50 dark:bg-gray-700 container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Môn Thể Thao Phổ Biến
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Chọn môn thể thao yêu thích của bạn và bắt đầu đặt sân ngay
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {popularSports.map((sport) => (
              <SportCard
                key={sport.id}
                icon={sport.icon}
                name={sport.name}
                count={sport.count}
                link={`/sports/${sport.id}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Popular Courts Section */}
      <Section>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Sân Nổi Bật
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Các sân thể thao được đặt nhiều nhất
              </p>
            </div>
            <a
              href="/sports/all"
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium flex items-center"
            >
              Xem tất cả <FaArrowRight className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourts.map((court) => (
              <CourtCard
                key={court.id}
                name={court.name}
                image={court.image}
                location={court.location}
                price={court.price}
                rating={court.rating}
                sport={court.sport}
                link={`/court/${court.id}`}
                mode={0} // 0 for card view, 1 for list view
              />
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section>
        <div className="bg-gray-50 dark:bg-gray-700 container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Cách Đặt Sân
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Chỉ với 3 bước đơn giản để có sân chơi như ý
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 dark:text-green-300 text-2xl font-bold">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Tìm sân
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chọn môn thể thao, địa điểm và thời gian bạn muốn chơi
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 dark:text-green-300 text-2xl font-bold">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Đặt sân
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Xác nhận thông tin và thanh toán đơn giản
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-700 dark:text-green-300 text-2xl font-bold">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">
                Chơi thôi!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Đến sân và tận hưởng trận đấu của bạn
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <div className="container mx-auto p-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Khách Hàng Nói Gì
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Những phản hồi từ khách hàng đã sử dụng dịch vụ của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                comment={testimonial.comment}
                rating={testimonial.rating}
                sport={testimonial.sport}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="py-16 bg-green-700 dark:bg-green-800 text-white container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            Sẵn sàng đặt sân thể thao?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto dark:text-gray-200">
            Đăng ký ngay để nhận ưu đãi 10% cho lần đặt sân đầu tiên
          </p>
          <button className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-200 dark:hover:bg-gray-300 px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
            Đặt sân ngay
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Home;
