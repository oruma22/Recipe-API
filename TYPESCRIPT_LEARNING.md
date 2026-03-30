# TypeScript Refactor: Learning Plan

This guide explains the concepts and patterns we used to refactor the Recipe API from JavaScript to TypeScript. Use this to understand how to read, write, and maintain TypeScript code in this project.

---

## 🟦 Why TypeScript?
**The Goal:** Moving from "Guesswork" to "Certainty."
In JavaScript, you don't know what's inside `req.body` or a `user` object until you run the code. In TypeScript, the editor tells you exactly what properties exist, preventing "Undefined" errors before you even save the file.

---

## 📦 1. Interfaces & Mongoose Models
**What we did:** We created `interfaces` (like `IUser`, `IRecipe`) that define the "shape" of our data.

### 📚 Concepts to Research
- **Interfaces:** How to define the structure of an object.
- **Extending Document:** Why our interfaces extend `mongoose.Document` (to get properties like `_id` and `.save()`).
- **Generic Types:** How we tell Mongoose which interface to use: `mongoose.model<IUser>("User", userSchema)`.

**📂 Key Files to Review:**
- `src/models/User.ts`
- `src/models/Recipe.ts`

---

## 🛠️ 2. Typing Express (Request & Response)
**What we did:** We replaced generic `(req, res)` with typed versions to ensure we handle HTTP data correctly.

### 📚 Concepts to Research
- **Request, Response, NextFunction:** The core types provided by `@types/express`.
- **Interface Extension:** Look at `CustomRequest` in `auth-middlewares.ts`. We "extended" the standard Express Request to add the `userInfo` property.
- **Type Assertion (`as any`):** Why we sometimes use `as any` when connecting middlewares in routes (handling complex library type mismatches).

**📂 Key Files to Review:**
- `src/middlewares/auth-middlewares.ts`
- `src/controllers/recipe-controller.ts`

---

## ⚡ 3. The "Import Type" Pattern
**The Problem:** During testing, we saw errors like `The requested module 'express' does not provide an export named 'Request'`. 
**The Solution:** In modern Node.js (ESM), types often don't exist at runtime. We use `import type` to tell the compiler "only use this for checking, don't try to run it."

### 📚 Concepts to Research
- **Type-Only Imports:** The difference between `import { x }` and `import type { x }`.
- **ESM (ECMAScript Modules) Compatibility:** Why Node.js sometimes struggles with named exports from older libraries.

**📂 Key Files to Review:**
- `src/helpers/catchAsync.ts`
- `src/middlewares/upload-middleware.ts`

---

## ⚙️ 4. Configuration & Runtime
**What we did:** We set up a `tsconfig.json` and switched from `nodemon` to `tsx`.

### 📚 Concepts to Research
- **tsconfig.json:**
    - `rootDir` & `outDir`: Where the code lives and where it gets compiled to.
    - `target` & `module`: Ensuring we use the latest JavaScript features (`esnext`).
- **tsx (TypeScript Execute):** A modern, faster replacement for `ts-node` that works perfectly with ESM.
- **ts-jest:** The bridge that allows Jest to understand and test `.ts` files.

**📂 Key Files to Review:**
- `tsconfig.json`
- `package.json` (look at the `scripts` section)

---

## 🚀 How to Practice
1.  **Hover over variables:** Open any file in `src/` and hover your mouse over a variable (like `newUser`). See how VS Code tells you exactly what it is?
2.  **Make a mistake:** Go to `src/controllers/recipe-controller.ts` and try to access `req.body.nonExistentProperty`. See the red squiggly line? That's TypeScript saving you from a bug!
3.  **Add a field:** Try adding a `phoneNumber` to the `IUser` interface in `src/models/User.ts`. Notice how TypeScript immediately tells you everywhere else in the project that you need to handle that new field.

**TypeScript is a journey! Don't worry if the syntax looks "noisy" at first—it's there to be your most helpful co-pilot.**
