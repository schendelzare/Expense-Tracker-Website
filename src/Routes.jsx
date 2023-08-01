import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateNewAccount, {
  action as createUserAccount,
} from "./components/createNewAccount";
import DashBoard, { loader as userLoaderData } from "./components/Dashboard";
import AddExpense, {
  action as addExpenseTransaction,
} from "./components/Dashboard/addExpense";
import AddIncomeTransaction, {
  action as addIncomeTransaction,
} from "./components/Dashboard/addIncomeTransaction";
import ErrorHandler from "./components/ErrorHandler";
import HomePage from "./components/HomePage";
import Login from "./components/login";
import ForgotPassword, {
  Action as forgotPasswordAction,
} from "./components/Password/ForgotPassword";
import ResetPassword, {
  action as resetPasswordAction,
} from "./components/Password/ResetPassword";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorHandler />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        children: [
          {
            index: true,
            element: <DashBoard />,
            loader: userLoaderData,
          },
          {
            path: "add-transaction",
            element: <AddIncomeTransaction />,
            action: addIncomeTransaction,
          },
          {
            path: "add-expense",
            element: <AddExpense />,
            action: addExpenseTransaction,
          },
        ],
      },
      {
        path: "create-new-account",
        element: <CreateNewAccount />,
        action: createUserAccount,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        action: resetPasswordAction,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
