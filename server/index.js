import mongoose from "mongoose"; //For database
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import express from "express";
import {
  CreateUniversity,
  DeleteUniversity,
  GetUniversity,
  UpdateUniversity,
} from "./controller/University.js";
import {
  CreateDepartment,
  DeleteDepartment,
  UpdateDepartment,
  getDepartment,
  getDepartmentByUniversityId,
} from "./controller/Department.js";
import {
  CreateProduct,
  DeleteProduct,
  GetProductsByDepartmentId,
  ProductDetails,
  UpdateProduct,
  UpdateProductQty,
} from "./controller/Product.js";
import { Login, Register } from "./controller/User.js";
import {
  CreateCart,
  GetProductsByUserId,
  deleteCartProduct,
} from "./controller/Cart.js";
//eske bina aap .env file access nahi kar paoge.
dotenv.config();
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

//University Model
const storageUniv = multer.diskStorage({
  destination: "uploadsUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadsUniv = multer({
  storage: storageUniv,
});

app.post("/university", uploadsUniv.single("image"), CreateUniversity);
app.put("/university", uploadsUniv.single("image"), UpdateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", GetUniversity);

//Department Model

const storageDept = multer.diskStorage({
  destination: "uploadsDept/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadsDept = multer({
  storage: storageDept,
});

app.post("/department", uploadsDept.single("image"), CreateDepartment);
app.put("/department", uploadsDept.single("image"), UpdateDepartment);
app.delete("/department", DeleteDepartment);
app.get("/department", getDepartmentByUniversityId);
// app.get("/department", getDepartment);

//Product Model

const storageProd = multer.diskStorage({
  destination: "uploadsProd/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadsProd = multer({
  storage: storageProd,
});

app.post("/product", uploadsProd.array("images"), CreateProduct);
app.put("/product", uploadsProd.array("images"), UpdateProduct);
app.delete("/product", DeleteProduct);
app.get("/product", GetProductsByDepartmentId);
app.get("/productDetails", ProductDetails);
app.put("/updateProductQuantity", UpdateProductQty);

//Cart Model
app.post("/cart", CreateCart);
app.get("/cart", GetProductsByUserId);
app.delete("/cart", deleteCartProduct);

//User Model
// const storageProf = multer.diskStorage({
//   destination: "uploadsProf/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}--${file.originalname}`);
//   },
// });

// const uploadsProf = multer({
//   storage: storageProf,
// });

app.post("/register", Register);
// uploadsProf.single("profilePic"),
app.post("/login", Login);

// Image Access

app.use(express.static("uploadsUniv/"));
app.use(express.static("uploadsDept/"));
app.use(express.static("uploadsProd/"));

//Aab ham database connect karenge
mongoose
  .connect("mongodb://localhost:27017/Db_EcomProj?directConnection=true")
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log("Database connection error", e);
  });
