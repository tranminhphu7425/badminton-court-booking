import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaPhone, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; // Icon Google
import Section from '../../components/Section'; // Giả sử Section là một component wrapper

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây (ví dụ: gọi API)
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log('Form Data Submitted:', formData);
    // Thêm logic gửi dữ liệu đăng ký lên server
  };

  const handleGoogleSignIn = () => {
    // Xử lý logic đăng nhập bằng Google ở đây
    // Ví dụ: sử dụng Firebase Authentication, Google Identity Services (GIS), etc.
    console.log('Attempting Google Sign-In...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 dark:from-gray-800 dark:to-green-900 flex flex-col items-center justify-center py-8 px-4 font-sans">
      <Section className="w-full">
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-700 p-8 sm:p-10 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-green-900/50">
          <div className="mb-8 text-left">
            <Link
              to="/"
              className="inline-flex items-center text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 transition-colors duration-300 mb-6 group"
            >
              <FaArrowLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Trở về trang chủ
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Tạo tài khoản mới
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Bắt đầu hành trình đặt sân dễ dàng cùng chúng tôi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Họ và tên */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-green-500 dark:bg-gray-800 dark:text-white shadow-sm transition-colors duration-300"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-green-500 dark:bg-gray-800 dark:text-white shadow-sm transition-colors duration-300"
                  placeholder="09xxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-green-500 dark:bg-gray-800 dark:text-white shadow-sm transition-colors duration-300"
                  placeholder="Tối thiểu 8 ký tự"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green dark:focus:ring-green-500 dark:bg-gray-800 dark:text-white shadow-sm transition-colors duration-300"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Nút Đăng ký */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-brand-green hover:from-green-600 hover:to-brand-green-dark dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              <FaUserPlus className="mr-2" />
              Đăng ký tài khoản
            </button>

            {/* Dải phân cách HOẶC */}
            <div className="my-6 flex items-center">
              <hr className="flex-grow border-gray-300 dark:border-gray-500" />
              <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">HOẶC</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-500" />
            </div>

            {/* Nút Đăng nhập bằng Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white dark:bg-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300 text-gray-700 dark:text-gray-800 py-3 px-4 rounded-xl font-medium flex items-center justify-center border border-gray-300 dark:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <FcGoogle className="mr-3 text-2xl" />
              Đăng nhập với Google
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Đã có tài khoản?{' '}
              <Link
                to="/login"
                className="text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Register;