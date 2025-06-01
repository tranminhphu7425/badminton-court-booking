import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; // Icon Google
import Section from '../../components/Section'; // Giả sử Section là một component wrapper

const Login = ({isLoggedIn, setIsLoggedIn} ) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gọi API đăng nhập - giả lập ví dụ dùng fetch
      const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }), // identifier có thể là username/email
      });

      const data = await response.json();

      if (response.ok && data?.success) {
        // Đăng nhập thành công
        const userId = data.user.UserID; // giả sử API trả về { user: { UserID: ..., Username: ... }, success: true }

        // Lưu vào localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('UserID', userId);
        setIsLoggedIn(true);
        // Điều hướng về trang chủ
        navigate('/');
      } else {
        alert('Đăng nhập thất bại: Sai thông tin hoặc tài khoản không tồn tại');
      }
    } catch (err) {
      console.error('Lỗi khi đăng nhập:', err);
      alert('Đã xảy ra lỗi khi đăng nhập.');
    }
  };

  const handleGoogleSignIn = () => {
    // Xử lý logic đăng nhập bằng Google ở đây
    console.log('Attempting Google Sign-In...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 dark:from-gray-800 dark:to-green-900 flex flex-col items-center justify-center py-8 px-4 font-sans">
      <Section className="w-full">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-700 p-8 sm:p-10 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-green-900/50">
          <div className="mb-8 text-left">
            <Link
              to="/"
              className="inline-flex items-center text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 transition-colors duration-300 mb-6 group"
            >
              <FaArrowLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Trở về trang chủ
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Chào mừng trở lại!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
              Đăng nhập để tiếp tục trải nghiệm dịch vụ.
            </p>
          </div>

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
                  placeholder="Nhập mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Ghi nhớ đăng nhập và Quên mật khẩu */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-brand-green dark:text-green-400 focus:ring-brand-green border-gray-300 dark:border-gray-500 rounded cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <Link
                to="/forgot-password" // Đảm bảo bạn có route này
                className="text-sm font-medium text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Nút Đăng nhập */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-brand-green-dark dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              <FaSignInAlt className="mr-2" />
              Đăng nhập
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
              Chưa có tài khoản?{' '}
              <Link
                to="/register"
                className="text-brand-green dark:text-green-400 hover:text-brand-green-dark dark:hover:text-green-300 font-semibold hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Login;