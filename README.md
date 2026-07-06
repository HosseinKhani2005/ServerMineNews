## 🧠 Backend Architecture & Security Deep Dive

While the frontend delivers a polished user experience, the real magic happens behind the scenes. Building the backend for **MineNews** was a transformative journey that pushed me deep into the world of **Node.js**, **Express**, and modern security practices. This project wasn't just about writing APIs—it was about architecting a secure, scalable, and robust system that could handle real-world traffic and protect user data.

You can explore the live project here: [https://hosseinkhani20.ir/](https://hosseinkhani20.ir/)

---

### 🛡️ Security-First Mindset

Security was the cornerstone of this backend development. Every decision—from authentication flows to API rate limiting—was made with the user's safety in mind.

#### 1. Google reCAPTCHA v3 Integration
**Challenge:** Protecting the registration and login endpoints from automated bot attacks and brute-force attempts.  
**Solution:** Integrated **Google reCAPTCHA v3**, which runs in the background and assigns a score to each request based on user behavior. Unlike v2, this version provides a seamless experience without user interaction. The backend validates the reCAPTCHA token for every sensitive operation, ensuring that only legitimate human users can access the system. This was my first deep dive into reCAPTCHA v3, and I thoroughly enjoyed learning its nuances.

#### 2. JWT Authentication with Access & Refresh Tokens
**Challenge:** Implementing a secure, stateless authentication system that balances security with user experience.  
**Solution:** Adopted a **dual-token strategy**:
- **Access Token** (short-lived, stored in memory) – Used for authenticating API requests.
- **Refresh Token** (long-lived, stored in an HTTP‑only cookie) – Used to obtain new access tokens without requiring the user to log in again.

This approach minimizes the risk of token theft while maintaining a smooth user experience. The refresh token is securely stored in an HTTP‑only cookie, making it inaccessible to client-side JavaScript and immune to XSS attacks.

#### 3. Password Hashing with bcrypt
**Challenge:** Storing user passwords securely to prevent data breaches.  
**Solution:** Used **bcrypt**, a robust hashing library, to salt and hash passwords before storing them in MongoDB. This ensures that even if the database is compromised, user passwords remain protected.

#### 4. Security Headers with Helmet
**Challenge:** Protecting the application from common web vulnerabilities.  
**Solution:** Integrated **Helmet.js**, which sets various HTTP headers to secure the app against well-known attacks, including XSS, clickjacking, and MIME-type sniffing. This added an extra layer of defense with minimal configuration.

#### 5. CORS Configuration
**Challenge:** Allowing only trusted domains to access the API.  
**Solution:** Configured **CORS (Cross-Origin Resource Sharing)** to restrict API access to specific origins, preventing unauthorized domains from making requests to the backend.

#### 6. Rate Limiting with express-rate-limit
**Challenge:** Preventing brute-force attacks and DDoS attempts on authentication endpoints.  
**Solution:** Implemented **express-rate-limit** to cap the number of requests from a single IP address within a given timeframe. This significantly reduces the risk of abuse on login, registration, and password reset routes.

---

### 👤 User Management & Custom Features

#### 7. Dynamic Profile Avatars with DiceBear
**Challenge:** Providing a unique, visually appealing default avatar for every new user without requiring them to upload an image.  
**Solution:** Integrated **DiceBear Avatars**, an API that generates deterministic, unique avatars based on a seed string. When a user registers, the backend generates an avatar URL using the user's unique ID as the seed. This URL is stored in the MongoDB `User` model under the `imgUrl` field. The result is a distinctive, consistent avatar for each user that enhances the platform's visual appeal without any additional effort from the user.

#### 8. Secure Logout & Password Change Flows
**Challenge:** Ensuring that logout and password change operations are secure and invalidate existing sessions.  
**Solution:** 
- **Logout:** The backend clears the refresh token cookie and invalidates the session on the client side.
- **Change Password:** Users must provide their current password and a new one. The backend verifies the current password using bcrypt, hashes the new password, and updates the database. All existing access tokens are invalidated, forcing the user to re-authenticate.

#### 9. Middleware for Route Protection
**Challenge:** Protecting sensitive routes (e.g., profile updates, comment creation) from unauthorized access.  
**Solution:** Built custom middleware that verifies the access token on each request. If the token is expired or invalid, the middleware checks for a valid refresh token and issues a new access token automatically—providing a seamless, uninterrupted user experience.

---

### 🗄️ Database Design with MongoDB

**Challenge:** Designing a flexible, scalable data model that supports users, news articles, comments, and events.  
**Solution:** Used **MongoDB** with a schema that includes:
- **User Model:** Stores credentials, avatar URL, role, and timestamps.
- **News Model:** Contains title, content, images, categories, and publication dates.
- **Comment Model:** Links to users and news articles, with nested replies for threaded discussions.
- **Event Model:** Manages community events with dates, locations, and participant counts.

MongoDB's document-oriented structure allowed for rapid iteration and easy scaling as the project grew.

---

### 🚀 What I Learned & Achieved

This backend project was a **massive leap forward** in my development journey. Here are the key takeaways:

- **Security Fundamentals:** Gained hands-on experience with JWT, bcrypt, Helmet, CORS, and rate limiting. I now understand how to build a production-ready API that prioritizes security.
- **Token Strategy:** Mastered the access/refresh token pattern, including cookie storage, rotation, and invalidation.
- **Middleware Patterns:** Learned to write reusable middleware for authentication, logging, and error handling.
- **API Design:** Built RESTful endpoints with clear request/response structures, proper status codes, and comprehensive error messages.
- **Third-Party Integrations:** Successfully integrated Google reCAPTCHA v3 and DiceBear Avatars, understanding how to work with external APIs securely.
- **Full-Stack Ownership:** This project proved that I can independently architect, build, and deploy a full-stack application from scratch—all within a **single week**.

---

### 🛠️ Backend Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime for the backend |
| **Express.js** | Web framework for building REST APIs |
| **MongoDB** | NoSQL database for flexible data storage |
| **Mongoose** | ODM for MongoDB schema modeling |
| **JSON Web Tokens (JWT)** | Secure authentication via access & refresh tokens |
| **bcrypt** | Password hashing and salting |
| **Helmet** | Security headers for protection against common vulnerabilities |
| **CORS** | Cross-Origin Resource Sharing configuration |
| **express-rate-limit** | Rate limiting to prevent brute-force attacks |
| **Google reCAPTCHA v3** | Bot protection for sensitive endpoints |
| **DiceBear Avatars** | Dynamic, unique user avatars |

---


---

### 🙏 Final Thoughts

Building the backend for MineNews was one of the most rewarding challenges I've undertaken. It transformed my understanding of web security, authentication, and API design. I went from having basic knowledge of Node.js to confidently implementing production‑grade security measures, handling complex token workflows, and integrating third‑party services seamlessly.

This project proved that I can take full ownership of a full‑stack application—from database design to deployment—and deliver a secure, performant, and user‑friendly product.

---

<p align="center">
  Built with ❤️ by <strong>Hossein Khani</strong>
  <br />
  <a href="https://hosseinkhani20.ir/">🌐 Live Demo</a> ·
  <a href="https://github.com/HosseinKhani2005">🐙 GitHub</a> ·
  <a href="https://linkedin.com/in/hossein-khani-5845a5387/">💼 LinkedIn</a>
</p>
