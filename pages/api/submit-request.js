import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise
      const db = client.db("vendor_management")
      const collection = db.collection("requests")
      
      const result = await collection.insertOne(req.body)
      
      res.status(200).json({ message: "Request submitted successfully", id: result.insertedId })
    } catch (e) {
      console.error(e)
      res.status(500).json({ message: "Error submitting request" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}