const request = require("supertest");
const { app, validateUser, validateBook, validateReview } = require("../index");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API End Points to add Data", () => {
  it("should add a new user with valid input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "John Doe", email: "john.doe@example.com" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    });
  });

  it("should return 400 for invalid user input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ email: "john.doe@example.com" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Name is required and should be a string");
  });

  it("should add a new book with valid input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "The Great Gatsby", author: "F. Scott Fitzgerald" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
    });
  });

  it("should return 400 for invalid book input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "The Great Gatsby" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Author is required and should be a string");
  });

  it("should add a new review with valid input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great writing!", userId: 1 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great writing!",
      userId: 1,
    });
  });

  it("should return 400 for invalid review input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great writing!", userId: "1" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("User id is required and should be a number");
  });
});

describe("Validation Functions", () => {
  it("should validate user input correctly", () => {
    expect(
      validateUser({ name: "John Doe", email: "john.doe@example.com" }),
    ).toBeNull();

    expect(validateUser({ email: "john.doe@example.com" })).toEqual(
      "Name is required and should be a string",
    );

    expect(validateUser({ name: "John Doe" })).toEqual(
      "Email is required and should be a string",
    );
  });

  it("should validate book input correctly", () => {
    expect(
      validateBook({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      }),
    ).toBeNull();

    expect(validateBook({ author: "F. Scott Fitzgerald" })).toEqual(
      "Title is required and should be a string",
    );

    expect(validateBook({ title: "The Great Gatsby" })).toEqual(
      "Author is required and should be a string",
    );
  });

  it("should validate review input correctly", () => {
    expect(validateReview({ content: "Great writing!", userId: 1 })).toBeNull();
    expect(validateReview({ userId: 1 })).toEqual(
      "Review content is required and should be a string",
    );
    expect(validateReview({ content: "Great writing!" })).toEqual(
      "User id is required and should be a number",
    );
  });
});
