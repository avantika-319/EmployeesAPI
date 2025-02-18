let employees = [
  {
    employeeId: 1,
    name: "John Doe",
    email: "tugrp@example.com",
    departmentId: 1,
    roleId: 1,
  },
  {
    employeeId: 2,
    name: "Jane Smith",
    email: "mynbi@example.com",
    departmentId: 2,
    roleId: 2,
  },
  {
    employeeId: 3,
    name: "Bob Johnson",
    email: "oqibz@example.com",
    departmentId: 1,
    roleId: 3,
  },
];

function getEmployees() {
  return employees;
}

function getEmployeesById(id) {
  return employees.find((employee) => employee.employeeId === id);
}

module.exports = { getEmployees, getEmployeesById };
