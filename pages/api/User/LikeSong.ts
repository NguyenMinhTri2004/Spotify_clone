import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb"



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    ) {
        try {
        // const setlikedSongs = usePlayMusicStore((state) => state.setLikedSongs)
          
        const client = await clientPromise;
        const db = client.db("Spotify_clone");


        console.log(req.body)
 
        const movies = await db
            .collection("users")
            .updateOne(
                { _id : new ObjectId(req.body.idUser)},
                { $push: { likedSongs: req.body.item } }
            )    
            // .find({_id : new ObjectId(req.body.idUser)})
            // .toArray();
        // setlikedSongs([1,2,3])      
        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}