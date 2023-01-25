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

        console.log(req.query.idUser)

        const movies = await db
            .collection("users")
            .find(
                { _id : new ObjectId(req.query.idUser+ "")},
            )    
            .toArray()

        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}