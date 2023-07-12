const mongoose = require('mongoose')

// connect to database
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = mongoose.connection
        console.log('MongoDB connection established')
        console.log('Host name: ' + con.connection.host)
        console.log('Database name: ' + db.db.databaseName)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB