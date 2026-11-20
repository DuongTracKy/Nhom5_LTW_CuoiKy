import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { useApp } from './context/AppContext';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Cinemas from './pages/Cinemas';
import Offers from './pages/Offers';
import OfferDetail from './pages/OfferDetail';
import Booking from './pages/Booking';
import MyTickets from './pages/MyTickets';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function RequireLogin({ children }: { children: ReactNode }) {
  const { user } = useApp();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/dang-nhap" state={{ from: location.pathname }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/phim" element={<Movies />} />
        <Route path="/phim/:id" element={<MovieDetail />} />
        <Route path="/rap" element={<Cinemas />} />
        <Route path="/uu-dai" element={<Offers />} />
        <Route path="/uu-dai/:id" element={<OfferDetail />} />
        <Route path="/dat-ve/:id" element={<RequireLogin><Booking /></RequireLogin>} />
        <Route path="/ve-cua-toi" element={<RequireLogin><MyTickets /></RequireLogin>} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
