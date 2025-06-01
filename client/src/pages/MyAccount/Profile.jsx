import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaEdit, FaSave } from 'react-icons/fa';
import Section from '../../components/Section';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);   // Trạng thái loading
  const [error, setError] = useState(null);       // Trạng thái lỗi (nếu có)
  const [userData, setUserData] = useState();
  useEffect(() => {
      const fetchProfile = async () => {
        const userId = localStorage.getItem('UserID');
        if(!userId){
          setError("Không tìm thấy UserID trong localStorage");
         setLoading(false);
          return;
        }
      
      try {
        const response = await fetch(`http://localhost:8081/api/profile/${userId}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setUserData(data.profile); // Lưu dữ liệu vào biến userData
          console.log(data.profile);
        } else {
          setError(data.message || "Lỗi không xác định");
        }
      } catch (err) {
        setError("Không thể kết nối đến server");
        console.error(err);
      } finally {
        setLoading(false);
      }
  };
  fetchProfile();
  }, []);

  if (loading) return <p>Đang tải thông tin...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;



 

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-page dark:bg-gray-800 min-h-screen">
      <Section>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar Section */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                    <FaCamera />
                  </button>
                </div>

                {/* User Info Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Thông tin cá nhân
                    </h1>
                    <button
                      onClick={isEditing ? handleSave : handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      {isEditing ? (
                        <>
                          <FaSave />
                          <span>Lưu</span>
                        </>
                      ) : (
                        <>
                          <FaEdit />
                          <span>Chỉnh sửa</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Họ và tên
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={userData.FullName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={userData.Email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={userData.Phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking History */}
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Lịch sử đặt sân
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Xem lịch sử đặt sân của bạn
                </p>
                <button className="mt-4 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
                  Xem chi tiết →
                </button>
              </div>

              {/* Favorite Courts */}
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Sân yêu thích
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Quản lý danh sách sân yêu thích
                </p>
                <Link  to = "/favorites"
                className="mt-4 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Profile;
