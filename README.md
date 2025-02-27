# Student Search Application

A full-stack application featuring a search bar with lazy loading functionality for searching student records.

## Features

- Real-time search with lazy loading (triggers after 3 characters)
- Debounced search to optimize performance
- Case-insensitive search
- Highlighted search matches in results
- Responsive design for mobile and desktop
- RESTful API backend serving student data

## Tech Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express
- Data Storage: Local JSON file

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `data` folder and place your `students.json` file inside it.

4. Start the server:
```bash
npm start
```

The server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will run on http://localhost:3000

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   └── data/
│   │       └── students.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   └── Students.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Component Structure

### App.js
The main application component that:
- Sets up the basic layout
- Handles routing (if needed)
- Imports and renders the Students component

### Students.jsx
The core search functionality component that:
- Manages search state
- Handles API calls
- Renders search input and results
- Displays selected student details
- Implements debouncing and lazy loading

## API Endpoints

### GET /api/students/search

Search for students based on a query string.

**Query Parameters:**
- `query` (required): Search string (minimum 3 characters)

**Response:**
```json
[
  {
    "name": "John Doe",
    "class": "12A",
    "rollNumber": "12345"
  }
]
```

## Performance Optimizations

1. Debounced search to prevent excessive API calls
2. Lazy loading - search only triggers after 3 characters
3. Limited to 5 results per search
4. Client-side caching of search results

## Edge Cases Handled

- Case-insensitive search
- Similar name prefixes
- Special characters in names
- Duplicate names with different roll numbers
- Empty search results
- Error handling for API failures

## Code Organization

The project follows a component-based architecture:
- `App.js` serves as the main container
- `Students.jsx` contains all search-related logic and UI
- Separation of concerns between frontend components and backend API
- Clean code structure with proper state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request