import UniversityModel from "../model/University.js";

export const CreateUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.create({
      name: req.body.name,
      image: req?.file?.filename,
    });
    if (univData) {
      res.status(201).send({ message: "University created successfully" });
    } else {
      res.status(404).send({ error: "University not created" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        image: req?.file?.filename,
      }
    );
    if (univData) {
      res.status(201).send({ message: "University updated successfully" });
    } else {
      res.status(404).send({ error: "University not updated" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const DeleteUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.deleteOne({
      _id: req.body.id,
    });
    if ((univData.deletedCount = 1)) {
      res.status(201).send({ message: "University deleted successfully" });
    } else {
      res.status(404).send({ error: "University not deleted" });
    }
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.find();
    console.log(univData);
    res.status(200).send(univData);
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
