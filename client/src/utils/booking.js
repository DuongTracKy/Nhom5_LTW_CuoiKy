// Những hàm nhỏ, dễ kiểm tra và dùng lại ở nhiều component.
export function formatPrice(number) {
  return Number(number).toLocaleString('vi-VN') + ' đ';
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone) {
  return /^0\d{9}$/.test(phone.trim());
}

export function calculateTotal(price, seats) {
  return price * seats.length;
}

export function getDateOptions() {
  const days = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    // Dùng ngày tại máy người dùng để tránh lệch múi giờ khi dùng toISOString().
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    days.push({ value: `${year}-${month}-${day}`, label: `${day}/${month}` });
  }
  return days;
}
