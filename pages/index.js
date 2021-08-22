import { connectToDatabase } from '../lib/mongodb'

export default function Home({ isConnected,data }) {
  const post = async(data)=>{
    console.log(data.name);
    const res = await fetch(`http://localhost:3000/api/post?name=${data.name}&new=hisham&place=karulai`)
  }
  return (
    <div className="container">
      {
        isConnected ? <h1>database ok</h1> :<h1>not connected</h1>
      }
      {
        data?.map(item=>{
          return(
            <>
            <h1>{item.name}</h1>
            <button onClick={()=>post(item)}>Book</button>
            </>
          )
        })
      }
       
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client,db } = await connectToDatabase()
  let data =await db.collection('listingsAndReviews').find({}).limit(3).toArray()
  data = JSON.parse(JSON.stringify(data))
  const isConnected = await client.isConnected()
  const filtered = data.map(item=>{
    return {
      name:item.name
    }
  })


  return {
    props: { isConnected,data:filtered},
  }
}
