import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Identifier for the counter (e.g., 'invoiceNo')
    sequence_value: { type: Number, required: true } // The current sequence number
});

// Create the Counter model
const Counter = mongoose.model('Counter', counterSchema);

export default Counter;
