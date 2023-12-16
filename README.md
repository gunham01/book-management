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
   "start": "nodemon index.js", 
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

## Block trong Pug
[Link tài liệu (Tiếng Anh)](https://pugjs.org/language/inheritance.html)
Chúng ta có thể dùng `extends` và `block` để kế thừa code HTML trong Pug
VD: chúng ta có file sau
```pug
#default.pug

doctype html 
html 
    head
        block title
        block links
            link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css", integrity="sha384-BY+fdrpOd3gfeRvTSMT+VUZmA728cfF9Z2G42xpaRkUGu2i3DyzpTURDo5A6CaLK", crossorigin="anonymous")
            link(rel="stylesheet", href="/css/common.css")
    body
        include includes/header.pug
        .container
            block content
        include includes/footer.pug
```
Đây là file gốc, chứa các đoạn code bắt đầu bằng từ `block` để các file khác có thể kế thừa và thay thế các chỗ `block` bằng code của riêng file đấy.<br>
File kế thừa có thể trông như này
```pug
#books.pug

extends ../default.pug

block title
    if role == 'admin'
        title Quản lý sách
    else
        title Sách

# Và các đoạn code khác...
```
Ở file `books.pug`, để khai báo là kế thừa từ file nào, chúng ta dùng `extends <tên file được kế thừa>`. Cũng trong file này, `block title` được thay thế bằng 1 đoạn code Pug khác. Như vậy, file `books.pug` thực ra sẽ trông như này
```pug
#books.pug

doctype html 
html 
    head
        # Đoạn code bị thay thế
        if role == 'admin'
          title Quản lý sách
        else
          title Sách
        
        block links
            link(rel="stylesheet", href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css", integrity="sha384-BY+fdrpOd3gfeRvTSMT+VUZmA728cfF9Z2G42xpaRkUGu2i3DyzpTURDo5A6CaLK", crossorigin="anonymous")
            link(rel="stylesheet", href="/css/common.css")
    body
        include includes/header.pug
        .container
            block content
        include includes/footer.pug

        sao ko thay luôn ở file đấy a

        thế tưc là file được kế thừa hiện lên là file gốc lúc đầu nhưng thêm đko a
```

## Khai báo biến trong Pug
VD: 
``` pug
- isAdmin = role == 'admin'
```
Cú pháp khai báo biến sẽ trông như sau
```pug
- tên_biến = giá_trị_của_biến
```