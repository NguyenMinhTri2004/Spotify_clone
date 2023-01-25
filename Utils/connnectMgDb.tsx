
require('dotenv').config()

import mongoose from 'mongoose'

const URL = process.env.MONGODB_URL || ''

const ConnectMgDb = () => {
    mongoose.connect(URL)
    console.log('Connected to MongoDB')
}

export default ConnectMgDb