import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mainRoute from './routes/index.routes'
import dotenv from "dotenv"

type Bindings = {
  Bindings: {
    HYPERDRIVE: {
      connectionString: string
    }
    DATABASE_URL: string
    FRONTEND_URL: string
  }
}
dotenv.config();

const app = new Hono<{ Bindings: Bindings }>()


app.use('/api/*', async (c, next) => {
  const corsMiddleware = cors({
    origin: [c.env.Bindings.FRONTEND_URL],
    credentials: true
  })
  return corsMiddleware(c, next)
})

app.route('/api', mainRoute)

app.get('/', (c) => c.json({ status: 200, message: 'Backend is running properly ...' }))

export default app
