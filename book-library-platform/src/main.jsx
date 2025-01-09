// Import necessary libraries and components
import React from "react"; // Core React library for building user interfaces
import ReactDOM from "react-dom/client"; // React library for rendering components into the DOM
import App from "./App"; // Main application component
import "./styles.css"; // Importing global styles for the application

// Render the React application into the root DOM node
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap the App component in React.StrictMode for highlighting potential issues in the application */}
    <App />
  </React.StrictMode>
);
