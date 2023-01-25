import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


export const authOptions = {
    providers: [
        FacebookProvider({
            clientId : process.env.FACEBOOK_ID + "",
            clientSecret: process.env.FACEBOOK_SECRET + "",

            profile(profile : any) {
                return  {
                    id: 'customProvider',
                    name: profile.name,
                    email : profile.email,
                    image : profile.picture.data.url,
                    likedSongs : [],
                    likedArtists: [],
                    playLists : []
                }
              },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID + "",
            clientSecret: process.env.GOOGLE_SECRET + "",

            profile(profile) {
                return  {
                    id: 'customProvider',
                    name: profile.name,
                    email : profile.email,
                    picture: profile.picture,
                    likedSongs : [],
                    likedArtists: [],
                }
              },
        }),

      
    ],

    pages : {
        signIn : "/Login"
    },


    callbacks: {

        async jwt({ token, account, profile } : any) {
            if (account) {
              token.accessToken = account.access_token
              token.id = profile.id
              console.log(token.id)
            }
            return token
        },

        async session({ session, token, user}) {
            session = {
                ...session,
                user: {
                    id: user.id,
                    ...session.user
                }
            }
          return session
        }
    },

    adapter: MongoDBAdapter(clientPromise),
  }
  export default NextAuth(authOptions)