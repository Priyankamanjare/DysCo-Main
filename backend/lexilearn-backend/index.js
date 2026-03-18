const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const summaryRoutes = require('./routes/summaryRoutes');
const textToSpeechRoutes = require('./routes/textToSpeechRoutes');
const speechToTextRoutes = require('./routes/speechToTextRoutes');
const cardRoutes = require('./routes/cardRoutes');
const noteRoutes = require('./routes/noteRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

// 1. Configuration
dotenv.config();
const PORT = process.env.PORT || 8080;

if (!PORT) {
    console.error('Error: PORT is not defined in environment variables');
    process.exit(1);
}

// 2. Initialize App
const app = express();

// 3. Middleware
app.use(express.json());
app.use(cors());

// 4. Routes
app.get("/", async (req, res) => {
    res.send('Welcome to the lexilearn server');
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/summary", summaryRoutes);
app.use("/api/v1/texttospeech", textToSpeechRoutes);
app.use("/api/v1/speechtotext", speechToTextRoutes);
app.use("/api/v1/card", cardRoutes);
app.use("/api/v1/note", noteRoutes);
app.use("/api/v1/lessons", lessonRoutes);

// 5. Connect to DB and Start Server
(async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server started at Port : ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();
