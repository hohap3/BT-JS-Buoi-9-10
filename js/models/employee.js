// Constructor function

function Employee(
  id,
  account,
  fullName,
  email,
  password,
  date,
  salary,
  position,
  workingHour
) {
  this.id = id;
  this.account = account;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.workingHour = workingHour;

  this.categorizeEmployee = function () {
    if (this.workingHour >= 192) return "Nhân viên xuất sắc";
    else if (this.workingHour >= 176) return "Nhân viên giỏi";
    else if (this.workingHour >= 160) return "Nhân viên khá";
    else return "Nhân viên trung bình";
  };

  this.totalSalary = function () {
    if (this.position === "Sếp") return (this.salary * 3).toLocaleString();
    else if (this.position === "Trưởng phòng")
      return (this.salary * 2).toLocaleString();
    else return this.salary.toLocaleString();
  };
}
