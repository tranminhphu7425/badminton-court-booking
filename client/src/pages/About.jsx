import {
  FaUsers,
  FaTrophy,
  FaCalendarCheck,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";

import backgroundImage from "../assets/images/backgrounds/about/about_bg.jpg";

import teamMembers from "../data/teamMembers";
import Section from "../components/Section";
import gioi_thieu_sportbooking from "../assets/images/backgrounds/about/gioi_thieu_sportbooking.png";


const About = () => {
  return (
    <div className="about-page dark:bg-gray-800">
  {/* Hero Section */}
  <section
    className="hero-section text-white py-20 md:py-30 lg:py-40 relative"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay làm tối background */}
    <div className="absolute inset-0 bg-black opacity-20"></div>

    {/* Nội dung section */}
    <div className="container relative z-10 mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-lg dark:text-white leading-tight drop-shadow-[2px_2px_0_#000]">Về Chúng Tôi</h1>
      <p className="text-xl max-w-2xl mx-auto text-shadow-lg dark:text-gray-200 leading-tight drop-shadow-[2px_2px_0_#000]">
        Kết nối cộng đồng yêu thể thao với những sân chơi chất lượng
      </p>
    </div>
  </section>

  {/* Our Story Section */}
  <Section>
    <div className="pt-16 container mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <img
            src={gioi_thieu_sportbooking}
            alt="Our story"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Câu Chuyện Của Chúng Tôi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            SportBooking được thành lập năm 2023 với sứ mệnh mang lại giải
            pháp đặt sân thể thao tiện lợi nhất cho cộng đồng yêu thể thao
            tại Việt Nam.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Xuất phát từ chính nhu cầu thực tế của những người chơi thể
            thao, chúng tôi nhận thấy việc đặt sân luôn là vấn đề nan giải
            với nhiều bất cập.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Với nền tảng công nghệ hiện đại, chúng tôi kết nối chủ sân và
            người chơi, mang lại trải nghiệm đặt sân nhanh chóng, minh bạch
            và hiệu quả.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Chúng tôi tin rằng thể thao không chỉ là hoạt động rèn luyện thể
            chất mà còn là cầu nối gắn kết cộng đồng. Vì vậy, bằng sự tận
            tâm và sáng tạo, SportBooking cam kết mang đến trải nghiệm đặt
            sân minh bạch, tiện lợi và hiệu quả, góp phần thúc đẩy phong
            trào thể thao ngày càng phát triển mạnh mẽ tại Việt Nam.
          </p>
        </div>
      </div>
    </div>
  </Section>

  {/* Mission & Vision Section */}
  <Section>
    <div className="bg-gray-50 dark:bg-gray-700 container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Sứ Mệnh & Tầm Nhìn
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Những giá trị cốt lõi định hướng phát triển của chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">
            Sứ Mệnh
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Chúng tôi cam kết mang lại hệ thống đặt sân thể thao thông minh,
            giúp người chơi dễ dàng tìm và đặt sân ưng ý nhất, đồng thời hỗ
            trợ chủ sân quản lý hiệu quả.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">
            Tầm Nhìn
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Trở thành nền tảng đặt sân thể thao hàng đầu Việt Nam, góp phần
            thúc đẩy phong trào thể thao và lối sống lành mạnh trong cộng
            đồng.
          </p>
        </div>
      </div>
    </div>
  </Section>

  {/* By The Numbers Section */}
  <Section>
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Con Số Ấn Tượng
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Những thành tựu chúng tôi đã đạt được
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-white dark:bg-gray-600 rounded-xl shadow-sm">
          <div className="text-green-600 dark:text-green-400 text-4xl mb-3 flex justify-center">
            <FaUsers />
          </div>
          <h3 className="text-3xl font-bold mb-2 dark:text-white">10.000+</h3>
          <p className="text-gray-600 dark:text-gray-300">Người dùng</p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-600 rounded-xl shadow-sm">
          <div className="text-green-600 dark:text-green-400 text-4xl mb-3 flex justify-center">
            <GiSoccerField />
          </div>
          <h3 className="text-3xl font-bold mb-2 dark:text-white">500+</h3>
          <p className="text-gray-600 dark:text-gray-300">Sân thể thao</p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-600 rounded-xl shadow-sm">
          <div className="text-green-600 dark:text-green-400 text-4xl mb-3 flex justify-center">
            <FaCalendarCheck />
          </div>
          <h3 className="text-3xl font-bold mb-2 dark:text-white">20.000+</h3>
          <p className="text-gray-600 dark:text-gray-300">Lượt đặt sân</p>
        </div>

        <div className="text-center p-6 bg-white dark:bg-gray-600 rounded-xl shadow-sm">
          <div className="text-green-600 dark:text-green-400 text-4xl mb-3 flex justify-center">
            <FaMapMarkedAlt />
          </div>
          <h3 className="text-3xl font-bold mb-2 dark:text-white">15+</h3>
          <p className="text-gray-600 dark:text-gray-300">Tỉnh thành</p>
        </div>
      </div>
    </div>
  </Section>

  {/* Team Section */}
  <Section>
    <div className="bg-gray-50 dark:bg-gray-700 container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Đội Ngũ Của Chúng Tôi
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Những người đứng sau sự thành công của SportBooking
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-600 rounded-xl overflow-hidden shadow-sm text-center"
          >
            <div className="h-50 bg-gray-200 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1 dark:text-white">{member.name}</h3>
              <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                {member.position}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>

  {/* Partners Section */}
  <Section>
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Đối Tác Của Chúng Tôi
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Những đơn vị đồng hành cùng chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-600 p-6 rounded-xl shadow-sm flex items-center justify-center"
          >
            <img
              src={`${item}`}
              alt={`Partner ${item}`}
              className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </Section>

  {/* CTA Section */}
  <Section>
    <div className="py-16 bg-green-700 dark:bg-green-800 text-white container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">
        Bạn muốn trở thành đối tác của chúng tôi?
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto dark:text-gray-200">
        Liên hệ ngay để đưa sân thể thao của bạn lên hệ thống
      </p>
      <button className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
        Liên hệ ngay
      </button>
    </div>
  </Section>
</div>
  );
};

export default About;
