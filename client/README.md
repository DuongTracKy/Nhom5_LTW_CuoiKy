# CGV Demo — React + TypeScript (TS/TSX)

**Dự án frontend học tập**, mô phỏng giao diện CGV từ bản React JS trước đó; không phải website chính thức CGV. Dữ liệu phim, rạp, ưu đãi, vé và tài khoản đều **giả lập**; không thu tiền thật, không giữ ghế thật.

## 1. Công nghệ được sử dụng

- React + Vite + TypeScript, React Router, CSS thuần.
- `interface`, `type`, `string`, `number`, `boolean`, mảng `string[]` — kiến thức TypeScript cơ bản.
- Props và state có kiểu; Hooks `useState`, `useEffect`, `useContext`.
- `useFetch<T>` là ví dụ generic đơn giản, lấy dữ liệu từ JSON thông qua `fetch` + `async/await`.
- `localStorage` chỉ dùng cho tài khoản/vé demo. Không có backend, không có thanh toán thật.

## 2. Chạy bằng VS Code trên Windows

Mở **đúng thư mục có `package.json`** trong VS Code → Terminal (PowerShell) rồi chạy:

```powershell
npm.cmd install
npm.cmd run dev
```

Mở địa chỉ Vite in trong Terminal (thường `http://localhost:5173/`). Không nhấn đúp mở `index.html`.

Kiểm tra trước khi nộp:

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run build
```

Nếu `npm` bị chặn script PowerShell, hãy dùng **`npm.cmd`** như trên. Nếu `ENOENT package.json`, bạn đang mở sai thư mục. Không commit `node_modules/`, `dist/`.

## 3. Các chức năng

- `/` — trang chủ, banner, danh sách phim/ưu đãi.
- `/phim` — tìm kiếm và lọc phim.
- `/phim/:id` — chi tiết phim.
- `/rap` — danh sách rạp minh họa.
- `/uu-dai`, `/uu-dai/:id` — tin mới/ưu đãi và bài chi tiết thẻ cứng comeback.
- `/dang-nhap` — đăng nhập demo, form có validate.
- `/dat-ve/:id` — chọn rạp, ngày, suất, ghế, nhập điện thoại và đặt vé demo.
- `/ve-cua-toi` — vé demo lưu trên trình duyệt.
- `*` — trang 404.

## 4. Bố cục mã nguồn

```text
cgv-react-typescript/
├── public/data/              JSON: movies, cinemas, offers
├── src/
│   ├── components/           Layout.tsx, MovieCard.tsx, OfferCard.tsx, Status.tsx
│   ├── context/              AppContext.tsx
│   ├── hooks/                useFetch.ts
│   ├── pages/                Home.tsx, Movies.tsx, Booking.tsx ...
│   ├── utils/                booking.ts
│   ├── types.ts              Movie, Offer, Cinema, User, Ticket
│   ├── App.tsx               React Router
│   ├── main.tsx              ReactDOM.createRoot
│   └── styles.css            CSS từ bản gốc, giữ nguyên giao diện
├── tests/booking.test.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### JavaScript vs TypeScript — ví dụ

```ts
// TypeScript: ghi rõ dữ liệu đầu vào và kiểu trả về
function calculateTotal(price: number, seats: string[]): number {
  return price * seats.length;
}

interface User {
  name: string;
  email: string;
}

const [seats, setSeats] = useState<string[]>([]);
// useFetch<Movie[]>: dữ liệu lấy về là một mảng Movie
const movies = useFetch<Movie[]>('/data/movies.json');
```

**Chú ý:** `interface` chỉ kiểm tra kiểu trong lúc viết/biên dịch; JSON đọc qua `fetch` vẫn là dữ liệu bên ngoài và chưa được validate runtime trong demo này.

## 5. GitHub nhóm (không ghi đè code thành viên khác)

Nếu repo nhóm đã tồn tại, **không chạy `git init` hay `git push --force` nữa**. Hãy sao lưu thay đổi, lấy cập nhật mới nhất từ `origin/main`, làm việc trên một nhánh riêng rồi tạo Pull Request. Nếu Git báo xung đột, cần giải quyết trước khi push. Một ví dụ sau khi đưa các file TS vào đúng thư mục repo và kiểm tra `git status`:

```powershell
git switch -c chuyen-sang-typescript
git add .
git commit -m "Convert CGV React frontend to TypeScript"
git push -u origin chuyen-sang-typescript
```

Sau đó mở Pull Request để nhóm xem xét và gộp vào `main`.
