import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigation/Routes";

// import { useNavigate } from "react-router-dom";

function University() {
  const [universityId, setUniversityId] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [form, setForm] = useState({ name: "", image: undefined });
  const [formError, setFormError] = useState({ name: "", image: "" });
  const navigate = useNavigate(); //dusre page pai jane ke liye
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //esme image bhi hai tho jaise ham postman mai formdata mai bhejte the vaise he yaha bhi bhejna padega.
  function saveUniversity() {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("image", form.image, form.image.name);

    fetch("http://localhost:8000/university", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        alert("Data submitted successfully");
        // Handle any additional logic or UI updates here
        getAll();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to submit data", error);
        // Handle specific errors or show a user-friendly error message
      });
  }

  function updateUniversity() {
    try {
      let formData = new FormData();
      formData.append("name", form.name);
      if (form.image instanceof File) {
        formData.append("image", form.image, form.image.name);
      }
      formData.append("id", universityId);
      console.log(universityId);
      fetch(
        `http://localhost:8000/university/`,

        {
          method: "PUT",
          headers: {
            // "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      ).then((d) => {
        alert("data submitted successfully");
        getAll();
        // resetForm();
      });

      // fetch(`http://localhost:4000/university`);
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   // This effect will be triggered whenever formError changes
  //   // Do any additional logic if needed
  // }, [formError]);

  function onUniversitySubmit() {
    let errors = false;
    let error = { name: "", image: "" };

    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Enter Valid name" };
    }

    if (form.image === null || form.image === undefined) {
      errors = true;
      error = { ...error, image: "Enter Valid image" };
    }

    setFormError(error); // Set form errors here

    if (!errors) {
      universityId ? updateUniversity() : saveUniversity();
    }
  }

  function resetForm() {
    setForm({ name: "", image: "" });
  }

  function getAll() {
    fetch("http://localhost:8000/university")
      .then((response) => response.json())
      .then((res) => {
        console.log("University Imaages", res);
        // console.log(res); // Log the response to see what data you are getting
        // console.log(res);
        setUniversities(res); // Assuming the data is directly in the response
      })
      .catch((error) => {
        console.error("Failed to fetch universities", error);
      });
  }
  useEffect(() => {
    getAll();
  }, []);

  //Delete University
  function deleteUniversity(id) {
    let ans = window.confirm("Are you sure you want to delete");
    if (!ans) return;
    else {
      fetch("http://localhost:8000/university", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => {
          getAll();
        })
        .catch((error) => {
          console.error("Failed to delete university", error);
        });
    }
  }
  return (
    <>
      <Header />

      <div className="row p-2 m-2  d-flex justify-content-center">
        <div className="card text-center max-auto">
          <div className="card-header bg-info text-white">
            {universityId ? "Edit University" : "New University"}
          </div>

          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4" htmlFor="txtname">
                University Name
              </label>
              <div className="col-lg-4">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="University Name"
                  id="fileInput "
                  onChange={changeHandler}
                  value={form.name}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">University Image</label>
              <div className="col-lg-4">
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                  // value={form.image}
                />
                <p className="text-danger">{formError.image}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            {universityId ? (
              <button
                className="btn btn-info"
                onClick={() => {
                  onUniversitySubmit();
                }}
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-info"
                onClick={() => {
                  onUniversitySubmit();
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border p-2 m-2">
        <table className="table table-boadred table-hover table-active">
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((data) => (
              <tr key={data._id}>
                <td>
                  <img
                    src={`http://localhost:8000/${data.image}`}
                    alt=""
                    height="150"
                    width="150"
                  />
                </td>
                <td>{data.name}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      navigate(
                        ROUTES.departmentAdmin.name +
                          "?id=" +
                          data._id +
                          "&name=" +
                          data.name
                      );
                    }}
                  >
                    Add Department
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setUniversityId(data._id);
                      setForm({
                        ...form,
                        name: data.name,
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUniversity(data._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default University;
