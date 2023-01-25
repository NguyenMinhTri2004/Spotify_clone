import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb"



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    ) {
        try {

        const client = await clientPromise;
        const db = client.db("Spotify_clone");

        console.log(req.body)
 
        const movies = await db
            .collection("users")
            .updateOne(
                { 
                    _id : new ObjectId(req.body.idUser),
                    playLists: {
                        $elemMatch: {
                          id: req.body.idPlayList ,
                        }
                      }
                },
                {
                    $push: {
                        'playLists.$.data': req.body.Song 
                    } 
                },
                 
            )     
        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}