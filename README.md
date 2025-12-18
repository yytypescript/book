# Survival TypeScript

Sách nhập môn TypeScript.

Trang web gốc tiếng Nhật:
https://typescriptbook.jp/

## Động lực dịch

Trước khi học Typescript, mình đã có học và dùng Javascript rồi. Nhưng khi tham gia vào một dự án dùng Typescript thì mình có một thời gian khá khó khăn khi dùng Typescript. Project setup type chặt, mỗi lần commit là lại có nhiều lỗi typescript hay khi mình code, cũng không được nhanh do cứ phải để ý đến type. Mình biết là kiến thức về typescript của mình còn hạn chế, nên đã cố gắng tự học. Có một số tài liệu từ cơ bản và hay như là https://www.typescripttutorial.net/ hoặc học typescript qua trang của Microsoft https://www.typescriptlang.org/. Có tài liệu thì nói quá là cơ bản, có tài liệu như của Microsoft chắc mình cảm thấy chắc chỉ cần dùng tra cứu tài liệu chứ không dùng để học được. Hay là có quyển sách Typescript deep dive https://basarat.gitbook.io/typescript, cá nhân mình cảm thấy mặc dù tên là deep dive, nhưng có vẻ nội dung cũng chưa deep dive lắm, và đọc cũng không hiệu quả với mình. Mình có cảm giác khi mình lập trình, mình đang "fight" với typescript chứ không phải để typescript cùng mình để cùng hoàn thành dự án tốt hơn.

May mắn thay, mình hỏi vấn đề này cho leader cấp trên của mình. Anh đưa luôn cho quyển sách Surival Typescript này. Mình ấn tượng luôn về cách viết của quyển sách này viết thực chiến, đúng thứ cần học, tránh lí thuyết dài, luồng học tự nhiên, dễ vào. Mình ấn tượng nhất là bài viết phân tích về tại sao nên sử dụng Typescript, giúp các công ty như Airbnb giảm bug hay bài về bối cảnh ra đời của Typescript, làm mình hiểu hơn sự cần thiết của dùng Typescript.

Mình càng đọc, càng cuốn. Mình nhớ lúc đó là mình dành 2 ngày cuối tuần và một số buổi tối đọc hết các phần tổng quan, thực thành, lí thuyết cơ bản trong sách. Nhờ quyển sách này, cuộc sống lập trình dùng Typescript của mình đã dễ thở hơn, vui vẻ hơn, happy hơn. Do vậy, mình chỉ muốn contribute back lại bằng cách lan toả nội dung cuốn sách này tới nhiều người biết hơn mà cụ thể là cộng đồng người Việt.

## Đặc điểm của cuốn sách

### Học từ thực tế

Với mục tiêu "Dẫn dắt người đọc theo con đường ngắn nhất để có thể sử dụng TypeScript trong công việc thực tế", nội dung được chọn lọc kỹ, tập trung vào những kiến thức thiết yếu trong thực tế. Các tính năng TypeScript hiếm khi được sử dụng trong thực tế sẽ được bỏ qua để tránh quá tải. Ngược lại, những kiến thức nằm ngoài phạm vi TypeScript nhưng thường xuyên được sử dụng trong thực tế sẽ được đề cập đầy đủ.

### Giúp người học có luồng học theo cách tự nhiên

Cấu trúc các chương được thiết kế theo luồng học ngôn ngữ tự nhiên của programmer. Với thứ tự chương như sau, developer có thể học với ít căng thẳng hơn.

1. Tổng quan: Nắm bắt khái quát về TypeScript
2. Học qua thực hành: Viết code TypeScript chạy được, cảm nhận quy trình
3. Học qua đọc: Đào sâu từng tính năng ngôn ngữ TypeScript

Developer cũng có thể học song song kiến thức JavaScript cần thiết để hiểu TypeScript.

Hơn nữa, cuốn sách được thiết kế để kiến thức từ các ngôn ngữ khác có thể được tận dụng trong việc học TypeScript. Phần lớn người học TypeScript đã có kinh nghiệm với các ngôn ngữ khác. Người học có thể học TypeScript trong khi so sánh với các ngôn ngữ khác như Java, Python, PHP, Ruby.

## Làm sao để contribute vào bản dịch tiếng Việt này

1. Fork repo này về GitHub cá nhân
2. Clone repo về máy local
3. Tạo branch mới từ `i18n/vietnamese-translation` với tên mô tả công việc (ví dụ: `i18n/translate-chapter-5`, `fix/typo-chapter-3`)
4. Thực hiện dịch hoặc chỉnh sửa
5. Commit với message rõ ràng, theo [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) (ví dụ: `i18n: translate chapter 5`)
6. Push branch lên GitHub và tạo Pull Request

**Lưu ý khi dịch:**

- Giữ nguyên format markdown và code block
- Không lược bỏ nội dung gốc, dịch đầy đủ
- Dùng văn phong kỹ thuật đơn giản, ngắn gọn, dễ hiểu
- Các thuật ngữ chuyên môn khó dịch có thể giữ nguyên tiếng Anh
- Chạy `yarn start` để preview trước khi commit

## Khởi chạy docusaurus

```bash
nvm use 20
yarn install
yarn start
```

## TODOs

- [ ] 🚧 Vẽ lại các hình vẽ đang ở tiếng Nhật sang tiếng Việt
- [ ] 🚧 Add thêm các bài cho đúng với license sách gốc theo CC BY-SA
- [ ] 🚧 Chỉnh lại ngôn ngữ dịch cho thật chuẩn, trong sáng, văn phong kĩ thuật, ngắn gọn, dễ hiểu
- [ ] Chỉnh sửa lại bản dịch cho đỡ bị "máy dịch", đọc không mượt
- [ ] Việt hoá lại các ví dụ. Hiện tại có nhiều ví dụ thuần tiếng Nhật, khó dịch sang tiếng Việt
- [ ] Update search algolia cho bản dịch tiếng Việt
- [x] Add Analytics tool: Vercel Analytics
