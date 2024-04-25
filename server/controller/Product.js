import ProductModel from "../model/Product.js";

export const CreateProduct = async (req, res) => {
  try {
    // const prodData = await ProductModel.create({})
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    const prodData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
      active: req.body.active,
      images: images,
      department: req.body.departmentId,
    });
    if (prodData) {
      res.status(201).send({ message: "Product created successfully" });
    } else {
      res.status(404).send({ error: "Product not created" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    const prodData = await ProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        description: req.body.description,
        qty: req.body.qty,
        price: req.body.price,
        active: req.body.active,
        images: images,
        department: req.body.departmentId,
      },
      { new: true }
    );
    if (prodData) {
      res.status(201).send({ message: "Product updated successfully" });
    } else {
      res.status(404).send({ error: "Product not updated" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const prodData = await ProductModel.deleteOne({ _id: req.body.id });
    if ((prodData.deletedCount = 1)) {
      res.status(201).send({ message: "Product deleted successfully" });
    } else {
      res.status(404).send({ error: "Product not deleted" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const ProductDetails = async (req, res) => {
  try {
    // console.log(req.query.id);
    console.log("Product detai is working");
    const prodData = await ProductModel.findOne({
      _id: req.query.id,
    }).populate({
      path: "department",
      populate: [{ path: "university" }],
    });
    res.status(200).send({ prodData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

// export const GetProductsByDepartmentId = async (req, res) => {
//   try {
//     const prodData = await ProductModel.find({
//       department: req.params.departmentId,
//     }).populate({ path: "department", populate: [{ path: "university" }] });
//     res.status(200).send({ prodData });
//   } catch (e) {
//     res.status(404).send({ error: e?.message });
//   }
// };

export const GetProductsByDepartmentId = async (req, res) => {
  try {
    const prodData = await ProductModel.find({
      department: req.query.departmentId,
    }).populate({ path: "department", populate: [{ path: "university" }] });
    res.status(200).send({ prodData });
    // console.log(prodData);
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateProductQty = async (req, res) => {
  try {
    let productInDb = await ProductModel.findOne({ _id: req.query.id });
    let active = true;
    if (productInDb.qty - req.body?.qty.qty < 0) {
      active = false;
    } else {
      let prodData = await ProductModel.findByIdAndUpdate(
        { _id: req.body.id },
        {
          active: active,
          qty: productInDb?.qty - req.body.qty,
        }
      );
    }

    if (prodData) {
      res.status(201).send({ message: "Product Qty Qty updated successfully" });
    } else {
      res.status(404).send({ error: "Product not updated" });
    }
  } catch (e) {
    req.status(404).send({ error: e?.message });
  }
};
