import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      name: String,
      phone: String,
      email: String,
      message: String,
    },

    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    total: Number,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;