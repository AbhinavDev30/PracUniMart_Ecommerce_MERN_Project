import DepartmentModel from "../model/Department.js";

export const CreateDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.create({
      name: req.body.name,
      image: req?.file?.filename,
      university: req.body.universityId,
    });
    if (depData) {
      res.status(200).send({ message: "Department created successfully" });
    } else {
      res.status(404).send({ error: "Department not created" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        image: req?.file?.filename,
        university: req.body.universityId,
      }
    );
    if (depData) {
      res.status(200).send({ message: "Department updated successfully" });
    } else {
      res.status(404).send({ error: "Department not updated" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const DeleteDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.deleteOne({ _id: req.body.id });
    if ((depData.deletedCount = 1)) {
      res.status(200).send({ message: "Department deleted successfully" });
    } else {
      res.status(404).send({ error: "Department not deleted" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.find();
    res.status(200).send(depData);
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const getDepartmentByUniversityId = async (req, res) => {
  try {
    let depData = await DepartmentModel.find({
      university: req.query.universityId,
    }).populate({ path: "university" });
    res.status(200).send({ depData });
    // console.log(depData);
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
