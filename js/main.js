var employeeList = [];
var EMPLOYEE_LIST = "employeeList";
var globalIndex = 0;

var mode = "create";
function saveLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

// get localStorage data
function getLocalStorageData(name) {
  return JSON.parse(localStorage.getItem(name)) || [];
}

// submit form
function submitForm() {
  var submitBtn = document.querySelector("#btnThemNV");
  var updateBtn = document.querySelector("#btnCapNhat");
  var addBtn = document.getElementById("btnThem");

  if (!submitBtn || !updateBtn || !addBtn) return;

  // //
  // addBtn.addEventListener("click", function () {
  //   mode = "create";
  //   console.log(mode);
  // });

  // Thêm nhân viên mới
  submitBtn.addEventListener("click", function () {
    if (mode === "create") createNewEmployee();
    else if (mode === "update") return;
  });

  // Cập nhật nhân viên
  updateBtn.addEventListener("click", function () {
    if (mode === "create") return;
    else if (mode === "update") updateEmployee();
  });
}

// Tạo nhân viên mới
function createNewEmployee() {
  // Kiểm tra form đã validate chưa
  if (!validateForm()) return;

  var closeBtn = document.querySelector("#btnDong");
  var formElement = document.querySelector("#form");

  var accountInput = document.querySelector("#tknv").value;
  var nameInput = document.querySelector("#name").value;
  var emailInput = document.querySelector("#email").value;
  var passwordInput = document.querySelector("#password").value;
  var dateInput = document.querySelector("#datepicker").value;
  var salaryInput = document.querySelector("#luongCB").value * 1;
  var categorizeInput = document.querySelector("#chucvu").value;
  var workingHour = document.querySelector("#gioLam").value * 1;

  // Kiểm tra xem account hoặc email đã tồn tại chưa
  for (var i = 0; i < employeeList.length; i++) {
    var employee = employeeList[i];
    if (employee.account === accountInput) {
      alert(`Account ${accountInput} đã tồn tại!`);
      document.querySelector("#tknv").focus();
      return;
    }
  }

  var id = Date.now();
  // Tạo ra value mới
  var newEmployee = new Employee(
    id,
    accountInput,
    nameInput,
    emailInput,
    passwordInput,
    dateInput,
    salaryInput,
    categorizeInput,
    workingHour
  );
  // Thêm value mới vào list hiện tại
  employeeList.push(newEmployee);
  // Lưu vào local storage
  saveLocalStorage(EMPLOYEE_LIST, employeeList);
  // Render lại list
  renderEmployee();

  // Sau khi add xong , ta reset Form
  formElement.reset();
  closeBtn.click();
}

// Update nhân viên
function updateEmployee() {
  if (!validateForm()) return;

  if (globalIndex < 0) return;

  var closeBtn = document.querySelector("#btnDong");
  var formElement = document.querySelector("#form");

  var nameInput = document.querySelector("#name").value;
  var emailInput = document.querySelector("#email").value;
  var passwordInput = document.querySelector("#password").value;
  var dateInput = document.querySelector("#datepicker").value;
  var salaryInput = document.querySelector("#luongCB").value * 1;
  var categorizeInput = document.querySelector("#chucvu").value;
  var workingHour = document.querySelector("#gioLam").value * 1;

  // Update value
  employeeList[globalIndex].fullName = nameInput;
  employeeList[globalIndex].email = emailInput;
  employeeList[globalIndex].password = passwordInput;
  employeeList[globalIndex].date = dateInput;
  employeeList[globalIndex].salary = salaryInput;
  employeeList[globalIndex].position = categorizeInput;
  employeeList[globalIndex].workingHour = workingHour;

  // Save vào local storage
  saveLocalStorage(EMPLOYEE_LIST, employeeList);

  // Update DOM
  renderEmployee();

  // Change mode to create
  mode = "create";

  // Close form & Reset form
  formElement.reset();
  closeBtn.click();
}

// save localStorage

// In ra danh sách nhân viên

function renderEmployee(dataList) {
  if (!dataList) dataList = employeeList;

  var html = "";

  var tableList = document.querySelector("#tableDanhSach");
  if (!tableList) return;

  for (var i = 0; i < dataList.length; i++) {
    var employee = dataList[i];

    html += `<tr data-id=${employee.id} >
        <td>${employee.account}</td>
        <td>${employee.fullName}</td>
        <td>${employee.email}</td>
        <td>${employee.date}</td>
        <td>${employee.position}</td>
        <td>${formatMoney(employee.totalSalary())}</td>
        <td>${employee.categorizeEmployee()}</td>
        <td>
          <button id="btn-delete" class="btn btn-danger" onclick="handleRemoveEmployee(${
            employee.id
          })" ><i class="fa fa-trash" aria-hidden="true"></i></button>
        </td>
        <td>
          <button id="btn-delete" class="btn btn-success" onclick="handleUpdateEmployee(${
            employee.id
          })" ><i class="fa fa-cog" aria-hidden="true"></i></button>
        </td>
      </tr>`;
  }

  tableList.innerHTML = html;
}

