const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // ✅ Needed for socket.io
const { Server } = require('socket.io');
require('dotenv').config();

// Routes
const tutorRoutes = require('./routes/tutorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const batchRoutes = require('./routes/batchRoutes');
const rideRoutes = require('./routes/rideRoutes');
const authRoutes = require('./routes/authRoutes');
const rideRequestsRoutes = require('./routes/rideRequestsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ STEP 1: Create raw HTTP server
const server = http.createServer(app);

// ✅ STEP 2: Setup Socket.io with that HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React port
    methods: ["GET", "POST"]
  }
});

// ✅ STEP 3: Real-time location logic
let currentTutorLocation = {};

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on("tutorLocation", (data) => {
    currentTutorLocation[data.tutorId] = data;
    io.emit("tutorLocationUpdate", data); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});

// ✅ STEP 4: Middleware & Routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Backend running successfully');
});

app.use('/api/auth', authRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/requestrides', rideRequestsRoutes);

// ✅ STEP 5: MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  // Start both express + socket server
  server.listen(PORT, () => console.log(`🌐 Server: http://localhost:${PORT}`));
}).catch((err) => console.error('❌ Mongo error:', err));
