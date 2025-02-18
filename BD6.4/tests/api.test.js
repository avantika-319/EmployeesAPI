const request = require("supertest");
const { app } = require("../index");
const { getBooks, getBookById, getReviews, getReviewById } = require("../book");
const http = require("http");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API ERROR HANDLING", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET API /api.books should return a 404 status code if no books are found", async () => {
    getBooks.mockReturnValue([]);

    const response = await request(server).get("/api/books");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No books Found");
  });

  it("GET API /api.books/:id should return a 404 status code if no book is found", async () => {
    getBookById.mockReturnValue(null);
    const reponse = await request(server).get("/api/books/992");
    expect(reponse.status).toBe(404);
    expect(reponse.body.error).toBe("Book not found");
  });

  it("GET API /api.reviews should return a 404 status code if no reviews are found", async () => {
    getReviews.mockReturnValue([]);

    const response = await request(server).get("/api/reviews");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No reviews Found");
  });

  it("GET apis /api.reviews/:id should return a 404 status code if no review is found", async () => {
    getReviewById.mockReturnValue(null);

    const response = await request(server).get("/api/reviews/992");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Review not found");
  });
});