// Clone dữ liệu mảng ra 1 mảng mới
function mapData(dataList) {
  if (!Array.isArray(dataList)) return;

  var newEmployeeList = [];

  for (var i = 0; i < dataList.length; i++) {
    var _id = dataList[i].id;
    var _account = dataList[i].account;
    var _name = dataList[i].fullName;
    var _email = dataList[i].email;
    var _date = dataList[i].date;
    var _password = dataList[i].password;
    var _salary = dataList[i].salary;
    var _salary = dataList[i].salary;
    var _position = dataList[i].position;
    var _workingHour = dataList[i].workingHour;

    var newEmployee = new Employee(
      _id,
      _account,
      _name,
      _email,
      _password,
      _date,
      _salary,
      _position,
      _workingHour
    );

    newEmployeeList.push(newEmployee);
  }

  return newEmployeeList;
}

function getIndexById(id) {
  if (!id) return;

  var index = 0;
  for (var i = 0; i < employeeList.length; i++) {
    var employee = employeeList[i];
    if (employee.id === id * 1) index = i;
  }

  return index;
}

// // Xóa nhân viên
function handleRemoveEmployee(id) {
  if (!id) return;

  var index = getIndexById(id);

  // // Xóa value trong employeeList
  employeeList.splice(index, 1);

  // // Lưu vào localStorage
  saveLocalStorage(EMPLOYEE_LIST, employeeList);

  // Update DOM
  var trElement = document.querySelector(`tr[data-id="${id}"]`);
  if (!trElement) return;
  trElement.remove();
}

// Update nhân viên

function handleUpdateEmployee(id) {
  if (!id) return;

  var index = getIndexById(id);
  if (index < 0) return alert(`${id} không tồn tại!`);

  // Lấy ra employee mà cần update
  var employee = employeeList[index];
  globalIndex = index;
  // console.log(employee);

  var accountInput = document.querySelector("#tknv");
  var nameInput = document.querySelector("#name");
  var emailInput = document.querySelector("#email");
  var passwordInput = document.querySelector("#password");
  var dateInput = document.querySelector("#datepicker");
  var salaryInput = document.querySelector("#luongCB");
  var categorizeInput = document.querySelector("#chucvu");
  var workingHour = document.querySelector("#gioLam");
  var addBtn = document.getElementById("btnThem");

  // Update Input

  accountInput.value = employee.account;
  nameInput.value = employee.fullName;
  emailInput.value = employee.email;
  passwordInput.value = employee.password;
  dateInput.value = employee.date;
  salaryInput.value = employee.salary;
  categorizeInput.value = employee.position;
  workingHour.value = employee.workingHour;

  accountInput.disabled = true;

  // Update mode
  mode = "update";

  // Hiển thị ra form
  addBtn.click();
}

// Search nhân viên

function searchResult(searchValue) {
  var result = [];

  for (var i = 0; i < employeeList.length; i++) {
    var employeeCategorize = employeeList[i].categorizeEmployee().toLowerCase();
    if (employeeCategorize.includes(searchValue.toLowerCase()))
      result.push(employeeList[i]);
  }

  return result;
}

function handleSearchEmployee(searchValue) {
  // Nếu thanh search trống , ta render toàn bộ
  if (searchValue.trim().length < 0) {
    renderEmployee();
    return;
  }

  var result = searchResult(searchValue);

  // Render result list
  renderEmployee(result);
}

function searchEmployee() {
  var searchInput = document.querySelector("#searchName");
  var searchBtn = document.querySelector("#btnTimNV");

  if (!searchBtn || !searchInput) return;

  searchBtn.addEventListener("click", function () {
    handleSearchEmployee(searchInput.value);
  });
}

// on load website

window.onload = function () {
  var localEmployeeList = getLocalStorageData(EMPLOYEE_LIST);

  employeeList = mapData(localEmployeeList);

  renderEmployee();
};

// Validation form

// Check input length , require
/**
 *
 * config : {
 *  errorId:string
 * type:string
 * }
 *
 *
 */

