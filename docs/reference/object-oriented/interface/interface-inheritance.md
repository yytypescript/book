---
sidebar_label: Kế thừa interface
---

# Kế thừa interface (inheritance)

Trong TypeScript, có thể sử dụng từ khóa `extends` để kế thừa interface đã định nghĩa và định nghĩa interface mới. Khi kế thừa interface, tất cả thông tin kiểu property của interface gốc sẽ được kế thừa. Có thể thêm property mới, hoặc chỉ định lại kiểu property đã khai báo thành subtype.

## Thêm property

```ts twoslash
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  grade: number; // Lớp
}

interface Teacher extends Person {
  students: Student[]; // Học sinh
}

const studentA: Student = {
  name: "Mai",
  age: 10,
  grade: 3,
};

const teacher: Teacher = {
  name: "Tuan",
  age: 30,
  students: [studentA],
};
```

## Khai báo lại property thành subtype

Trong TypeScript, việc chuyển từ một kiểu sang literal type của kiểu đó, hoặc lựa chọn một phần từ union type đều có cùng ý nghĩa là biến thành subtype. Tất nhiên cũng có thể biến thành subclass giống như các ngôn ngữ OOP khác.

### Thay đổi thành literal type

```ts twoslash
interface WebPage {
  path: string;
}

interface IndexPage extends WebPage {
  path: "/";
}
```

### Chọn từ union type

```ts twoslash
interface Person {
  age: number | undefined;
}

interface Student extends Person {
  age: number;
}
```
