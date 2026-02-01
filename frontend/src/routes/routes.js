import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import List from "../pages/list/list";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/list/:id",
		element: <List />,
	},
]);

export default router;