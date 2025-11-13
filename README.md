# Post Management Application

A full-stack web application for managing posts with name, description, and image. Built with .NET 8.0 backend and Next.js 14 frontend.

## 🚀 Features

### Backend (.NET API)
- RESTful API with CRUD operations
- PostgreSQL database with Entity Framework Core
- Repository pattern and service layer
- FluentValidation for request validation
- AutoMapper for DTO mapping
- Swagger/OpenAPI documentation
- CORS configuration for frontend
- Pagination, search, and sorting

### Frontend (Next.js)
- Modern, responsive UI with Tailwind CSS
- Post list with pagination
- Search posts by name or description
- Sort by name, created date, or updated date
- Create, edit, and delete posts
- Image preview and display
- Form validation
- Loading states and error handling

## 📋 Prerequisites

- .NET 8.0 SDK
- Node.js 18+ and npm
- PostgreSQL 12+ (or use NeonDB for cloud hosting)

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Project
```

2. Update the connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=PostManagementDb;Username=your_username;Password=your_password"
  }
}
```

3. Restore packages and build:
```bash
dotnet restore
dotnet build
```

4. Run the application:
```bash
dotnet run
```

The API will be available at `https://localhost:5001` or `http://localhost:5000`

5. Access Swagger documentation at:
   - `https://localhost:5001/swagger` (HTTPS)
   - `http://localhost:5000/swagger` (HTTP)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Project/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
Project/
├── Controllers/          # API controllers
├── Data/                 # DbContext
├── DTOs/                 # Data transfer objects
├── Mappings/             # AutoMapper profiles
├── Models/               # Entity models
├── Repositories/         # Repository pattern implementation
├── Services/             # Business logic services
├── Validators/           # FluentValidation validators
├── Program.cs            # Application entry point
└── frontend/             # Next.js frontend
    ├── app/              # Next.js app router pages
    ├── components/       # React components
    └── lib/              # API client and utilities
```

## 🔌 API Endpoints

- `GET /api/posts` - Get all posts (with pagination, search, sort)
- `GET /api/posts/{id}` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

### Query Parameters for GET /api/posts:
- `search` - Search term (searches name and description)
- `sortBy` - Sort field (name, createdAt, updatedAt)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

## 🗄️ Database

The application uses PostgreSQL with Entity Framework Core. The database will be created automatically on first run using `EnsureCreated()`.

### Post Model:
- `Id` (Guid) - Primary key
- `Name` (string, max 200) - Required
- `Description` (string, max 2000) - Required
- `ImageUrl` (string, max 500) - Optional
- `CreatedAt` (DateTime) - Auto-set
- `UpdatedAt` (DateTime) - Auto-updated

## 🚢 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `dotnet publish -c Release -o ./publish`
5. Set start command: `dotnet ./publish/Project.dll`
6. Add environment variable: `ConnectionStrings__DefaultConnection` with your NeonDB connection string
7. Add environment variable: `Cors__AllowedOrigins__0` with your Vercel frontend URL

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `Project/frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL` with your Render backend URL
5. Deploy

### Database (NeonDB)
1. Create a new project on NeonDB
2. Copy the connection string
3. Update the connection string in your Render environment variables

## 🧪 Testing

### Backend
```bash
cd Project
dotnet test
```

### Frontend
```bash
cd Project/frontend
npm test
```

## 📝 Environment Variables

### Backend
- `ConnectionStrings__DefaultConnection` - PostgreSQL connection string
- `Cors__AllowedOrigins__0` - Frontend URL for CORS

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check connection string credentials
- Ensure database exists or let EF Core create it

### CORS Issues
- Verify frontend URL is in `Cors:AllowedOrigins` in `appsettings.json`
- Check environment variables in production

### API Not Responding
- Check if backend is running on correct port
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`

## 📄 License

This project is created for educational purposes.

## 👤 Author

Created as part of a web application development project.




