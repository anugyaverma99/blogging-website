import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthRoute, GuestRoute, Navbar } from "./components";
import { Article, Auth, Editor, Home, Settings } from "./pages";
import axios from "axios";

function App() {
  useEffect(() => {
    const jwt = window.localStorage.getItem('jwtToken');

    if (jwt) {
      // Set the JWT token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <main className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<GuestRoute />}>
              <Route index element={<Auth key="register" />} />
            </Route>
            <Route path="/login" element={<GuestRoute />}>
              <Route index element={<Auth key="login" />} />
            </Route>
            <Route path="/settings" element={<AuthRoute />}>
              <Route index element={<Settings />} />
            </Route>
            <Route path="/editor" element={<AuthRoute />}>
              <Route index element={<Editor />} />
            </Route>
            <Route path="/editor/:slug" element={<Editor />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/profile/:username" element={<h1>Profile</h1>} />
            <Route path="/@:username" element={<AuthRoute />}>
              <Route index element={<h1>Profile</h1>} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
