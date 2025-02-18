const request = require("supertest");
const { app } = require("../index");
const http = require("http");
const { getAllEmployees } = require("../controllers");
const jestConfig = require("../jest.config");
const { describe, it } = require("node:test");

jestConfig.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllEmployees: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all employees", () => {
    let mockedEmployees = [
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

    getAllEmployees.mockReturnValue(mockedEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });
});

describe("API End Points Test", () => {
  it("GET /employees should get all employees", async () => {
    const res = await request(server).get("/employees");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: [
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
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });

  it("GET /employees/details/:id should get employee by id", async () => {
    const res = await request(server).get("/employees/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: "John Doe",
        email: "tugrp@example.com",
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
