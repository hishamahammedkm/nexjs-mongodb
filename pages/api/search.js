import { connectToDatabase } from "../../lib/mongodb"

export default async function search(req,res){
  
    const {db} = await connectToDatabase()
    
    
    const data = await db.collection('listingsAndReviews').aggregate([
        {
            $search: {
                search:{
                    query:req.query.term,
                    path:["name"],
                }
            }
        },
        {
            $project:{
                description:1,
                name:1,
                summary:1
            }
        },
        {
            $limit:1
   
        }
    ]).toArray()
    
    res.json(data)
}