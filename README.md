# QuickLink - URL Shortener

A full-stack web application for shortening URLs with user authentication, analytics tracking, and a modern responsive interface. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **URL Redirection**: Automatic redirection to original URLs
- **Click Analytics**: Track visit history and click counts
- **User Authentication**: Secure signup, login, and logout
- **User Dashboard**: Personalized interface for managing URLs
- **Responsive Design**: Modern, mobile-friendly UI

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Support**: Cross-origin resource sharing enabled
- **Cookie Management**: HTTP-only cookies for security
- **Input Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management
- **Docker Support**: Containerized deployment

## 🏗️ Architecture

### Backend (Node.js + Express)
```
backend/
├── controllers/          # Request handlers
│   ├── auth.controller.js    # Authentication logic
│   └── url.controller.js     # URL management logic
├── models/              # Database schemas
│   ├── user.model.js        # User data model
│   └── url.model.js         # URL data model
├── routes/              # API routes
│   ├── auth.route.js        # Authentication endpoints
│   └── url.routes.js        # URL endpoints
├── middlewares/         # Custom middleware
│   └── auth.middleware.js   # JWT authentication
├── lib/                 # Utility functions
│   ├── db.js               # Database connection
│   └── utlis.js            # JWT token utilities
└── test/               # Test files
    ├── app.mock.js         # Mock data
    └── url.test.js         # URL tests
```

### Frontend (Vanilla JavaScript)
```
frontend/
├── index.html          # Main HTML structure
├── script.js           # Frontend logic
└── style.css           # Styling
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.16.1
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **URL Generation**: nanoid 5.1.5
- **Testing**: Supertest 7.1.3

### Frontend
- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with modern features
- **HTTP Client**: Fetch API
- **UI**: Responsive design with modern UX

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (for frontend)

## 📋 Prerequisites

- Node.js (v20 or higher)
- MongoDB (local or cloud instance)
- Docker & Docker Compose (optional)

## 🚀 Installation & Setup

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/urlshortener
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm start
   
   # In another terminal, serve frontend
   # Using Python (if available)
   cd frontend
   python -m http.server 5500
   
   # Or using Node.js serve
   npx serve frontend -p 5500
   ```

### Option 2: Docker Deployment

1. **Clone and navigate to project**
   ```bash
   git clone <repository-url>
   cd url
   ```

2. **Create environment file**
   ```bash
   # Create .env file in backend directory
   echo "PORT=3001
   MONGODB_URI=mongodb://mongodb:27017/urlshortener
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production" > backend/.env
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

## 🌐 API Endpoints

### Authentication Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/check` - Check authentication status

### URL Endpoints
- `POST /new` - Create short URL
- `GET /:shortId` - Redirect to original URL
- `GET /analytics/:shortId` - Get URL analytics

### Request/Response Examples

#### Create Short URL
```bash
POST /new
Content-Type: application/json

{
  "url": "https://example.com/very-long-url"
}
```

Response:
```json
{
  "id": "abc12345",
  "shortUrl": "http://localhost:3001/abc12345",
  "originalUrl": "https://example.com/very-long-url"
}
```

#### User Registration
```bash
POST /auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## 🎨 Frontend Features

### Pages
- **Home**: URL shortening interface
- **Login**: User authentication
- **Signup**: User registration
- **Dashboard**: User's URL management (placeholder)

### Key Functions
- Real-time URL validation
- One-click URL copying
- Responsive notifications
- Session management
- Form validation

## 🧪 Testing

Run the test suite:
```bash
cd backend
npm test
```

## 🐳 Docker Configuration

### Backend Container
- **Base Image**: node:20-alpine
- **Port**: 3001
- **Dependencies**: Auto-installed from package.json

### Frontend Container
- **Base Image**: nginx:alpine
- **Port**: 80 (mapped to 5500)
- **Static Files**: Served via Nginx

## 🔧 Configuration

### Environment Variables
- `PORT`: Backend server port (default: 3001)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

### CORS Configuration
- **Origin**: http://localhost:5500
- **Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Credentials**: Enabled for cookie support

## 📊 Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  fullName: String (required),
  password: String (required, min 6 chars),
  timestamps: true
}
```

### URL Model
```javascript
{
  shortId: String (unique, required),
  redirectUrl: String (required),
  visitHistory: [{
    timestamp: Number
  }],
  timestamps: true
}
```

## 🚀 Deployment

### Production Considerations
1. **Environment Variables**: Set secure JWT secrets
2. **Database**: Use MongoDB Atlas or managed database
3. **HTTPS**: Configure SSL certificates
4. **CORS**: Update origins for production domains
5. **Error Handling**: Implement proper logging
6. **Monitoring**: Add health checks and metrics

### Docker Production
```bash
# Build and run in production mode
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Siddhesh Kabra**
- GitHub: [@siddheshkabra](https://github.com/siddheshkabra)

## 🔮 Future Enhancements

- [ ] User-specific URL management
- [ ] Custom short URL aliases
- [ ] Advanced analytics dashboard
- [ ] URL expiration dates
- [ ] Bulk URL operations
- [ ] API rate limiting
- [ ] URL categorization
- [ ] QR code generation
- [ ] Social media integration
- [ ] Admin panel

## 🐛 Known Issues

- User-specific URL management is not fully implemented
- Dashboard functionality is placeholder
- No URL deletion functionality
- Limited error handling in some edge cases

## 📞 Support

For support, email support@quicklink.com or create an issue in the repository.

---

**QuickLink** - Making URLs shorter, one click at a time! 🚀