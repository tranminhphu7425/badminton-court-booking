import { lazy } from 'react';


const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const SportLayout = lazy(() => import('./pages/Sports/SportLayout'));
const CourtsList = lazy(() => import('./pages/Courts/List'));
const CourtDetail = lazy(() => import('./pages/Courts/Detail'));
const BookingMain = lazy(() => import('./pages/Booking/Main'));
const BookingConfirm = lazy(() => import('./pages/Booking/Confirm'));
const BookingHistory = lazy(() => import('./pages/Booking/History'));
const Favorite = lazy(() => import('./pages/MyAccount/Favorite'));
const Profile = lazy(() => import('./pages/MyAccount/Profile'));

export const getRoutes  =  (isLoggedIn, setIsLoggedIn) => [
  {
    path: '/',
    element: <Home />,
    name: 'Trang chủ'
  },
  {
    path: '/about',
    element: <About />,
    name: 'Về chúng tôi'
  },
  {
    path: '/contact',
    element: <Contact />,
    name: 'Liên hệ',
  },
  {
    path: '/login',
    element: <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
    name: 'Đăng nhập'
  },
  {
    path: '/register',
    element: <Register />,
    name: 'Đăng ký'
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    name: 'Quên mật khẩu'
  },
  {
    path: '/sports/:sportCode',
    element: <SportLayout />,
    name: 'Danh sách sân theo từng môn thể thao'
  },
  // {
  //   path: '/locations/:locationId',
  //   element: <SportLayout />,
  //   name: 'Chi tiết địa điểm'
  // },
  {
    path: '/courts',
    element: <CourtsList />,
    name: 'Danh sách sân'
  },
  {
    path: '/courts/:id',
    element: <CourtDetail />,
    name: 'Chi tiết sân'
  },
  {
    path: '/booking/:locationId/:sportTypeId',
    element: <BookingMain />,
    name: 'Đặt sân'
  },
  {
    path: '/booking/confirm',
    element: <BookingConfirm />,
    name: 'Xác nhận đặt sân'
  },
  {
    path: '/booking/history',
    element: <BookingHistory />,
    name: 'Lịch sử đặt sân'
  },
  {
    path: '/favorites',
    element: <Favorite/>,
      name: 'Sân yêu thích'
  },
  {
    path: '/profile',
    element: <Profile/>,
    name: 'Trang hồ sơ'
  }
];