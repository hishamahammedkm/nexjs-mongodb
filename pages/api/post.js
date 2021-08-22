import { connectToDatabase } from "../../lib/mongodb"

export default async function post(req,res){
  
    const {db} = await connectToDatabase()
    
    const data = req.query
    const response = await db.collection('post').insertOne(data)
    res.json({status:"ok",response})
}