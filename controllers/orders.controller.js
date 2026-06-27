import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    const ordersAdapted = orders.map((order) => ({
  id: order._id,
  buyer: order.buyer,
  items: order.items,
  total: order.total,
  createdAt: order.createdAt,
}));

res.json(ordersAdapted);
  } catch (error) {
    res.status(500).json({
  message: error.message,
});
  }
};

// Obtener una orden por ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Orden no encontrada",
      });
    }

    res.json({
  id: order._id,
  buyer: order.buyer,
  items: order.items,
  total: order.total,
  createdAt: order.createdAt,
});
  } catch (error) {
    res.status(500).json({
  message: error.message,
});
  }
};

// Crear una orden
export const createOrder = async (req, res) => {
  try {
    const { buyer, items, total } = req.body;

    // Verificar stock
    for (const item of items) {
      const product = await Product.findById(item.id);

      if (!product) {
        return res.status(404).json({
          message: `Producto ${item.name} no encontrado`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `No hay stock suficiente para ${product.name}`,
        });
      }
    }

    // Descontar stock
    for (const item of items) {
      const product = await Product.findById(item.id);

      product.stock -= item.quantity;

      await product.save();
    }

    // Crear orden
    const order = await Order.create({
      buyer,
      items,
      total,
    });

    res.status(201).json({
  id: order._id,
  buyer: order.buyer,
  items: order.items,
  total: order.total,
  createdAt: order.createdAt,
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};