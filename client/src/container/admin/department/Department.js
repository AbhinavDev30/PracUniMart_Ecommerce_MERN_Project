import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../component/Header";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../navigation/Routes";
//query string ke liye hame hook banana padega

function Department() {
  const queryParam = useQuery();
  const [departmentId, setDepartmentId] = useState(null);
  const [department, setDepartment] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: false,
    universityId: queryParam.get("id"),
  });

  function useQuery() {
    const { search } = useLocation();
    //esme URL kai parameter ate hai
    return useMemo(() => {
      return new URLSearchParams(search);
      //URLSearchParams kai through us parameter ko handel kar sakte hai
    }, [search]);
  }

  function getAll() {
    fetch(
      "http://localhost:8000/department?universityId=" + queryParam.get("id")
    )
      .then((res) => {
        return res.json(); // Convert the response body to JSON
      })
      .then((data) => {
        console.log("This is admin department", data);
        console.log("This is admin ", data.depData);
        setDepartment(data.depData); // Assuming data is an array inside 'depData'
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getAll();
  }, []);

  const [formError, setFormError] = useState({
    name: "",
    image: false,
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  function saveDepartment() {
    console.log("saveDepartment");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("universityId", queryParam.get("id"));

    if (form.image instanceof File) {
      formData.append("image", form.image, form.image.name);
    }

    fetch("http://localhost:8000/department", {
      method: "POST",

      body: formData,
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        if (data.message) {
          alert("Data saved successfully");
          // getAll();s
          // resetForm();
        } else {
          console.log("Failed to save data");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function UpdateDepartment() {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("universityId", queryParam.get("id"));

    if (form.image instanceof File) {
      formData.append("image", form.image, form.image.name);
    }
    formData.append("id", departmentId);

    fetch(`http://localhost:8000/department`, {
      method: "PUT", // Use PUT instead of POST
      body: formData,
    })
      .then((res) => {
        alert("Data Updated successfully");
        // getAll();
        // resetForm();
      })
      .catch((err) => {
        console.log("Failed to update data", err);
      });
  }
  function onDepartmentSubmit() {
    let errors = false;
    let error = { name: "", image: false };

    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Enter Valid name" };
    }

    // Check if form.image is not an instance of File
    if (form.image == null) {
      errors = true;
      error = { ...error, image: "Select a valid image" };
    }
    if (errors) {
      setFormError(error);
    } else {
      departmentId ? UpdateDepartment() : saveDepartment();
    }
  }

  //Delete

  function deleteDepartment(id) {
    let ans = window.confirm("Are you sure you want to delete this department");
    if (!ans) {
      return;
    } else {
      fetch("http://localhost:8000/department", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json()) // Parse the response as JSON
        .then((data) => {
          if (data.message) {
            alert("Data deleted successfully");
            // getAll();
            // resetForm();
          } else {
            console.log("Failed to delete data");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }

  return (
    <>
      <Header />
      {/* <h1 className="text-center">Department Page</h1> */}
      <div className="row p-2 m-2 d-flex justify-content-center">
        <div className="card text-center">
          <div className="card-header bg-info text-white">
            {departmentId ? "Edit Department" : "New Department"}
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">University Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  disabled
                  value={queryParam.get("name")}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Department Image</label>
              <div className="col-lg-8">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setForm({ ...form, image: file });
                  }}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
          </div>

          {departmentId ? (
            <button
              className="btn btn-info"
              onClick={() => {
                onDepartmentSubmit();
              }}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-info"
              onClick={() => {
                onDepartmentSubmit();
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <div className="border p-2 m-2">
        <table className="table table-striped table-bordred table-active">
          <thead>
            <tr>
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add Product</th>
              <th>Edit </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {department.map((data) => (
              <tr key={data._id}>
                <td>
                  {data.image ? (
                    <img
                      src={`http://localhost:8000/${data.image}`}
                      height="150"
                      width="150"
                      alt=""
                    />
                  ) : (
                    <span>No Image Available</span>
                  )}
                </td>
                <td>{data.name}</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(
                        ROUTES.productAdmin.name +
                          "?id=" +
                          data._id +
                          "&name=" +
                          data.name
                      );
                    }}
                    className="btn btn-info"
                  >
                    Add Product
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setDepartmentId(data._id);
                      setForm({ ...form, name: data.name });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteDepartment(data._id);
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

export default Department;
