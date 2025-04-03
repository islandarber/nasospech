import { Aboutme } from "../views/Aboutme";
import { Contact } from "../views/Contact";
import { Home } from "../views/Home";
import { Projects } from "../views/Projects";
import { Admin } from "../views/Admin";
import { AdminLogin } from "../views/AdminLogin";
import { CategoryProjects } from "../views/CategoryProjects";

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/aboutme", element: <Aboutme /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:categoryId", element: <CategoryProjects /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin/login", element: <AdminLogin /> },
]

export const privateRoutes = [
  { path: "/admin/dashboard", element: <Admin /> },
]