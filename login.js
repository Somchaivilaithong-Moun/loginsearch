// ===== login.js: xử lý đăng ký và đăng nhập =====
// LƯU Ý: Đây là bản để HỌC. Dữ liệu lưu trong localStorage của trình duyệt
// (chỉ nằm trên máy bạn). Khi làm thật, việc kiểm tra tài khoản phải
// nằm ở server (PHP + MySQL), và mật khẩu phải được băm.

// 1. Lấy các phần tử HTML cần dùng (qua id)
const form = document.getElementById("auth-form");
const titleEl = document.getElementById("title");
const submitBtn = document.getElementById("submit-btn");
const messageEl = document.getElementById("message");
const switchText = document.getElementById("switch-text");
const switchLink = document.getElementById("switch-link");

// 2. Biến cho biết đang ở chế độ đăng nhập hay đăng ký
let isLoginMode = true;

// Nếu đã đăng nhập rồi thì chuyển thẳng sang trang tìm kiếm
if (localStorage.getItem("currentUser")) {
  window.location.href = "search.html";
}

// 3. Hàm lấy danh sách tài khoản đã lưu (là một object: { tên: mật khẩu })
function getUsers() {
  // localStorage chỉ lưu chuỗi, nên phải dùng JSON.parse để biến chuỗi thành object
  return JSON.parse(localStorage.getItem("users")) || {};
}

// 4. Hàm hiển thị thông báo (type là "error" hoặc "success")
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message " + type;
}

// 5. Bấm "Đăng ký" / "Đăng nhập" ở dưới để đổi chế độ
switchLink.addEventListener("click", function () {
  isLoginMode = !isLoginMode; // đảo true <-> false

  if (isLoginMode) {
    titleEl.textContent = "Đăng nhập";
    submitBtn.textContent = "Đăng nhập";
    switchText.textContent = "Chưa có tài khoản?";
    switchLink.textContent = "Đăng ký";
  } else {
    titleEl.textContent = "Đăng ký";
    submitBtn.textContent = "Đăng ký";
    switchText.textContent = "Đã có tài khoản?";
    switchLink.textContent = "Đăng nhập";
  }
  showMessage("", "");
});

// 6. Xử lý khi bấm nút gửi form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // chặn trình duyệt tải lại trang

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Kiểm tra dữ liệu nhập
  if (username === "" || password === "") {
    showMessage("Vui lòng nhập đầy đủ thông tin.", "error");
    return;
  }
  if (password.length < 6) {
    showMessage("Mật khẩu phải có ít nhất 6 ký tự.", "error");
    return;
  }

  const users = getUsers();

  if (isLoginMode) {
    // ----- ĐĂNG NHẬP -----
    if (users[username] && users[username] === password) {
      localStorage.setItem("currentUser", username); // ghi nhớ người đang đăng nhập
      window.location.href = "search.html"; // chuyển sang trang tìm kiếm
    } else {
      showMessage("Sai tên đăng nhập hoặc mật khẩu.", "error");
    }
  } else {
    // ----- ĐĂNG KÝ -----
    if (users[username]) {
      showMessage("Tên đăng nhập đã tồn tại.", "error");
      return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users)); // biến object thành chuỗi để lưu
    showMessage("Đăng ký thành công! Hãy đăng nhập.", "success");
    form.reset();
    switchLink.click(); // tự chuyển về chế độ đăng nhập
    showMessage("Đăng ký thành công! Hãy đăng nhập.", "success");
  }
});
