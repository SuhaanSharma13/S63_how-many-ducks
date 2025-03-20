require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => console.error('❌ Database Connection Error:', err));
db.once('open', () => console.log('✅ Connected to MongoDB'));

// Home Route with DB Status
app.get('/', (req, res) => {
    const status = db.readyState === 1 ? 'Connected' : 'Not Connected';
    res.json({ databaseStatus: status });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
