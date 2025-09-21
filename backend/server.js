require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server is running on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Failed to connect to the database. Server did not start.");
        console.error(err);
        process.exit(1);
    });
