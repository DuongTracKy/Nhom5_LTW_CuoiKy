// Các interface mô tả dữ liệu lấy từ các file JSON (kiến thức TypeScript Buổi 6).
export interface Movie {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  duration: number;
  age: string;
  release: string;
  rating: number;
  emoji: string;
  poster: string;
  description: string;
  director: string;
  actors: string;
  price: number;
  showtimes: string[];
}

export interface Offer {
  id: string;
  title: string;
  category: string;
  short: string;
  date: string;
  style: string;
}

export interface Cinema {
  id: string;
  name: string;
  city: string;
  address: string;
  rooms: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Ticket {
  id: string;
  movieId: string;
  movie: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  total: number;
  name: string;
  email: string;
  phone: string;
}

export type NewTicket = Omit<Ticket, 'id'>;
