import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../server.js";
import User from "../models/User.js";
import Recipe from "../models/recipe.js";
import jwt from "jsonwebtoken";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Recipe.deleteMany({});
});

describe("Recipe API", () => {
  const mockUser = {
    username: "testuser",
    email: "test@example.com",
    password: "password123",
    role: "user",
  };

  const mockRecipe = {
    title: "Test Recipe",
    description: "A delicious test recipe",
    ingredients: ["ingredient 1", "ingredient 2"],
    instructions: ["step 1", "step 2"],
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    category: "Lunch",
    image: "https://example.com/image.jpg",
  };

  const getAuthToken = async (user) => {
    const newUser = await User.create(user);
    return jwt.sign(
      { userId: newUser._id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET_KEY || "testsecret",
      { expiresIn: "1h" },
    );
  };

  test("should create a new recipe when authenticated", async () => {
    const token = await getAuthToken(mockUser);

    const response = await request(app)
      .post("/api/recipes/create")
      .set("Authorization", `Bearer ${token}`)
      .send(mockRecipe);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(mockRecipe.title);
  });

  test("should fail to create recipe if not authenticated", async () => {
    const response = await request(app).post("/api/recipes/create").send(mockRecipe);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test("should fail to create recipe with invalid data", async () => {
    const token = await getAuthToken(mockUser);
    const invalidRecipe = { ...mockRecipe, title: "" };

    const response = await request(app)
      .post("/api/recipes/create")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidRecipe);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
  });
});
