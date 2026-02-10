
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const participantSchema = new mongoose.Schema({}, { strict: false, collection: 'participants' });
const Participant = mongoose.model('Participant', participantSchema);

const registrationSchema = new mongoose.Schema({}, { strict: false, collection: 'registrations' });
const Registration = mongoose.model('Registration', registrationSchema);

const checkUser = async () => {
    await connectDB();

    const mahotsavId = 'MH26000504';

    console.log(`Checking user with ID: ${mahotsavId}`);

    const registration = await Registration.findOne({ userId: mahotsavId });
    console.log('Registration Record:', registration);

    const participant = await Participant.findOne({ userId: mahotsavId });
    console.log('Participant Record:', participant);

    if (participant) {
        console.log('Participant Name:', participant.name); // Should be present
        console.log('Participant Email:', participant.email); // Should be present
    }

    process.exit();
};

checkUser();
