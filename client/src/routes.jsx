import { lazy } from 'react';


const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Badminton = lazy(() => import('./pages/Sports/Badminton'));
const Football = lazy(() => import('./pages/Sports/Football'));
const Basketball = lazy(() => import('./pages/Sports/Basketball'));
const Tennis = lazy(() => import('./pages/Sports/Tennis'));
const Pickleball = lazy(() => import('./pages/Sports/Pickleball'));
const Volleyball = lazy(() => import('./pages/Sports/Volleyball'));
const CourtsList = lazy(() => import('./pages/Courts/List'));
const CourtDetail = lazy(() => import('./pages/Courts/Detail'));
const BookingMain = lazy(() => import('./pages/Booking/Main'));
const BookingConfirm = lazy(() => import('./pages/Booking/Confirm'));
const BookingHistory = lazy(() => import('./pages/Booking/History'));

export const routes = [
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
    path: '/sports/badminton',
    element: <Badminton />,
    name: 'Cầu lông'
  },
  {
    path: '/sports/football',
    element: <Football />,
    name: 'Bóng đá'
  },
  {
    path: '/sports/basketball',
    element: <Basketball />,
    name: 'Bóng rổ'
  },
  {
    path: '/sports/tennis',
    element: <Tennis />,
    name: 'Tennis'
  },
  {
    path: '/sports/pickleball',
    element: <Pickleball />,
    name: 'Pickleball'
  },
  {
    path: '/sports/volleyball',
    element: <Volleyball />,
    name: 'Pickleball'
  },
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
    path: '/booking',
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
  }
];