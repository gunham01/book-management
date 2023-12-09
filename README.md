# QUẢN LÝ SÁCH

Đây là phần mềm quản lý sách bằng ExpessJS, với cơ sở dữ liệu là MongoDB

## Các bước cài đặt

### 1. Khởi tạo dự án

-   Khởi tạo dự án NodeJS bằng cách chạy câu lệnh sau

```bash
npm init -y
```

### 2. Cài thư viện

-   Lúc ấy file `package.json` được tạo ra. Tạm thời chưa cần sửa file này
-   Cài đặt các thư viện cần thiết bằng cách chạy lần lượt cách lệnh sau

```bash
npm install express body-parser cookie-parser jsonwebtoken mongoose multer pug
```

```bash
npm install -D nodemon
```

-   Thêm lệnh `start` trong file `package.json` và xoá lệnh `test` thừa

```json
"scripts": {
   "start": "nodemon index.js", // Thêm dòng này
 },
```

-   Kiểm tra xem đã cài đặt Mongo Server chưa. Nếu chưa thì cài đặt

### 3. Chạy chương trình

```bash
npm start
```

## HTTP

Có 4 phương thức HTTP hay dúng

-   Xem `GET`
-   Thêm `POST`
-   Sửa `PUT`
-   Xoá `DELETE`

## Cách tạo mật khẩu (secret key)

Chạy lần lượt cách lệnh sau

```bash
node
const crypto = require('crypto');
crypto.randomBytes(32).toString('hex')
```

Dòng cuối cùng mà terminal in ra sẽ là secret key

## Phân quyền

| Tên quyền  | Quyền                     |
| ---------- | ------------------------- |
| Khách      | Xem sách                  |
| Người dùng | Quản lý sách              |
| Admin      | Quản lý sách + người dũng |
