import React from "react";
import { Link } from "react-router-dom";

function Header() {
  // Replace these with actual user data from props, state, or context
  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
  };

  return (
    <header className="bg-blue-600 text-white ">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        {/* Left Side: Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/register"
            className="text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/commentpage"
            className="text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Comment Page
          </Link>
        </div>

        {/* Right Side: User Info */}
        <div className="flex items-center space-x-4">
          <span className="font-medium">{user.username}</span>
          <span className="text-sm text-gray-200">{user.email}</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;


// import React from 'react'

// export default function Header({ username, email }) {
//   return (
//     <header className="bg-white shadow">
//       <div className="container mx-auto px-4 py-6 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Comment System</h1>
//         {username && email && (
//           <div className="text-sm text-gray-600">
//             Logged in as: <span className="font-semibold">{username}</span> ({email})
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }
