import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  // State dùng chung: tài khoản demo và vé đã đặt.
  const [user, setUser] = useState(() => readStorage('cgv_user', null));
  const [tickets, setTickets] = useState(() => readStorage('cgv_tickets', []));

  useEffect(() => {
    localStorage.setItem('cgv_tickets', JSON.stringify(tickets));
  }, [tickets]);

  function login(name, email) {
    const nextUser = { name, email };
    setUser(nextUser);
    localStorage.setItem('cgv_user', JSON.stringify(nextUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('cgv_user');
  }

  function addTicket(ticket) {
    const newTicket = { ...ticket, id: 'CV' + Date.now().toString().slice(-8) };
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

export function useApp() {
  return useContext(AppContext);
}
