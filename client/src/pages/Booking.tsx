import type { FormEvent } from 'react';
import type { Movie, Cinema } from '../types';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MoviePoster } from '../components/MovieCard';
import { Loading, ErrorMessage } from '../components/Status';
import useFetch from '../hooks/useFetch';
import { useApp } from '../context/AppContext';
import { calculateTotal, formatPrice, getDateOptions, isValidPhone } from '../utils/booking';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const OCCUPIED = ['A3', 'A4', 'B6', 'B7', 'C2', 'D8', 'E4', 'F9'];

export default function Booking() {
  const { id } = useParams();
  const { user, addTicket } = useApp();
  const navigate = useNavigate();
  const movies = useFetch<Movie[]>(import.meta.env.BASE_URL + 'data/movies.json');
  const cinemas = useFetch<Cinema[]>(import.meta.env.BASE_URL + 'data/cinemas.json');
  const days = getDateOptions();

  const [date, setDate] = useState(days[0].value);
  const [time, setTime] = useState('');
  const [cinemaId, setCinemaId] = useState('rap-ha-noi');
  const [seats, setSeats] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [errorText, setErrorText] = useState('');

  if (!user) return <div className="container page-section"><Link to="/dang-nhap">Vui lòng đăng nhập để đặt vé</Link></div>;

  if (movies.loading || cinemas.loading) return <div className="container page-section"><Loading /></div>;
  if (movies.error || cinemas.error) return <div className="container page-section"><ErrorMessage message={movies.error || cinemas.error} onRetry={() => { movies.retry(); cinemas.retry(); }} /></div>;
  const movie = movies.data?.find(item => item.id === id);
  if (!movie) return <div className="container page-section"><h1>Không tìm thấy phim</h1><Link to="/phim">Quay lại</Link></div>;

  const cinema = cinemas.data?.find(item => item.id === cinemaId);
  if (!cinema) return <div className="container page-section">Không tìm thấy rạp. Hãy thử tải lại trang.</div>;

  function toggleSeat(seat: string) {
    if (OCCUPIED.includes(seat)) return;
    setSeats(prev => prev.includes(seat) ? prev.filter(item => item !== seat) : [...prev, seat].sort());
    setErrorText('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!time) return setErrorText('Hãy chọn một suất chiếu.');
    if (seats.length === 0) return setErrorText('Hãy chọn ít nhất một ghế.');
    if (!isValidPhone(phone)) return setErrorText('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.');

    addTicket({ movieId: movie.id, movie: movie.title, cinema: cinema.name, date, time, seats, total: calculateTotal(movie.price, seats), name: user.name, email: user.email, phone });
    navigate('/ve-cua-toi', { state: { justBooked: true } });
  }

  return (
    <div className="container page-section">
      <div className="page-title"><p className="eyebrow">ĐẶT VÉ XEM PHIM</p><h1>Chọn suất chiếu và ghế</h1><p>Đây là quy trình đặt vé minh họa, không thanh toán thực tế.</p></div>
      <div className="booking-layout">
        <form className="booking-main" onSubmit={handleSubmit} noValidate>
          <section className="booking-step"><h2><span>1</span> Chọn rạp và ngày chiếu</h2><label className="form-label">Rạp chiếu<select value={cinemaId} onChange={event => setCinemaId(event.target.value)}>{cinemas.data?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><div className="date-list">{days.map(day => <button type="button" key={day.value} className={`date-chip ${date === day.value ? 'selected' : ''}`} onClick={() => { setDate(day.value); setSeats([]); }}>{day.label}</button>)}</div></section>
          <section className="booking-step"><h2><span>2</span> Chọn giờ chiếu</h2><div className="showtime-list">{movie.showtimes.map(item => <button type="button" key={item} className={`time-chip ${time === item ? 'selected' : ''}`} onClick={() => { setTime(item); setErrorText(''); }}>{item}</button>)}</div></section>
          <section className="booking-step"><h2><span>3</span> Chọn ghế</h2><div className="screen">MÀN HÌNH CHIẾU</div><div className="seat-chart">{ROWS.map(row => <div className="seat-row" key={row}><span className="row-label">{row}</span>{Array.from({ length: 10 }, (_, index) => { const seat = row + (index + 1); const occupied = OCCUPIED.includes(seat); const selected = seats.includes(seat); return <button key={seat} type="button" disabled={occupied} title={occupied ? `Ghế ${seat} đã có người` : `Ghế ${seat}`} className={`seat ${occupied ? 'occupied' : ''} ${selected ? 'selected' : ''}`} onClick={() => toggleSeat(seat)}>{index + 1}</button>; })}<span className="row-label">{row}</span></div>)}</div><div className="seat-legend"><span><i className="seat-available" />Còn trống</span><span><i className="seat-selected" />Đang chọn</span><span><i className="seat-occupied" />Đã đặt (mô phỏng)</span></div></section>
          <section className="booking-step"><h2><span>4</span> Thông tin liên hệ</h2><div className="form-two"><label className="form-label">Họ và tên<input value={user.name} disabled /></label><label className="form-label">Email<input value={user.email} disabled /></label></div><label className="form-label">Số điện thoại <span className="required">*</span><input value={phone} onChange={event => { setPhone(event.target.value); setErrorText(''); }} placeholder="Ví dụ: 0912345678" inputMode="numeric" maxLength={10} /></label>{errorText && <p className="form-error" role="alert">{errorText}</p>}<button className="btn btn-primary btn-large" type="submit">Xác nhận đặt vé demo →</button></section>
        </form>
        <aside className="booking-summary"><h2>Thông tin đặt vé</h2><div className="summary-movie"><div className="mini-poster"><MoviePoster movie={movie} /></div><div><h3>{movie.title}</h3><p>{movie.genre}</p><span className="age-mark">{movie.age}</span></div></div><dl className="summary-lines"><div><dt>Rạp</dt><dd>{cinema.name}</dd></div><div><dt>Ngày</dt><dd>{date.split('-').reverse().join('/')}</dd></div><div><dt>Giờ</dt><dd>{time || 'Chưa chọn'}</dd></div><div><dt>Ghế</dt><dd>{seats.length ? seats.join(', ') : 'Chưa chọn'}</dd></div><div><dt>Số lượng</dt><dd>{seats.length} vé</dd></div></dl><div className="total-line"><span>Tổng cộng</span><strong>{formatPrice(calculateTotal(movie.price, seats))}</strong></div><p className="summary-note">Bản demo: chỉ lưu vé trong trình duyệt, không giữ ghế hoặc thanh toán thật.</p></aside>
      </div>
    </div>
  );
}
