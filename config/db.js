const dns = require('dns');
const mongoose = require('mongoose');

// Some local DNS resolvers block SRV lookups required by mongodb+srv URIs.
// Force public DNS servers that support SRV queries before connecting.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
    }
};

module.exports = connectDB;