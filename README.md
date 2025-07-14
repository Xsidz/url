 #URL Shortener API

A full-featured URL shortener service built with Node.js, Express, and MongoDB. This application allows users to create shortened URLs, track analytics, and includes user authentication features.

## Features

- 🔗 **URL Shortening**: Convert long URLs into short, manageable links
- 📊 **Analytics**: Track click counts and visit history for shortened URLs
- 🔐 **User Authentication**: Secure signup, login, and logout functionality
- 🍪 **JWT Authentication**: Token-based authentication with HTTP-only cookies
- 🔒 **Password Security**: Bcrypt password hashing
- 📱 **CORS Support**: Cross-origin resource sharing enabled
- ⚡ **Fast Redirects**: Quick URL redirection with visit tracking

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **ID Generation**: nanoid
- **Environment**: dotenv

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   node index.js
   ```

   For development with auto-restart:
   ```bash
   nodemon index.js
   ```

## API Endpoints

### Authentication Routes

#### Sign Up
- **POST** `/auth/signup`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Logout
- **POST** `/auth/logout`

#### Check Authentication
- **GET** `/auth/check`
- Requires authentication

### URL Routes

#### Create Short URL
- **POST** `/new`
- **Body**:
  ```json
  {
    "url": "https://www.example.com/very-long-url"
  }
  ```
- **Response**:
  ```json
  {
    "id": "abc12345",
    "shortUrl": "http://localhost:3000/abc12345",
    "originalUrl": "https://www.example.com/very-long-url"
  }
  ```

#### Redirect to Original URL
- **GET** `/:shortId`
- Redirects to the original URL and tracks the visit

#### Get URL Analytics
- **GET** `/analytics/:shortId`
- **Response**:
  ```json
  {
    "shortId": "abc12345",
    "originalUrl": "https://www.example.com/very-long-url",
    "totalClicks": 5,
    "visitHistory": [
      { "timestamp": 1640995200000 }
    ]
  }
  ```

## Project Structure

```
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   └── url.controller.js     # URL shortening logic
├── lib/
│   ├── db.js                 # Database connection
│   └── utils.js              # Utility functions
├── middlewares/
│   └── auth.middleware.js    # Authentication middleware
├── models/
│   ├── user.model.js         # User schema
│   └── url.model.js          # URL schema
├── routes/
│   ├── auth.route.js         # Authentication routes
│   └── url.routes.js         # URL routes
├── index.js                  # Main server file
└── README.md
```

## Database Schema

### User Model
```javascript
{
  email: String (required, unique),
  fullName: String (required),
  password: String (required, min: 6),
  timestamps: true
}
```

### URL Model
```javascript
{
  shortId: String (required, unique),
  redirectUrl: String (required),
  visitHistory: [{ timestamp: Number }],
  timestamps: true
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure authentication with HTTP-only cookies
- **Input Validation**: URL format validation and required field checks
- **CORS Configuration**: Controlled cross-origin access
- **Protected Routes**: Middleware-based route protection

## Usage Examples

### Using cURL

**Create a short URL:**
```bash
curl -X POST http://localhost:3000/new \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'
```

**Sign up a new user:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | Secret key for JWT tokens | - |
| `NODE_ENV` | Environment mode | development |

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on the repository.
