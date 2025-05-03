import { lazy } from 'react';


const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const SportLayout = lazy(() => import('./pages/Sports/SportLayout'));
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
    path: '/sports/:sportCode',
    element: <SportLayout />,
    name: 'Cầu lông'
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
  }
];