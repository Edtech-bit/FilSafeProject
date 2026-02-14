const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// This connects directly to your Atlas database
const MONGO_URI = "mongodb+srv://castilloed7899:castilloed7899@cluster0.dipyeud.mongodb.net/filsafe_db?retryWrites=true&w=majority&appName=Cluster0";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    
    // 1. Clean up any old attempts
    await User.deleteMany({ username: 'admin' });
    console.log("Cleaned up old admin user.");

    // 2. Hash the password correctly
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // 3. Create the fresh user
    const admin = new User({
      username: 'admin',
      password: hashedPassword
    });

    await admin.save();
    console.log("✅ SUCCESS: Fresh 'admin' user created with password 'admin123'");
    
  } catch (err) {
    console.error("❌ ERROR:", err);
  } finally {
    mongoose.connection.close();
  }
}

run();