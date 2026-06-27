import Product from "../models/Product.js";
 

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const products = await Product.find(filter);

    const productsAdapted = products.map((product) => ({
      id: product._id,
      name: product.name,
      img: product.img,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
    }));

    res.json(productsAdapted);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
  id: product._id,
  name: product.name,
  img: product.img,
  category: product.category,
  description: product.description,
  price: product.price,
  stock: product.stock,
});
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      id: product._id,
      name: product.name,
      img: product.img,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      id: product._id,
      name: product.name,
      img: product.img,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });

  } catch (error) {
    res.status(500).json(error);
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado correctamente",
    });

  } catch (error) {
    res.status(500).json(error);
  }
};