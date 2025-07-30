# WellnessFlow Frontend

A modern, responsive React application for the WellnessFlow wellness session management platform. This frontend provides a beautiful user interface for creating, managing, and discovering wellness sessions.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Session Management**: Create, edit, publish, and delete wellness sessions
- **Dashboard**: Browse and discover published wellness sessions from the community
- **Responsive Design**: Beautiful, mobile-first design using Tailwind CSS
- **Real-time Updates**: Auto-save functionality and live status updates
- **Session Editor**: Rich form interface for creating detailed wellness sessions
- **Status Management**: Draft and published session states
- **User Sessions**: Personal session management with filtering and search

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios with custom interceptors
- **State Management**: React Hooks (useState, useEffect)
- **Utilities**: Lodash (debounce for auto-save)
- **Development**: Hot Module Replacement (HMR)

## 📁 Project Structure

```
WellnessFlow_Frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx              # Navigation component
│   ├── pages/
│   │   ├── Dashboard.jsx           # Public sessions discovery
│   │   ├── Login.jsx               # User authentication
│   │   ├── MySessions.jsx          # Personal session management
│   │   ├── Register.jsx            # User registration
│   │   └── SessionEditor.jsx       # Session creation/editing
│   ├── services/
│   │   └── axiosInstance.js        # HTTP client configuration
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # Application entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd WellnessFlow_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Ensure your backend API is running on `http://localhost:8080`
   - The frontend expects these API endpoints:
     - `POST /api/auth/login`
     - `POST /api/auth/register`
     - `GET /api/sessions` (public sessions)
     - `GET /api/my-sessions` (user's sessions)
     - `POST /api/my-sessions/save-draft`
     - `POST /api/my-sessions/publish`
     - `PUT /api/my-sessions/{id}`
     - `DELETE /api/my-sessions/{id}`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3001` (or the port shown in terminal)

## 🎯 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if ESLint is configured)
npm run lint
```

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with wellness-themed colors:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wellness: {
          50: '#f0fdf4',
          100: '#dcfce7',
          // ... more wellness colors
        }
      }
    }
  }
}
```

### API Configuration

HTTP client is configured in `src/services/axiosInstance.js`:

```javascript
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## 📱 Pages & Components

### Authentication
- **Login** (`/login`): User authentication with email/password
- **Register** (`/register`): New user registration

### Main Application
- **Dashboard** (`/dashboard`): Browse all published wellness sessions
- **My Sessions** (`/my-sessions`): Manage personal sessions (drafts and published)
- **Session Editor** (`/editor/:id?`): Create new sessions or edit existing ones

### Navigation
- **Navbar**: Responsive navigation with user authentication state
- **Protected Routes**: Automatic redirection based on authentication status

## 🔐 Authentication

The app uses JWT token-based authentication:

- Tokens are stored in `localStorage`
- Automatic token attachment to API requests via Axios interceptors
- Automatic logout on token expiration
- Protected routes redirect unauthenticated users

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Spinners and loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages for user actions
- **Auto-save**: Real-time saving of session drafts
- **Status Indicators**: Visual badges for draft/published states
- **Form Validation**: Client-side validation with error display

## 🔄 Session Management

### Session States
- **Draft**: Private sessions visible only to the creator
- **Published**: Public sessions visible to all users

### Features
- Create new wellness sessions with title, description, tags, and data URL
- Auto-save functionality while editing
- Publish drafts to make them publicly visible
- Edit existing sessions (only your own)
- View other users' published sessions (read-only)
- Delete sessions with confirmation

## 🌐 API Integration

### Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | User authentication |
| POST | `/auth/register` | User registration |
| GET | `/sessions` | Fetch public sessions |
| GET | `/my-sessions` | Fetch user's sessions |
| POST | `/my-sessions/save-draft` | Create/save draft |
| POST | `/my-sessions/publish` | Publish session |
| PUT | `/my-sessions/{id}` | Update session |
| DELETE | `/my-sessions/{id}` | Delete session |

### Error Handling
- Automatic retry for failed requests
- User-friendly error messages
- Console logging for debugging
- Fallback UI states for errors

## 🚀 Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - The `dist/` folder contains the production-ready files
   - Deploy to any static hosting service (Netlify, Vercel, AWS S3, etc.)
   - Ensure API endpoints are accessible from your production domain

## 🔧 Development

### Hot Module Replacement (HMR)
The development server supports HMR for instant updates during development.

### Debugging
- Browser DevTools integration
- Console logging for API requests/responses
- React DevTools support

### Code Organization
- Components are organized by feature
- Shared utilities in `services/`
- Consistent naming conventions
- Modular CSS with Tailwind classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Vite will automatically try another port
   # Check the terminal output for the actual port
   ```

2. **API connection issues**
   ```bash
   # Ensure backend is running on localhost:8080
   # Check CORS settings in backend
   # Verify API endpoints in axiosInstance.js
   ```

3. **Build failures**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Styling issues**
   ```bash
   # Rebuild Tailwind CSS
   npm run build
   ```

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the troubleshooting section above

---

Built with ❤️ for wellness and mindfulness communities.
