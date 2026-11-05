# BJS Program Management Backend – MERN Stack

A complete, standalone backend for a Program Management System designed to seamlessly integrate with frontend clients.

Built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** using modern ES6 modules.

---

## 1. Architecture Overview

The system models a flexible, three-tier hierarchical structure:

```
[Basket] 1 ──── N [Program] 1 ──── 1 [Program Content]
```

- **Basket (`baskets`):** Top-level classification (e.g. *Prarabdh*, *Pratibimb*, *Pravah*, *Parikalpana*, *Prabodhi*). No limit on the number of baskets.
- **Program (`programs`):** Individual initiatives under a basket (e.g. *Smart Girl*, *Blue Roots*, *JPA*). No limit on programs per basket. Programs can be moved between baskets dynamically.
- **Program Content (`programContents`):** Comprehensive program details managed independently, supporting multiple modules, topics, multimedia resources, and custom JSON metadata.

---

## 2. Directory Structure

```
backend/
├── config/
│   └── db.js                        # Mongoose MongoDB connection
├── models/
│   ├── Basket.js                    # Basket collection schema
│   ├── Program.js                   # Program collection schema
│   └── ProgramContent.js            # Program Content collection schema
├── controllers/
│   ├── basketController.js          # Basket request handlers
│   ├── programController.js         # Program request handlers
│   └── programContentController.js  # Program content request handlers
├── routes/
│   ├── basketRoutes.js              # /api/baskets routes
│   ├── programRoutes.js             # /api/programs routes
│   └── programContentRoutes.js      # /api/program-contents routes
├── services/
│   ├── basketService.js             # Basket business logic & DB queries
│   ├── programService.js            # Program business logic & DB queries
│   └── programContentService.js     # Content business logic & DB queries
├── middleware/
│   └── errorMiddleware.js           # Centralized error handler & 404 catcher
├── utils/
│   └── apiResponse.js               # Standardized success/error responses
├── app.js                           # Express application configuration
├── server.js                        # Server entry point with DB initialization
├── postman_collection.json          # Ready-to-import Postman Collection
├── .env                             # Environment configuration
├── .env.example                     # Environment template
├── package.json                     # Node.js project manifest (ES6 Modules)
└── README.md                        # Setup and API documentation
```

---

## 3. Prerequisites & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or remotely (e.g. `mongodb://127.0.0.1:27017`)

### Installation & Run

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```ini
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/bjs_program_management
   ```

4. Start the server:
   - **Production Mode:**
     ```bash
     npm start
     ```
   - **Development Mode (Auto-reload with Nodemon):**
     ```bash
     npm run dev
     ```

The server will confirm database connectivity before listening on port `5000`:
```
[Database] MongoDB connected successfully: 127.0.0.1
[Server] Program Management API running in development mode on port 5000
[Server] Health check: http://localhost:5000/api/health
```

---

## 4. Standard Response Format

### Success Response (200 / 201)
```json
{
  "success": true,
  "message": "Basket created successfully",
  "data": { ... }
}
```

### Error Response (400 / 404 / 500)
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 5. API Reference & Endpoints

### 5.1 Basket APIs

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `POST` | `/api/baskets` | Create new basket | None |
| `GET` | `/api/baskets` | Retrieve all baskets | `search`, `status`, `sortBy`, `sortOrder`, `includePrograms` |
| `GET` | `/api/baskets/:id` | Get basket details | `includePrograms` |
| `PUT` | `/api/baskets/:id` | Update basket | None |
| `DELETE` | `/api/baskets/:id` | Soft delete basket & child programs | None |
| `GET` | `/api/baskets/:basketId/programs` | Get all programs under a basket | `search`, `status`, `sortBy`, `sortOrder` |

#### Sample Basket Request: `POST /api/baskets`
```json
{
  "name": "Pratibimb",
  "slug": "pratibimb",
  "tagline": "Inception Programs",
  "description": "Initiatives designed to trigger reflection and early awareness across communities.",
  "logo": {
    "url": "https://example.org/logos/pratibimb.svg",
    "key": "pratibimb-logo"
  },
  "displayOrder": 1,
  "status": "active"
}
```

---

### 5.2 Program APIs

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `POST` | `/api/programs` | Create new program under a basket | None |
| `GET` | `/api/programs` | Retrieve all programs | `search`, `status`, `basketId`, `sortBy`, `sortOrder`, `includeContent` |
| `GET` | `/api/programs/:id` | Get program details | `includeContent` |
| `GET` | `/api/baskets/:basketId/programs` | Get all programs by basket ID | `search`, `status`, `sortBy`, `sortOrder` |
| `PUT` | `/api/programs/:id` | Update program details | None |
| `PATCH` | `/api/programs/:id/move` | Move program to another basket | None |
| `DELETE` | `/api/programs/:id` | Soft delete program & associated content | None |

#### Sample Program Request: `POST /api/programs`
```json
{
  "basketId": "65e0a1b2c3d4e5f6a7b8c9d0",
  "name": "Smart Girl",
  "slug": "smart-girl",
  "shortDescription": "Life skills and empowerment for adolescent girls",
  "description": "An experiential 2-day workshop empowering young girls with self-awareness and emotional strength.",
  "thumbnail": {
    "url": "https://example.org/images/smart-girl.png",
    "key": "smart-girl-thumb"
  },
  "displayOrder": 1,
  "status": "active"
}
```

#### Sample Move Program Request: `PATCH /api/programs/:id/move`
```json
{
  "basketId": "65e0b2c3d4e5f6a7b8c9d0e1"
}
```

---

### 5.3 Program Content APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/program-contents` | Create program content |
| `GET` | `/api/program-contents/:programId` | Get content by program ID |
| `PUT` | `/api/program-contents/:programId` | Update content by program ID |
| `DELETE` | `/api/program-contents/:programId` | Soft delete content by program ID |

#### Sample Program Content Request: `POST /api/program-contents`
```json
{
  "programId": "65e0c3d4e5f6a7b8c9d0e1f2",
  "overview": "Smart Girl equips young girls with essential life skills, emotional resilience, and self-defence awareness.",
  "objectives": [
    "Foster self-worth and positive self-image",
    "Equip girls with critical decision-making abilities"
  ],
  "targetAudience": [
    "Girls aged 13 to 18 years",
    "Parents and educators"
  ],
  "duration": "2 Days (16 hours total)",
  "modules": [
    {
      "title": "Self-Awareness & Self-Esteem",
      "description": "Understanding personal strengths and emotional identity.",
      "displayOrder": 1,
      "topics": ["Identity Discovery", "Overcoming Insecurities"]
    }
  ],
  "resources": [
    {
      "title": "Participant Handbook",
      "description": "Guidebook containing exercises and worksheets",
      "type": "document",
      "url": "https://example.org/resources/handbook.pdf"
    }
  ],
  "additionalInformation": {
    "certificationProvided": true,
    "nationalImpactCount": 814831
  },
  "status": "active"
}
```

---

## 6. Testing with Postman

1. Open Postman.
2. Click **Import** and select `backend/postman_collection.json`.
3. Set your collection variable `baseUrl` (default is `http://localhost:5000/api`).
4. Execute the requests sequentially:
   - **Health Check** to verify server status.
   - **Create Basket** and copy the returned `_id` into `{{basketId}}`.
   - **Create Program** and copy the returned `_id` into `{{programId}}`.
   - **Create Program Content** using `{{programId}}`.
   - Test **Move Program**, **Get By ID**, **Filter**, and **Delete**.