function requireField(elementId, config) {
  if (!elementId) return;

  var elementInput = document.getElementById(elementId);

  if (!elementInput) return;

  var errorText = document.getElementById(config.errorId);
  if (!errorText) return;
  var message = "";

  if (elementInput.value.trim().length < 1) {
    switch (config.type) {
      case "select":
        message = `*Vui lòng chọn chức vụ hợp lệ`;
        break;
      default:
        message = `*Vui lòng điền vào trường này`;
    }
    errorText.textContent = message;
    errorText.style.display = "block";
    return false;
  }
  errorText.textContent = message;
  errorText.style.display = "none";
  return true;
}

function validateForm() {
  var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  var namePattern = /[A-z\s]+$/;
  var passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/g;

  var datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[0-1])\/(19|20)\d{2}$/g;

  var accountValidation =
    requireField("tknv", { errorId: "tbTKNV" }) &&
    checkLength("tknv", { errorId: "tbTKNV", min: 4, max: 6, type: "account" });

  var nameValidation =
    requireField("name", { errorId: "tbTen" }) &&
    checkValidate("name", {
      errorId: "tbTen",
      pattern: namePattern,
      type: "string",
    });

  var emailValidation =
    requireField("email", { errorId: "tbEmail" }) &&
    checkValidate("email", {
      errorId: "tbEmail",
      pattern: emailPattern,
      type: "email",
    });

  var passwordValidation =
    requireField("password", { errorId: "tbMatKhau" }) &&
    checkValidate("password", {
      errorId: "tbMatKhau",
      pattern: passwordPattern,
      type: "password",
    });

  var salaryValidation =
    requireField("luongCB", { errorId: "tbLuongCB" }) &&
    checkLength("luongCB", {
      errorId: "tbLuongCB",
      min: 1e6,
      max: 2e7,
      type: "salary",
    });

  var workingHourValidation =
    requireField("gioLam", { errorId: "tbGiolam" }) &&
    checkLength("gioLam", {
      errorId: "tbGiolam",
      min: 80,
      max: 200,
      type: "hourWorking",
    });

  var categorizeValidation = requireField("chucvu", {
    errorId: "tbChucVu",
    type: "select",
  });

  var dateValidation =
    requireField("datepicker", { errorId: "tbNgay" }) &&
    checkValidate("datepicker", {
      errorId: "tbNgay",
      pattern: datePattern,
      type: "date",
    });

  return (
    accountValidation &&
    nameValidation &&
    emailValidation &&
    passwordValidation &&
    salaryValidation &&
    workingHourValidation &&
    categorizeValidation &&
    dateValidation
  );
}

// Check  validate
/**
 * config : {
 *  errorId:string,
 *  pattern:object,
 * type:string
 * }
 *
 */

function checkValidate(elementId, config) {
  if (!elementId) return;

  var elementInput = document.getElementById(elementId);

  if (!elementInput) return;

  var errorText = document.getElementById(config.errorId);
  var message = "";
  if (!errorText) return;

  if (!config.pattern.test(elementInput.value.trim())) {
    switch (config.type) {
      case "email":
        message = `*Email phải đúng định dạng email`;
        break;
      case "password":
        message = `*Mật khẩu phải từ 6 - 10 ký tự và chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt `;
        break;
      case "string":
        message = `*Trường này phải là chữ`;
        break;

      case "date":
        message = `*Ngày làm định dạng là MM/DD/YYYY`;
        break;
    }

    errorText.textContent = message;
    errorText.style.display = "block";

    return false;
  }

  errorText.textContent = message;
  errorText.style.display = "none";
  return true;
}

// Check min and max input
/**
 *
 *  elementId
 *  config:{
 *  errorId:string,
 *  min:number,
 *  max:number,
 * type:string
 * }
 */

function formatMoney(money) {
  return new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
}

function checkLength(elementId, config) {
  if (!elementId) return;

  var elementInput = document.getElementById(elementId);

  if (!elementInput) return;

  var errorText = document.getElementById(config.errorId);
  var message = "";
  if (!errorText) return;

  if (elementInput.value > config.max || elementInput.value < config.min) {
    switch (config.type) {
      case "salary":
        message = `*Lương cơ bản từ ${formatMoney(config.min)} - ${formatMoney(
          config.max
        )}đ`;
        break;

      case "hourWorking":
        message = `*Số giờ trong tháng từ ${config.min} - ${config.max} giờ`;
        break;

      case "account":
        message = `*Tài khoản tối đa từ ${config.min} - ${config.max} số`;
        break;
    }

    errorText.textContent = message;
    errorText.style.display = "block";

    return false;
  }
  errorText.textContent = message;
  errorText.style.display = "none";

  return true;
}

submitForm();
searchEmployee();
