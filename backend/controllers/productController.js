import Product from "../models/product.js";
import uploadOnCloudinary from "../config/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await uploadOnCloudinary(item.path);
        return result;
      })
    );
    const finalImageUrls = imagesURL
      .filter((item) => item !== null)
      .map((item) => item.secure_url);

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? "true" : "false",
      image: finalImageUrls,
      date: new Date(Date.now()),
    });

    return res.status(200).json({
      product,
      message: "Product added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      return res.status(404).json({
        message: "Products not Found.",
      });
    }

    return res.status(200).json({
      products,
      message: "Product Fetched Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(401).json({
        message: "ProductId is required.",
      });
    }
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(401).json({
        product,
        message: "product not found.",
      });
    }

    return res.status(200).json({
      product,
      message: "Product Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(401).json({
        message: "Product Id is required.",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(401).json({
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      product,
      message: "product fetched Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error.message,
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
