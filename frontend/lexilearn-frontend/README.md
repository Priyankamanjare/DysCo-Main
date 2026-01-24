# Lexilearn Frontend

## Overview
Lexilearn is a web application designed to enhance learning through interactive flashcards, notes, and various educational tools. This project utilizes React for the frontend and Tailwind CSS for styling.

## Project Structure
```
lexilearn-frontend
├── index.html          # Main HTML document
├── package.json        # NPM configuration file
├── vite.config.js      # Vite configuration file
├── tailwind.config.cjs  # Tailwind CSS configuration
├── postcss.config.cjs  # PostCSS configuration
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore file
├── .env                # Environment variables
├── README.md           # Project documentation
├── public              # Static assets
├── src                 # Source code
│   ├── main.jsx        # Entry point of the React application
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global CSS styles
│   ├── styles          # Additional global styles
│   │   └── globals.css
│   ├── components      # React components
│   │   ├── FlashCards
│   │   │   ├── CardComponent.jsx
│   │   │   ├── CardsContainer.jsx
│   │   │   ├── FlashCards.jsx
│   │   │   └── ObjectDetector.jsx
│   │   ├── Footer
│   │   │   └── Footer.jsx
│   │   ├── Notes
│   │   │   ├── NewNote.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── NotesCard.jsx
│   │   │   ├── NotesContainer.jsx
│   │   │   └── NotesPreview.jsx
│   │   ├── Sidebar
│   │   │   └── Sidebar.jsx
│   │   ├── SpeechToText
│   │   │   └── SpeechToText.jsx
│   │   ├── Summary
│   │   │   └── Summary.jsx
│   │   └── TextToSpeech
│   │       └── TextToSpeech.jsx
│   ├── context         # Context-related files
│   │   └── AuthContext.jsx
│   ├── hooks           # Custom hooks
│   │   └── useAuthContext.jsx
│   └── pages           # Application pages
│       ├── Dashboard
│       │   └── Dashboard.jsx
│       ├── Login
│       │   └── Login.jsx
│       └── Register
│           └── Register.jsx
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd lexilearn-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

### Building for Production
To create a production build, run:
```
npm run build
```

### Tailwind CSS
This project uses Tailwind CSS for styling. Ensure you have the necessary configurations in `tailwind.config.cjs` and `postcss.config.cjs`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.