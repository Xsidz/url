import moongoose from "mongoose"


export const connectDB = async ()=>{
try {
 const conn = await moongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10 seconds
})
    console.log(`mongo DB connected: ${conn.connection.host}`)
} catch (error) {
    console.log("MOngoBD connection error" , error)
}
}