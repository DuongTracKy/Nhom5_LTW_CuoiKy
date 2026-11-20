import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { NewTicket, Ticket, User } from '../types';

// Kiểu dữ liệu mà mọi component có thể sử dụng qua Context.
interface AppContextValue {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  addTicket: (ticket: NewTicket) => string;
  myTickets: Ticket[];
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// Hàm dùng generic <T> để giữ đúng kiểu dữ liệu đọc từ localStorage.
function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  // State dùng chung: tài khoản demo và vé đã đặt.
  const [user, setUser] = useState<User | null>(() => readStorage<User | null>('cgv_user', null));
  const [tickets, setTickets] = useState<Ticket[]>(() => readStorage<Ticket[]>('cgv_tickets', []));

  useEffect(() => {
    localStorage.setItem('cgv_tickets', JSON.stringify(tickets));
  }, [tickets]);

  function login(name: string, email: string) {
    const nextUser: User = { name, email };
    setUser(nextUser);
    localStorage.setItem('cgv_user', JSON.stringify(nextUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('cgv_user');
  }

  function addTicket(ticket: NewTicket): string {
    const newTicket: Ticket = { ...ticket, id: 'CV' + Date.now().toString().slice(-8) };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket.id;
  }

  const myTickets = user ? tickets.filter(ticket => ticket.email === user.email) : [];

  return (
    <AppContext.Provider value={{ user, login, logout, addTicket, myTickets }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp phải được gọi bên trong AppProvider');
  return context;
}
