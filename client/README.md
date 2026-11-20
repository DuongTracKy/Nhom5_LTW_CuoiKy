# CGV Demo - Frontend React cho môn Lập trình Web

> **Lưu ý quan trọng:** Đây là bản dựng giao diện để học, lấy cảm hứng từ ảnh trang tin/ưu đãi CGV do sinh viên cung cấp. **Không phải** website chính thức CGV. Mọi phim, rạp, giờ chiếu, vé và khuyến mãi trong dự án là dữ liệu mẫu. Không hỗ trợ thanh toán hoặc giữ ghế thực tế.

## 1. Công nghệ sử dụng

- React + Vite (JavaScript và JSX, không cần TypeScript).
- React Router để chuyển trang, có route tham số `:id`.
- Function Component, `props`, `useState`, `useEffect`, `useContext`.
- `fetch`, `async/await` để đọc các file JSON như một API giả lập.
- Form controlled + kiểm tra dữ liệu (validate).
- `localStorage` để lưu tài khoản **demo** và vé đặt thử.
- CSS tự viết, Flexbox + Grid + media query. **Không** dùng Tailwind, Bootstrap, Redux hay thư viện UI khó.
- 4 test nhỏ bằng công cụ có sẵn trong Node.js (`node:test`).

## 2. Các trang có sẵn

| URL | Chức năng | Kiến thức |
| --- | --- | --- |
| `/` | Trang chủ, phim nổi bật, ưu đãi | Component, props, fetch |
| `/phim` | Danh sách phim, tìm kiếm, lọc thể loại | useState, map/filter |
| `/phim/:id` | Chi tiết phim, suất chiếu | React Router, useParams |
| `/rap` | Danh sách rạp, lọc theo thành phố | useState, JSON |
| `/uu-dai` | Danh sách bài viết khuyến mãi | Component, map |
| `/uu-dai/:id` | Chi tiết tin, mô phỏng tin “Thẻ cứng comeback” | Route có tham số |
| `/dang-nhap` | Form đăng nhập **giả lập** | Controlled form, validate |
| `/dat-ve/:id` | Chọn rạp, ngày, giờ, ghế, nhập SĐT | useState, Context |
| `/ve-cua-toi` | Xem vé demo đã đặt | Context, localStorage |
| `*` | Thông báo 404 | Route dự phòng |

## 3. Cách chạy trên Windows bằng VS Code

### Cách nhanh nhất

1. Giải nén file `.zip`.
2. Mở **VS Code** → **File > Open Folder** → chọn đúng thư mục `cgv-react-frontend` (thư mục có `package.json`).
3. Chọn **Terminal > New Terminal**.
4. Lần lượt chạy:

```powershell
npm install
npm run dev
```

5. Mở đường dẫn `http://localhost:5173/` hiện trong Terminal. Nếu cổng 5173 bị chiếm, Vite có thể tự đổi sang 5174 hoặc 5175: mở đúng URL in ra.

**Chú ý:** Không nhấn đúp mở `index.html` trực tiếp, vì dự án React cần chạy qua Vite.

### Kiểm tra trước khi nộp

```powershell
npm test
npm run build
```

Nếu Terminal hiện `Missing script: dev`, bạn đang đứng sai thư mục. Hãy `cd` tới thư mục chứa `package.json` rồi chạy lại.

Nếu trang trắng: mở `F12 > Console` xem lỗi; kiểm tra `npm install` đã thành công và địa chỉ trên trình duyệt đúng URL của Vite.

## 4. Cấu trúc mã nguồn

