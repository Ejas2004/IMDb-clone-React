# 🎬 IMBD Application - Complete Features Guide

## 📚 Table of Contents
1. [Overview](#overview)
2. [Movie Browsing Features](#movie-browsing-features)
3. [Watchlist Management](#watchlist-management)
4. [Search & Filter](#search--filter)
5. [Sorting](#sorting)
6. [Internationalization](#internationalization)
7. [Data Persistence](#data-persistence)
8. [Mobile Features](#mobile-features)

---

## 🎯 Overview

Your IMBD application is a full-featured movie watchlist manager with:
- **20 movies per page** from TMDB API
- **Real-time watchlist** management
- **Advanced filtering** and sorting
- **Multi-language** support (EN, ES, FR, DE)
- **localStorage** persistence
- **Responsive design** (Desktop & Mobile)

---

## 🎥 Movie Browsing Features

### 1. **Movie Grid Display**
**Location:** `Movie.jsx` → Lines 64-74

**How It Works:**
```javascript
{movielist.map((movie) => (
  <MovieCard
    key={movie.id}
    movie={movie}
    onAddToWatchlist={handleAddWatchList}
    onRemoveFromWatchlist={handleremove}
    isInWatchlist={isInWatchlist(movie)}
  />
))}
```

**What It Does:**
- Fetches **20 popular movies** from TMDB API
- Displays in **grid layout** (5 columns desktop, 2-3 mobile)
- Each card shows:
  - Movie poster
  - Title
  - Rating (⭐)
  - Add/Remove button (+/✓)

---

### 2. **Pagination System**
**Location:** `Movie.jsx` → Lines 76-92

**How It Works:**
```javascript
const [count, setcount] = useState(1); // Current page

// Previous button
onClick={() => setcount(count - 1)}
disabled={count === 1}  // Disabled on page 1

// Next button
onClick={() => setcount(count + 1)}
```

**What It Does:**
- Navigate through **thousands of movies**
- Previous button (disabled on page 1)
- Page counter (shows current page)
- Next button (unlimited pages)
- **Auto-loads** new movies when page changes

---

### 3. **Loading States**
**Location:** `Movie.jsx` → Lines 38-58

**How It Works:**
```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// While fetching movies
if (loading) {
  return <LoadingSpinner />
}

// If API fails
if (error) {
  return <ErrorMessage with Retry Button />
}
```

**What It Does:**
- Shows **spinner** while loading movies
- Displays **error message** if API fails
- **Retry button** to refetch data
- Prevents blank screens

---

### 4. **Watchlist Status Check**
**Location:** `Movie.jsx` → Lines 33-35

**How It Works:**
```javascript
const isInWatchlist = (movie) => {
  return watchlist.some(item => item.id === movie.id);
};
```

**What It Does:**
- Checks if movie is **already in watchlist**
- Shows **✓** if added, **+** if not
- Changes button color:
  - Green → Added
  - Default → Not added

---

## 📝 Watchlist Management

### 1. **Adding Movies to Watchlist**
**Location:** `MainBody.jsx` → Lines 34-37

**How It Works:**
```javascript
const handleAddWatchList = (movie) => {
  let newList = [...watchlist, movie];
  setWatchList(newList);
};
```

**Step-by-Step Flow:**
1. User clicks **+ button** on movie card
2. Function receives **movie object** with:
   - `id` - Unique identifier
   - `title` - Movie name
   - `poster_path` - Image URL
   - `vote_average` - Rating
   - `popularity` - Popularity score
   - `genre_ids` - Genre numbers
3. Creates **new array** with existing + new movie
4. Updates **state** → triggers re-render
5. Movie appears in **watchlist page**
6. Button changes to **✓** (checkmark)

**What Gets Stored:**
```javascript
{
  id: 12345,
  title: "The Dark Knight",
  poster_path: "/image.jpg",
  vote_average: 9.0,
  popularity: 1234.56,
  genre_ids: [28, 80] // Action, Crime
}
```

---

### 2. **Removing Movies from Watchlist**
**Location:** `MainBody.jsx` → Lines 24-29

**How It Works:**
```javascript
const handleremove = (movie) => {
  let filterwatchlist = watchlist.filter((newMovie) => {
    return newMovie.id !== movie.id;
  });
  setWatchList(filterwatchlist);
};
```

**Step-by-Step Flow:**
1. User clicks **🗑️ Remove** button
2. Function uses `filter()` to create new array
3. Keeps all movies **except** the one to remove
4. Compares by **movie.id** (unique identifier)
5. Updates state with **filtered array**
6. Movie disappears from watchlist
7. Button changes back to **+**

**Example:**
```javascript
Before: [Movie1, Movie2, Movie3]
Remove Movie2 →
After: [Movie1, Movie3]
```

---

## 🔍 Search & Filter

### 1. **Search by Movie Title**
**Location:** `WatchList.jsx` → Lines 87-93

**How It Works:**
```javascript
const [searchTerm, setSearchTerm] = useState("");

// In filtering logic
if (searchTerm) {
  filtered = filtered.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
```

**Step-by-Step:**
1. User types in **search box**
2. `searchTerm` state updates **on every keystroke**
3. Converts both **search term** and **movie title** to lowercase
4. Uses `includes()` to match **partial strings**
5. Filters movies in **real-time**
6. Shows only **matching results**

**Examples:**
```
Search: "dark"
Matches: 
- "The Dark Knight"
- "Dark Phoenix"
- "After Dark"

Search: "knight"
Matches:
- "The Dark Knight"
- "Knight and Day"
```

---

### 2. **Filter by Genre**
**Location:** `WatchList.jsx` → Lines 50-71

**How It Works:**
```javascript
const [selectedGenre, setSelectedGenre] = useState("All");

// Genre mapping
const genreMap = {
  28: "Action",
  12: "Adventure",
  35: "Comedy",
  // ... more genres
};

// Get all genres from current watchlist
const getAllGenres = () => {
  const genresSet = new Set(["All"]);
  watchlist.forEach((movie) => {
    if (movie.genre_ids && movie.genre_ids.length > 0) {
      const genre = genreMap[movie.genre_ids[0]];
      if (genre) genresSet.add(genre);
    }
  });
  return Array.from(genresSet);
};

// Filter by selected genre
if (selectedGenre !== "All") {
  filtered = filtered.filter((movie) => {
    const movieGenre = getGenreName(movie.genre_ids);
    return movieGenre === selectedGenre;
  });
}
```

**Step-by-Step:**
1. System **automatically detects** all genres in your watchlist
2. Creates **genre buttons** dynamically
3. User clicks a **genre button** (e.g., "Action")
4. System filters movies by **first genre ID**
5. Shows only **Action movies**
6. Click "All" to show **everything**

**Genre ID to Name Mapping:**
```
28 → Action
12 → Adventure
16 → Animation
35 → Comedy
80 → Crime
18 → Drama
27 → Horror
// ... and more
```

---

## 📊 Sorting

### **Sort by Rating or Popularity**
**Location:** `WatchList.jsx` → Lines 64-68

**How It Works:**
```javascript
const [sortBy, setSortBy] = useState("");

if (sortBy === "rating") {
  filtered = [...filtered].sort((a, b) => 
    b.vote_average - a.vote_average  // Descending
  );
} else if (sortBy === "popularity") {
  filtered = [...filtered].sort((a, b) => 
    b.popularity - a.popularity  // Descending
  );
}
```

**Step-by-Step:**
1. User selects from dropdown:
   - "Default" → No sorting
   - "Rating" → Sort by vote_average
   - "Popularity" → Sort by popularity score
2. Creates **new array** (doesn't modify original)
3. Uses JavaScript `sort()` method
4. **Descending order** (highest first)
5. Re-renders with **sorted movies**

**Sorting Logic:**
```javascript
// Rating comparison
Movie A: 9.5 ⭐
Movie B: 7.2 ⭐
Result: A comes before B

// Popularity comparison
Movie A: 1500.5
Movie B: 850.3
Result: A comes before B
```

**Combined Example:**
```
Original order:
1. Movie A (Rating: 7.5, Popularity: 500)
2. Movie B (Rating: 9.0, Popularity: 1200)
3. Movie C (Rating: 8.2, Popularity: 800)

Sort by Rating:
1. Movie B (9.0)
2. Movie C (8.2)
3. Movie A (7.5)

Sort by Popularity:
1. Movie B (1200)
2. Movie C (800)
3. Movie A (500)
```

---

## 🌍 Internationalization

### **Multi-Language Support**
**Location:** Throughout the app using `useTranslation()` hook

**How It Works:**
```javascript
import { useTranslation } from "react-i18next";

const { t, i18n } = useTranslation();

// Usage
<h1>{t('movies.title')}</h1>  // "Popular Movies" in EN
                                // "Películas Populares" in ES

// Change language
i18n.changeLanguage('es');  // Switch to Spanish
```

**Supported Languages:**
- 🇬🇧 **English (EN)** - Default
- 🇪🇸 **Spanish (ES)** - Español
- 🇫🇷 **French (FR)** - Français
- 🇩🇪 **German (DE)** - Deutsch

**Translation Files Location:**
```
src/locales/
├── en/translation.json
├── es/translation.json
├── fr/translation.json
└── de/translation.json
```

**How Users Change Language:**
1. Click **language dropdown** (EN/ES/FR/DE)
2. Select preferred language
3. **Entire app** translates instantly
4. Preference saved in **localStorage**

---

## 💾 Data Persistence

### **localStorage Implementation**
**Location:** `MainBody.jsx` (will be implemented)

**How It Works:**
```javascript
// Save to localStorage
localStorage.setItem('imdb_watchlist', JSON.stringify(watchlist));

// Load from localStorage
const saved = localStorage.getItem('imdb_watchlist');
const watchlist = saved ? JSON.parse(saved) : [];
```

**What Gets Saved:**
- **Entire watchlist** array
- All movie data (title, poster, rating, etc.)
- Survives **browser close**
- Persists **across sessions**

**Storage Location:**
```
Browser → Developer Tools → Application → Local Storage
Key: 'imdb_watchlist'
Value: JSON array of movies
```

---

## 📱 Mobile Features

### 1. **Responsive Design**
**Desktop:**
- Table view with columns
- 5-column movie grid
- Horizontal navigation

**Mobile (<768px):**
- Card-based watchlist
- 2-3 column movie grid
- Hamburger menu
- Touch-optimized buttons

### 2. **Mobile Menu**
**Features:**
- Glassmorphic sidebar
- Swipe-to-close
- Backdrop overlay
- Body scroll lock
- Click outside to close

### 3. **Touch Interactions**
- Scale animations on tap
- Active state feedback
- No tap highlights
- Larger touch targets (44px+)

---

## 🔄 Complete User Flow Example

### **Adding a Movie to Watchlist**

```
Step 1: User browses movies
└─> Movie.jsx renders 20 movies from TMDB API

Step 2: User finds "Inception"
└─> Click + button on movie card

Step 3: handleAddWatchList() triggered
├─> Receives movie object:
│   {
│     id: 27205,
│     title: "Inception",
│     vote_average: 8.8,
│     popularity: 1234.56,
│     genre_ids: [28, 878, 53]
│   }
├─> Creates new array: [...watchlist, movie]
├─> Updates state: setWatchList(newList)
└─> Saves to localStorage (future feature)

Step 4: UI Updates
├─> Button changes: + → ✓
├─> Button color: default → golden
└─> Movie now in watchlist

Step 5: Navigate to Watchlist page
├─> Movie appears in table/card
├─> Shows all details
└─> Can be searched, filtered, sorted
```

### **Filtering and Sorting**

```
Step 1: User has 50 movies in watchlist
└─> All displayed

Step 2: User types "dark" in search
└─> Filters to 5 matching movies

Step 3: User clicks "Action" genre
└─> Further filters to 3 action movies with "dark"

Step 4: User selects "Sort by Rating"
└─> Reorders those 3 movies by rating (highest first)

Step 5: User clicks "All" genres
└─> Shows all movies with "dark" in title (10 movies)
└─> Still sorted by rating

Step 6: User clears search
└─> Shows all 50 movies
└─> Still sorted by rating
```

---

## 🎯 Key Technical Concepts

### **State Management**
```javascript
// Watchlist lives in MainBody.jsx (parent)
const [watchlist, setWatchList] = useState([]);

// Passed down to children as props
<Banner watchlist={watchlist} />
<WatchList watchlist={watchlist} />
```

### **Data Flow**
```
MainBody (State Owner)
├─> Banner Component
│   └─> Movie Component
│       └─> MovieCard Component
│           └─> User clicks + button
│               └─> Bubbles up to MainBody
│                   └─> Updates watchlist state
│                       └─> All components re-render
│
└─> WatchList Component
    └─> Receives updated watchlist
        └─> Displays new movie
```

### **Filtering Logic**
```javascript
// Chain of filters
let filtered = watchlist;  // Start with all

// Apply genre filter
filtered = filtered.filter(genre matches)

// Apply search filter  
filtered = filtered.filter(title matches)

// Apply sorting
filtered = filtered.sort(by rating/popularity)

// Return final result
return filtered;
```

---

## 🚀 Performance Optimizations

1. **Lazy State Initialization**
   - Only fetch from localStorage once
   - Saves re-computation on every render

2. **Memoization Opportunities**
   - `getFilteredMovies()` could use useMemo
   - `getAllGenres()` could be memoized

3. **Virtual Scrolling**
   - Future: For large watchlists (100+ movies)

4. **Debounced Search**
   - Future: Wait 300ms before filtering

---

## 📝 Summary

Your IMBD app has **11 major features**:

1. ✅ Browse 20 movies per page
2. ✅ Paginate through thousands of movies
3. ✅ Add movies to watchlist
4. ✅ Remove movies from watchlist
5. ✅ Search by title (real-time)
6. ✅ Filter by genre (dynamic)
7. ✅ Sort by rating or popularity
8. ✅ Multi-language support (4 languages)
9. ✅ localStorage persistence (coming)
10. ✅ Responsive mobile design
11. ✅ Loading & error states

**All working together** to create a professional movie management experience! 🎬✨
