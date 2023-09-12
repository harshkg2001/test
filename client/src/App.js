import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./app.scss"
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import About from "./pages/AboutUs/about";
import Transaction from "./transaction";
import Transfer from "./pages/Transfer/Transfer";
import SharePopup from "./pages/share/share";

// Define a layout component for the main structure of the application
const Layout = () => {
  return (
    <div className="app">
      <Navbar />     {/* Render the Navbar component */}
      <Outlet />     {/* Render the content of the current route */}
      <Footer />     {/* Render the Footer component */}
    </div>
  );
};

// Create a router configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",                     // Define the root path
    element: <Layout />,           // Render the Layout component for the root route
    children: [                    // Define child routes within the Layout
      {
        path: "/",                 // Child route path (home)
        element: <Home />,         // Render the Home component
      },
      {
        path: "/products/:id",     // Child route path with dynamic parameter (e.g., /products/1)
        element: <Products />,     // Render the Products component
      },
      {
        path: "/product/:id",      // Another dynamic parameter route (e.g., /product/2)
        element: <Product />,      // Render the Product component
      },
      {
        path: "/transaction",      // Route for transaction
        element: <Transaction />,  // Render the Transaction component
      },
      {
        path: "/transfer",         // Route for transfer
        element: <Transfer />,     // Render the Transfer component
      },
      {
        path: "/share",            // Route for sharing
        element: <SharePopup />,   // Render the SharePopup component
      },
    ],
  },
  {
    path: "/login",                // Route for login
    element: <Login />,            // Render the Login component
  },
  {
    path: "/signup",               // Route for signup
    element: <Signup />,           // Render the Signup component
  },
  {
    path: "/about",                // Route for about page
    element: <About />,            // Render the About component
  },
]);

// Define the main App component that wraps the RouterProvider
function App() {
  return (
    <div>
      <RouterProvider router={router} /> {/* Provide the created router to the application */}
    </div>
  );
}

export default App;
