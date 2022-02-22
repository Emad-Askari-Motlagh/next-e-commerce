/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
import mongoose from "mongoose"
const dbInit = (handler) => async (req, res) => {
  const MONGODB_URI =
    "mongodb+srv://emi:43NA7xtk64CNmlAs@cluster0.sauw6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    )
  }

  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
  }

  async function dbInit() {
    if (cached.conn) {
      return cached.conn
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      }

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose
      })
    }
    cached.conn = await cached.promise
    return cached.conn
  }
  await dbInit()
  return handler(req, res)
}

export default dbInit
