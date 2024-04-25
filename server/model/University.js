import mongoose from "mongoose";
//Yaha ham scheme create karenge schema is a structure
//2.Ham chahte hai ke es model mai kab data aad hua kab updated hai.//timestamps: true
const UniversitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UniversityModel = mongoose.model("university", UniversitySchema);

export default UniversityModel;
