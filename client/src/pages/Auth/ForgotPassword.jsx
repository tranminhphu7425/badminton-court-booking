import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheck } from 'react-icons/fa';
import Section from '../../components/Section'; // Giả sử Section là một component wrapper

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi email reset mật khẩu
    console.log({ email });
    // Simulate a submission delay
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000); // Adjust the delay as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 dark:from-gray-800 dark:to-green-900 flex flex-col items-center justify-center py-8 px-4 font-sans">
      <Section className="w-full">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-700 p-8 sm:p-10 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-green-900/50">
          <div className="mb-8 text-left">
            <Link
              to="/login"
              className="inline-flex items-center text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 transition-colors duration-300 mb-6 group"
            >
              <FaArrowLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Quay lại đăng nhập
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {isSubmitted ? 'Kiểm tra email của bạn' : 'Quên mật khẩu'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              {isSubmitted
                ? 'Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.'
                : 'Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 dark:bg-green-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-green-600 dark:text-green-300 text-4xl" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam hoặc{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 font-semibold hover:underline"
                >
                  gửi lại
                </button>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-green-500 dark:bg-gray-800 dark:text-white shadow-sm transition-colors duration-300"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Nút Gửi liên kết */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-brand-green hover:from-green-600 hover:to-brand-green-dark dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Gửi liên kết đặt lại
              </button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
};

export default ForgotPassword;