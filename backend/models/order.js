import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Orders placed'
    },
    payment: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: Boolean,
        required: true,
        default: false
    },
    date:{
        type: Date,
        default: Date.now,
        required:true
    }

})

const Order = mongoose.model('Order', orderSchema); 

export default Order;