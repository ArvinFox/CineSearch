# CineSearch 🎬

A modern, interactive movie discovery web application built with React and Vite. Discover movies, search for your favorites, watch trailers, and explore cast information with a beautiful dark/light/system theme interface.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎯 Movie Discovery**: Browse trending, popular, top-rated, and upcoming movies
- **🔍 Real-time Search**: Search for movies with debounced API calls for optimal performance
- **🎬 Trailer Playback**: Watch official trailers directly from YouTube
- **🌙 Theme Modes**: Support for Light, Dark, and System (auto) theme modes with persistent storage
- **👥 Cast Information**: View cast and crew details for each movie
- **📱 Responsive Design**: Fully responsive layout for mobile, tablet, and desktop devices
- **✨ Smooth Animations**: Beautiful transitions and animations using Framer Motion
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **⚡ Fast Performance**: Built with Vite for blazing-fast development and production builds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key (free account at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/CineSearch.git
   cd CineSearch
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Get your TMDB API Key**
   - Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Create a free account or log in
   - Copy your API key

4. **Configure environment variables**
   - Copy the example file:
     ```bash
     cp .env.local.example .env.local
     ```
   - Edit `.env.local` and add your TMDB API key:
     ```
     VITE_TMDB_API_KEY=your_api_key_here
     ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
CineSearch/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Header.jsx     # Navigation header with search
│   │   ├── MovieCard.jsx  # Movie card component
│   │   ├── MovieModal.jsx # Movie details modal
│   │   ├── Footer.jsx     # Footer component
│   │   └── LoadingSpinner.jsx # Loading states
│   ├── pages/            # Page components
│   │   └── HomePage.jsx   # Main page
│   ├── context/          # React Context for state management
│   │   └── ThemeContext.jsx # Theme provider
│   ├── hooks/            # Custom React hooks
│   │   └── useDebounce.js # Debounce hook
│   ├── utils/            # Utility functions
│   │   └── tmdbApi.js    # TMDB API integration
│   ├── styles/           # Global styles
│   │   └── index.css     # Main stylesheet
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── .env.local            # Environment variables (not tracked)
```

## 🛠️ Development

### Available Commands

- **Start development server**

  ```bash
  npm run dev
  ```

- **Build for production**

  ```bash
  npm run build
  ```

- **Preview production build**

  ```bash
  npm run preview
  ```

- **Run linting** (optional)
  ```bash
  npm run lint
  ```

## 🎨 Theme System

CineSearch supports three theme modes:

- **Light Mode** (☀️): Clean, bright interface
- **Dark Mode** (🌙): Eye-friendly dark interface
- **System Mode** (💻): Automatically matches your system preference

Click the theme toggle button in the header to switch between modes. Your preference is saved in localStorage.

## 🔑 API Integration

CineSearch uses the free [TMDB API](https://www.themoviedb.org/settings/api) to fetch:

- Trending movies
- Popular movies
- Top-rated movies
- Upcoming movies
- Movie search
- Movie details (plot, genres, runtime, etc.)
- Cast and crew information
- Trailers and videos

### API Features Used

- GET `/trending/movie/week` - Trending movies
- GET `/search/movie` - Search movies
- GET `/movie/{id}` - Movie details
- GET `/movie/{id}/videos` - Movie trailers
- GET `/movie/popular` - Popular movies
- GET `/movie/top_rated` - Top-rated movies
- GET `/movie/upcoming` - Upcoming movies

## 📦 Dependencies

### Core

- **react** (18.2.0) - UI library
- **react-dom** (18.2.0) - React DOM rendering

### Styling & Animation

- **tailwindcss** (3.3.6) - Utility-first CSS framework
- **framer-motion** (10.16.0) - Animation library

### API & State

- **axios** (1.6.0) - HTTP client
- **react-router-dom** (6.20.0) - Routing (ready for future expansion)

### Build Tools

- **vite** (5.0.0) - Build tool
- **@vitejs/plugin-react** (4.2.0) - React plugin for Vite
- **autoprefixer** (10.4.16) - PostCSS plugin
- **postcss** (8.4.31) - CSS processing

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `VITE_TMDB_API_KEY`
5. Deploy!

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repository name
2. Build and push to GitHub
3. Enable GitHub Pages in repository settings

## 🎯 Future Enhancements

- [ ] Add watchlist/favorites feature
- [ ] Movie recommendations
- [ ] Genre filtering
- [ ] Advanced search filters
- [ ] User ratings and reviews
- [ ] Multiple language support
- [ ] Movie collections and lists
- [ ] Social sharing
- [ ] Progressive Web App (PWA) support

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

- **API**: [TMDB (The Movie Database)](https://www.themoviedb.org/)
- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📧 Contact & Support

If you have questions or issues, please:

- Open an issue on GitHub
- Check the [TMDB API Documentation](https://developer.themoviedb.org/docs)
- Review the code comments

---

**Enjoy discovering movies with CineSearch! 🎬✨**

Made with ❤️ for movie enthusiasts everywhere.
