import { Hono } from "hono";
import userRoutes from "./user.routes";
import surveyRoutes from "./survey.routes";

type Bindings = {
    DB : D1Database
}

const mainRoute = new Hono<{ Bindings: Bindings }>()

// User routes
mainRoute.route("/user",userRoutes);

// Survey routes
mainRoute.route("/survey",surveyRoutes);

export default mainRoute;