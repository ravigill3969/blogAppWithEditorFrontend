import { BrowserRouter, Routes, Route } from "react-router-dom"; // Note the corrected import for react-router-dom

import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogPage from "./pages/BlogPage";
import WriteBlog from "./pages/WriteBlog";
import CategoriesForBlog from "./pages/CategoriesForBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBlog from "./pages/MyBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/category"
            element={
              <Layout>
                <CategoriesForBlog />
              </Layout>
            }
          />
          <Route
            path="/my-blog"
            element={
              <Layout>
                <MyBlog />
              </Layout>
            }
          />
          <Route
            path="/write-blog"
            element={
              <Layout>
                <WriteBlog />
              </Layout>
            }
          />
          <Route
            path="/read/:id"
            element={
              <Layout>
                <BlogPage />
              </Layout>
            }
          />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
