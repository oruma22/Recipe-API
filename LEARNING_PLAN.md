# Node.js Portfolio API: Learning Plan

This document breaks down the professional engineering patterns we implemented to move this project from a "beginner CRUD" to a "production-ready" portfolio piece.

---

## 🟢 Phase 1: Security & Data Integrity
**The Problem:** The original code trusted the user to provide their own `author` ID in the request body. A malicious user could send a request and "claim" to be any user in the database.
**The Solution:** We now extract the `userId` directly from the **JWT (JSON Web Token)** payload during the authentication phase.

### 📚 Concepts to Research
- **JWT Claims/Payload:** How data is securely encoded inside a token.
- **Stateless Authentication:** Why we store the User ID in the token instead of asking the database every time.
- **Middleware Data Passing:** How to attach data to the `req` object (e.g., `req.userInfo`) so it’s available in the next function.

**📂 Key Files to Review:**
- `Middlewares/auth-middlewares.js` (where the token is decoded)
- `controllers/recipe-controller.js` (where `req.userInfo.userId` is used)

---

## 🟡 Phase 2: Request Validation
**The Problem:** Without validation, a user could send an empty string for a title, a negative number for cooking time, or a random string where an image URL should be. This causes "garbage data" in your database.
**The Solution:** We added **express-validator** to act as a "bouncer." It checks all data *before* it reaches your controller.

### 📚 Concepts to Research
- **Input Sanitization:** Using `.trim()` or `.escape()` to prevent Malicious scripts (XSS).
- **Schema vs. Request Validation:** Why checking data at the API entry point is better than waiting for a database error.
- **HTTP 400 Bad Request:** The standard way to tell a user their input was wrong.

**📂 Key Files to Review:**
- `Middlewares/validation-middleware.js`
- `Routes/recipe-routes.js` (see how the middleware is inserted)

---

## 🔴 Phase 3: Global Error Handling
**The Problem:** Standard code uses `try-catch` blocks everywhere. This is repetitive, messy, and if you forget one, your server might crash without a clear message.
**The Solution:** We implemented a **Global Error Middleware** and a `catchAsync` helper to centralize all error logic in one place.

### 📚 Concepts to Research
- **Express Error Middleware:** The special 4-argument function signature: `(err, req, res, next)`.
- **Higher-Order Functions:** How `catchAsync` "wraps" your functions to catch errors automatically.
- **Standardized API Responses:** Why every error should return a consistent `{ success: false, message: "..." }` format.

**📂 Key Files to Review:**
- `Middlewares/error-middleware.js`
- `helpers/catchAsync.js`

---

## 🔵 Phase 4: Automated Testing
**The Problem:** Testing manually with Postman is slow and error-prone. As the app grows, you might fix one thing and accidentally break another.
**The Solution:** We added **Jest** and **Supertest** to run "Integration Tests" that verify your API works perfectly in seconds.

### 📚 Concepts to Research
- **Integration Testing:** Testing the "integration" between routes, logic, and the database.
- **Mocking / In-Memory DBs:** Using `mongodb-memory-server` to run tests without needing a real database.
- **Assertions:** Using `expect()` to verify that status codes and data are correct.

**📂 Key Files to Review:**
- `tests/recipe.test.js`
- `package.json` (see the `test` script)

---

## ⚪ Phase 5: Code Quality & Standards
**The Problem:** Beginners often have inconsistent formatting (tabs vs spaces) or small bugs (unused variables) that are hard to see.
**The Solution:** We set up **ESLint** (to find logical errors) and **Prettier** (to handle formatting automatically).

### 📚 Concepts to Research
- **Linting:** Automated tools that find "code smells" and potential bugs.
- **Style Guides:** Why professional teams use a shared set of rules (like the Prettier config).
- **ES Modules (ESM):** Modern Node.js syntax using `import`/`export` instead of `require()`.

**📂 Key Files to Review:**
- `eslint.config.js`
- `.prettierrc`

---

## 🚀 Recommended Study Order
1. **Request Validation** (Easy to see the immediate result).
2. **Global Error Handling** (The most powerful improvement for your code's "cleanliness").
3. **Security/JWT** (Critical for real-world apps).
4. **Automated Testing** (The hardest to master, but the most valuable skill for senior roles).
