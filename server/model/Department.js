import mongoose from "mongoose";
//here university is a forigen key.

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "university",
      required: true,
    },
  },
  { timestamps: true }
);

const DepartmentModel = mongoose.model("department", DepartmentSchema);
export default DepartmentModel;
