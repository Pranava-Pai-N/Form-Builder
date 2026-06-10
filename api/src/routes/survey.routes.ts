import { Hono } from 'hono';
import surveyControllers from '../controllers/survey.controllers';

type Bindings = {
    DB : D1Database
}


const surveyRoutes = new Hono<{ Bindings: Bindings }>()


surveyRoutes.get("/",surveyControllers.getUserSurveys);


export default surveyRoutes;