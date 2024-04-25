import CartModel from "../model/Cart.js";
export const CreateCart = async (req, res) => {
  console.log(req);
  try {
    let cartData = await CartModel.create({
      user: req.body.userId,
      products: req.body.productId,
    });
    if (cartData) {
      res.status(200).send({ message: "Cart created successfully" });
    } else {
      res.status(404).send({ error: "Cart not created" });
    }
    console.log(cartData);
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetProductsByUserId = async (req, res) => {
  try {
    let cartData = await CartModel.find({
      user: req.query.userid,
    }).populate({ path: "products" });
    res.status(200).send({ cartData });
    console.log(cartData);
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    let cartData = await CartModel.deleteOne({
      _id: req.body.id,
    });
    if (cartData.deletedCount == 1) {
      res.status(200).send({ message: "Cart deleted successfully" });
    } else {
      res.status(404).send({ error: "Cart not deleted" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
