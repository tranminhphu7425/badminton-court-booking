import { FaUsers, FaTrophy, FaCalendarCheck, FaMapMarkedAlt } from 'react-icons/fa';
import { GiSoccerField } from 'react-icons/gi';
import teamMembers from '../data/teamMembers'; // Tạo file này sau

const About = () => {


  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section bg-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Về Chúng Tôi</h1>
          <p className="text-xl max-w-2xl mx-auto">Kết nối cộng đồng yêu thể thao với những sân chơi chất lượng</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="/images/about-story.jpg" 
                alt="Our story" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Câu Chuyện Của Chúng Tôi</h2>
              <p className="text-gray-600 mb-4">
                SportBooking được thành lập năm 2023 với sứ mệnh mang lại giải pháp đặt sân thể thao tiện lợi nhất cho cộng đồng yêu thể thao tại Việt Nam.
              </p>
              <p className="text-gray-600 mb-4">
                Xuất phát từ chính nhu cầu thực tế của những người chơi thể thao, chúng tôi nhận thấy việc đặt sân luôn là vấn đề nan giải với nhiều bất cập.
              </p>
              <p className="text-gray-600">
                Với nền tảng công nghệ hiện đại, chúng tôi kết nối chủ sân và người chơi, mang lại trải nghiệm đặt sân nhanh chóng, minh bạch và hiệu quả.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sứ Mệnh & Tầm Nhìn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Những giá trị cốt lõi định hướng phát triển của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Sứ Mệnh</h3>
              <p className="text-gray-600">
                Chúng tôi cam kết mang lại hệ thống đặt sân thể thao thông minh, giúp người chơi dễ dàng tìm và đặt sân ưng ý nhất, đồng thời hỗ trợ chủ sân quản lý hiệu quả.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Tầm Nhìn</h3>
              <p className="text-gray-600">
                Trở thành nền tảng đặt sân thể thao hàng đầu Việt Nam, góp phần thúc đẩy phong trào thể thao và lối sống lành mạnh trong cộng đồng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Con Số Ấn Tượng</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Những thành tựu chúng tôi đã đạt được</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-green-600 text-4xl mb-3 flex justify-center">
                <FaUsers />
              </div>
              <h3 className="text-3xl font-bold mb-2">10.000+</h3>
              <p className="text-gray-600">Người dùng</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-green-600 text-4xl mb-3 flex justify-center">
                <GiSoccerField />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-gray-600">Sân thể thao</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-green-600 text-4xl mb-3 flex justify-center">
                <FaCalendarCheck />
              </div>
              <h3 className="text-3xl font-bold mb-2">20.000+</h3>
              <p className="text-gray-600">Lượt đặt sân</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-green-600 text-4xl mb-3 flex justify-center">
                <FaMapMarkedAlt />
              </div>
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-gray-600">Tỉnh thành</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Đội Ngũ Của Chúng Tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Những người đứng sau sự thành công của SportBooking</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm text-center">
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Đối Tác Của Chúng Tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Những đơn vị đồng hành cùng chúng tôi</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center">
                <img 
                  src={`/images/partner-${item}.png`} 
                  alt={`Partner ${item}`} 
                  className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bạn muốn trở thành đối tác của chúng tôi?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Liên hệ ngay để đưa sân thể thao của bạn lên hệ thống</p>
          <button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
            Liên hệ ngay
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;