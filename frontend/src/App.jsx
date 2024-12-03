import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import {
  Home,
  Books,
  AddBooks,
  Trivia,
  Community,
  Profile,
  Favs,
  MyPosts,
  ConfigProfile,
  Login,
  Register
} from "./pages";
import { Navbar, Error } from "./components";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <AnimatePresence mode='wait'>
        <AuthContextProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/community" element={<Community />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favs" element={<Favs />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/configProfile" element={<ConfigProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        </AuthContextProvider>
      </AnimatePresence>
    </>
  );
}

export default App;
