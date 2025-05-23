import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import Section from '../components/Section';
import backgroundImage from "../../public/assets/images/backgrounds/contact/contact_bg.jpg";

const Contact = () => {
  return (
    <div className="contact-page dark:bg-gray-800">
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
    <div className="container relative mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white leading-tight drop-shadow-[2px_2px_0_#000]">Liên Hệ Với Chúng Tôi</h1>
      <p className="text-xl max-w-2xl mx-auto dark:text-gray-200 leading-tight drop-shadow-[2px_2px_0_#000]">
        Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
      </p>
    </div>
  </section>

  {/* Contact Info Section */}
  <Section>
    <div className="container mx-auto px-4 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Card 1 */}
        <div className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPhone className="text-green-700 dark:text-green-400 text-xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 dark:text-white">Điện thoại</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">Hotline: 1900 1234</p>
          <p className="text-gray-600 dark:text-gray-300">Hỗ trợ: 028 1234 5678</p>
        </div>

        {/* Contact Card 2 */}
        <div className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-green-700 dark:text-green-400 text-xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 dark:text-white">Email</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">Hỗ trợ: support@sportbooking.vn</p>
          <p className="text-gray-600 dark:text-gray-300">Đối tác: partner@sportbooking.vn</p>
        </div>

        {/* Contact Card 3 */}
        <div className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="text-green-700 dark:text-green-400 text-xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 dark:text-white">Địa chỉ</h3>
          <p className="text-gray-600 dark:text-gray-300">123 Đường ABC, Quận 1, TP.HCM</p>
        </div>
      </div>
    </div>
  </Section>

  {/* Contact Form Section */}
  <Section>
    <div className="bg-gray-50 dark:bg-gray-700 container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Gửi Tin Nhắn Cho Chúng Tôi</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Điền vào form bên dưới và chúng tôi sẽ liên hệ lại với bạn sớm nhất
          </p>
        </div>

        <form className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
                placeholder="Nhập email"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Chủ đề
            </label>
            <select
              id="subject"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
            >
              <option value="">Chọn chủ đề</option>
              <option value="support">Hỗ trợ kỹ thuật</option>
              <option value="booking">Vấn đề đặt sân</option>
              <option value="partner">Hợp tác đối tác</option>
              <option value="feedback">Góp ý/Phản hồi</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Nội dung
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
              placeholder="Nhập nội dung tin nhắn"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition duration-300 flex items-center justify-center mx-auto"
          >
            <FaPaperPlane className="mr-2" />
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </div>
  </Section>

  {/* Support Hours Section */}
  <Section>
    <div className="container mx-auto px-4">
      <div className="bg-white dark:bg-gray-600 p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <MdSupportAgent className="text-green-700 dark:text-green-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Thời gian hỗ trợ</h3>
            <p className="text-gray-600 dark:text-gray-300">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          </div>
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaClock className="text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <p className="font-medium dark:text-white">Thứ 2 - Thứ 6</p>
                  <p className="text-gray-600 dark:text-gray-300">8:00 - 18:00</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <p className="font-medium dark:text-white">Thứ 7 - Chủ nhật</p>
                  <p className="text-gray-600 dark:text-gray-300">8:00 - 12:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>

  {/* Map Section */}
  <Section>
    <div className="container mx-auto px-4">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5734.08395365036!2d105.76659141501969!3d10.02896509127733!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1746373279960!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  </Section>

  {/* CTA Section */}
  <Section>
    <div className="py-16 bg-green-700 dark:bg-green-800 text-white container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Bạn cần hỗ trợ ngay lập tức?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto dark:text-gray-200">
        Gọi ngay cho chúng tôi để được hỗ trợ nhanh nhất
      </p>
      <button className="bg-white dark:bg-gray-100 text-green-700 hover:bg-gray-100 dark:hover:bg-gray-200 px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
        <FaPhone className="inline mr-2" />
        1900 1234
      </button>
    </div>
  </Section>
</div>
  );
};

export default Contact;