```text
cgv-react-frontend/
├── public/
│   └── data/
│       ├── movies.json           # Dữ liệu phim demo
│       ├── offers.json           # Dữ liệu khuyến mãi demo
│       └── cinemas.json          # Dữ liệu rạp demo
├── src/
│   ├── components/
│   │   ├── Layout.jsx            # Header, menu, Footer
│   │   ├── MovieCard.jsx         # Một thẻ phim, nhận props
│   │   ├── OfferCard.jsx         # Một thẻ ưu đãi
│   │   └── Status.jsx            # Loading và ErrorMessage
│   ├── context/
│   │   └── AppContext.jsx        # Đăng nhập & vé dùng chung
│   ├── hooks/
│   │   └── useFetch.js           # Custom hook dùng fetch + useEffect
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Movies.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Cinemas.jsx
│   │   ├── Offers.jsx
│   │   ├── OfferDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Booking.jsx
│   │   ├── MyTickets.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── booking.js            # Hàm nhỏ tính tiền, kiểm tra input
│   ├── App.jsx                   # Khai báo React Router
│   ├── main.jsx                  # Kết nối React vào HTML
│   └── styles.css                # CSS thuần & responsive
├── tests/
│   └── booking.test.js           # 4 test đơn giản
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 5. Liên hệ với kiến thức trên slide đã học

- **HTML, CSS, JavaScript cơ bản:** chia bố cục, thẻ `div`, `section`, `form`; CSS, điều kiện, hàm, `const`/`let`.
- **Buổi 5:** sự kiện `onClick`, `onChange`, `onSubmit`, validate, JSON, localStorage.
- **Buổi 6:** `fetch`, `async/await`, `response.ok`, loading/error.
- **Buổi 7:** React, JSX, Function Component, props, state.
- **Buổi 8:** form controlled, render có điều kiện, `.map()`, `key`, cập nhật state mảng bằng spread / filter.
- **Buổi 9:** Hooks, useEffect, useContext, custom Hook `useFetch`.
- **Theo slide yêu cầu BTL Buổi 9:** >= 5 trang, route có tham số, Context, validate, loading/error, CSS responsive, có test.

## 6. Cách thử các chức năng

1. Chọn **Phim** → nhập từ khóa / chọn thể loại.
2. Nhấn **Chi tiết** → xem route `/phim/hanh-tinh-xanh`.
3. Nhấn **Đặt vé** → chuyển tới trang đăng nhập vì đây là chức năng cần tài khoản demo.
4. Nhập họ tên, email hợp lệ và **mật khẩu giả ít nhất 6 ký tự (không dùng mật khẩu thật)**.
5. Chọn ngày, giờ, ghế và điền số điện thoại dạng `0912345678` → **Xác nhận đặt vé demo**.
6. Xem thông tin vé trong **Vé của tôi**. F5 vẫn còn vì được lưu vào localStorage.
7. Vào **Tin mới & ưu đãi** → bài **Thẻ cứng comeback** để xem trang tham khảo từ ảnh CGV.

## 7. Giới hạn của phiên bản frontend

- Đăng nhập là **giả lập**, không so mật khẩu với backend, **không có xác thực bảo mật**. Trường mật khẩu chỉ được kiểm tra độ dài và không được lưu.
- Dữ liệu JSON lấy từ thư mục `/public/data`; `fetch` chạy trên local Vite. Chưa kết nối cơ sở dữ liệu hay MockAPI trực tuyến.
- Vé lưu trong `localStorage` trên trình duyệt của máy hiện tại; xóa dữ liệu trình duyệt sẽ mất vé.
- Ghế đã chiếm là **mảng cố định** trong `Booking.jsx`, không được đồng bộ theo thời gian thực.
- Không gửi email, không thanh toán thật, không có backend Express. Phần backend có thể do thành viên khác làm sau.
- Hai liên kết Google Docs trong yêu cầu hiện chưa lấy được nội dung để đối chiếu, nên các chức năng bản này bám vào slide Buổi 9 và ảnh chụp CGV. Nếu tài liệu yêu cầu khác, cần điều chỉnh.

## 8. Gợi ý endpoint để nhóm ghép backend Express sau này

| Method | Endpoint | Mục đích |
| --- | --- | --- |
| GET | `/api/movies` | Lấy danh sách phim |
| GET | `/api/movies/:id` | Chi tiết phim |
| GET | `/api/cinemas` | Danh sách rạp |
| GET | `/api/offers` | Khuyến mãi |
| POST | `/api/auth/login` | Đăng nhập thật, backend kiểm tra thông tin |
| POST | `/api/bookings` | Đặt vé / giữ ghế thực tế |
| GET | `/api/bookings` | Vé của người dùng đang đăng nhập |

Khi ghép backend, có thể thay các URL `data/*.json` bằng API Express, và chuyển việc xác thực, chống đặt trùng ghế, thanh toán sang backend.

## 9. Đẩy lên GitHub

Tạo repository rỗng trên GitHub trước rồi chạy trong thư mục dự án:

```powershell
git init
git add .
git commit -m "Khoi tao giao dien React CGV demo"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Thay `USERNAME/REPO` bằng link repo của bạn. Nếu repository đã được `git init`, bỏ qua bước khởi tạo tương ứng. Không push thư mục `node_modules` vì đã có `.gitignore`.

## 10. Khi vấn đáp nên giải thích thế nào?

> “Em làm phần frontend bằng React và Vite. Em chia trang web thành nhiều component như Header, MovieCard, OfferCard để tái sử dụng giao diện. Dữ liệu phim và ưu đãi được lưu trong file JSON, em dùng `useEffect` kết hợp `fetch` thông qua custom hook `useFetch` để đọc dữ liệu và hiện trạng thái đang tải hoặc lỗi. `useState` quản lý từ khóa tìm kiếm, chọn phim và ghế; `useContext` chia sẻ thông tin đăng nhập và vé. Em dùng React Router để chuyển trang không tải lại toàn bộ, có route tham số như `/phim/:id`. Form có kiểm tra dữ liệu, vé demo lưu bằng localStorage. Em tự viết CSS để trang dùng được trên máy tính và điện thoại. Hiện hệ thống mới là frontend minh họa, chưa có backend và đặt vé thật.”
