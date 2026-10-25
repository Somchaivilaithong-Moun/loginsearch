// ===== search.js: trang tìm kiếm =====

// 1. Bảo vệ trang: chưa đăng nhập thì đưa về trang login
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "index.html";
}

// 2. Hiển thị tên người dùng
document.getElementById("welcome").textContent = currentUser;

// 3. Dữ liệu mẫu để tìm kiếm (là một mảng các object)
// Sau này dữ liệu này sẽ lấy từ database (MySQL) thông qua PHP.
const courses = [
  { name: "Python cơ bản", type: "Lập trình" },
  { name: "C++ nhập môn", type: "Lập trình" },
  { name: "Java hướng đối tượng", type: "Lập trình" },
  { name: "HTML và CSS", type: "Web" },
  { name: "JavaScript cho người mới", type: "Web" },
  { name: "PHP và MySQL", type: "Web" },
  { name: "SQL truy vấn dữ liệu", type: "Cơ sở dữ liệu" },
  { name: "Git và GitHub", type: "Công cụ" },
  { name: "Cấu trúc dữ liệu và giải thuật", type: "Nền tảng" },
  { name: "Mạng máy tính", type: "Nền tảng" }
];

// 4. Lấy các phần tử HTML
const searchInput = document.getElementById("search-input");
const resultList = document.getElementById("result-list");
const countEl = document.getElementById("count");

// 5. Hàm hiển thị danh sách ra màn hình
function render(list) {
  resultList.innerHTML = ""; // xóa kết quả cũ

  if (list.length === 0) {
    countEl.textContent = "Không tìm thấy kết quả nào.";
    return;
  }

  countEl.textContent = "Tìm thấy " + list.length + " kết quả";

  // Duyệt từng phần tử, tạo một thẻ <li> cho mỗi phần tử
  list.forEach(function (item) {
    const li = document.createElement("li");
    li.innerHTML = item.name + "<br><small>" + item.type + "</small>";
    resultList.appendChild(li);
  });
}

// 6. Hàm lọc dữ liệu theo từ khóa
function search() {
  const keyword = searchInput.value.trim().toLowerCase(); // chuyển về chữ thường

  const filtered = courses.filter(function (item) {
    // Tìm trong cả tên và loại, không phân biệt hoa thường
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.type.toLowerCase().includes(keyword)
    );
  });

  render(filtered);
}

// 7. Mỗi lần gõ phím thì tìm lại ngay (không cần bấm nút)
searchInput.addEventListener("input", search);

// 8. Đăng xuất: xóa người dùng hiện tại rồi về trang login
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

// 9. Hiển thị toàn bộ danh sách khi vừa mở trang
render(courses);
