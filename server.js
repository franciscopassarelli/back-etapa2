import express from "express";
import cors from "cors";

import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import connectDB from "./config/db.js";

const app = express();

// Conectar a MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Servidor funcionando",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});