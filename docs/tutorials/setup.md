---
description: Hãy cài đặt Node.js, TypeScript compiler và editor cần thiết cho phát triển TypeScript.
---

# Chuẩn bị môi trường code

## Node.js là gì

Node.js là phần mềm được phát triển với mục đích chạy JavaScript ở server-side. Node.js thực thi JavaScript bằng "V8", cùng JavaScript engine với Google Chrome.

Mặc dù nói rằng Node.js có cùng JavaScript engine với Google Chrome, nhưng API tích hợp sẵn khác nhau. Browser cần thao tác HTML từ JavaScript nên có DOM API, nhưng Node.js thì không có. Thay vào đó, Node.js cần điều khiển các tài nguyên khác nhau ở server-side, nên có API truy cập file system, API để dựng HTTP server, API để khởi động hoặc kết thúc process, v.v.

Ứng dụng điển hình của Node.js là phát triển ứng dụng server-side. Ví dụ như backend của web service. Phát triển frontend gần đây cũng cần Node.js. Lý do là vì cần chạy các tool phát triển trên Node.js. Phát triển TypeScript cũng cần Node.js để chạy TypeScript compiler (tsc).

## Cài đặt Node.js

Node.js có thể download và cài đặt từ trang web chính thức, nhưng cách đơn giản nhất là cài đặt qua Homebrew. Cách cài đặt Homebrew vui lòng tham khảo [trang web chính thức của Homebrew](https://brew.sh/ja/).

```shell
brew install node@22
```

Sau khi cài đặt hoàn tất, thêm path của Node.js vào biến môi trường `PATH` của shell.

```shell
echo 'export PATH="/usr/local/opt/node@22/bin:$PATH"' >> ~/.zshrc
```

Sau khi thêm path, hãy khởi động lại terminal để áp dụng biến môi trường.

Kiểm tra xem lệnh `node` có thể thực thi được không bằng cách xem version hiển thị với `node -v`.

```shell
node -v
# v22.X.X
```

## Cài đặt TypeScript

Cài đặt TypeScript compiler từ terminal của bạn.

```shell
npm install -g typescript
```

Xác nhận xem lệnh `tsc` có thể thực thi được không bằng lệnh `tsc -v`.

```shell
tsc -v
# Version 5.8.3
```

Version hiển thị sẽ là version mới nhất tại thời điểm cài đặt. Ví dụ trên là version tại thời điểm viết, nên khác với điều này cũng không sao.

## Editor/IDE

Editor/IDE được khuyến nghị cho phát triển TypeScript là Visual Studio Code hoặc JetBrains IDE.

### Visual Studio Code

Visual Studio Code (VS Code) là IDE miễn phí và open source do Microsoft cung cấp. Hỗ trợ Windows, Mac, Linux. IDE này cũng được implement bằng TypeScript.

https://code.visualstudio.com/download

### JetBrains IDE

JetBrains IDE là series IDE trả phí do JetBrains cung cấp. Có thể sử dụng trên Windows, Mac, Linux. JetBrains IDE series cung cấp các IDE riêng được tối ưu hóa cho từng ngôn ngữ lập trình. Không có IDE chuyên dụng cho TypeScript, nhưng các IDE sau đây hỗ trợ TypeScript tốt.

- [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/) (Cơ bản là IDE cho Java, nhưng cũng xử lý được JS, PHP, Ruby, Go, v.v.)
- [WebStorm](https://www.jetbrains.com/webstorm/) (IDE cho JavaScript)
- [PhpStorm](https://www.jetbrains.com/phpstorm/) (IDE cho PHP)
- [RubyMine](https://www.jetbrains.com/ruby/) (IDE cho Ruby)
- [PyCharm](https://www.jetbrains.com/pycharm/) (IDE cho Python)
- [GoLand](https://www.jetbrains.com/go/) (IDE cho Go)

Nếu chỉ dự định phát triển frontend, WebStorm với giá rẻ nhất là đủ. Nếu phát triển cả backend và frontend, nên chọn PhpStorm, RubyMine, PyCharm, GoLand phù hợp với ngôn ngữ backend. Nếu dự định sử dụng nhiều ngôn ngữ khác nhau, chọn IntelliJ IDEA Ultimate cao cấp sẽ bao quát được. JetBrains IDE series có bản miễn phí IntelliJ Community Edition (CE), nhưng bản này không hỗ trợ TypeScript.

JetBrains IDE có free trial 30 ngày và [chương trình license miễn phí](https://www.jetbrains.com/community/education/#students) cho sinh viên.

Cũng có thể mua với [giảm giá từ 300 đến 1,000 yên](https://secure.samuraism.com/referral/8BF59FFA232F45460DFA1635194C68B6) từ đại lý bán hàng tại Nhật Bản là công ty Samuraism.
