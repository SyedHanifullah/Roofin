import PublicLayout from "./Layouts/Public";
import Home from "./pages/Home";
import SignIn from "./AuthLayout/SignIn";
import Dashboard from "./Layouts/Private";
import AuthGuard from "./AuthLayout/AuthGuard";
import Default from "./pages/dashboard/Default";
import Users from "./pages/Students";
import Teachers from "./pages/Teacher";
import Lessons from "./pages/Lessons";
const routes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
    children: [
      {
        element: <Default />,
      },
      {
        path: "/dashboard",
        element: <Default />,
      },
      {
        path: "/students",
        element: <Users />,
      },
      {
        path: "/teachers",
        element: <Teachers />,
      },
      {
        path: "/lessons",
        element: <Lessons />,
      },
    ],
  },
];

export default routes;
