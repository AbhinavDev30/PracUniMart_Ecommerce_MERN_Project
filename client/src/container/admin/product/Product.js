import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../component/Header";
import { useLocation } from "react-router-dom";
// import ErrorBoundary from "./ErrorBoundary";

function Product() {
  const [productId, setProductId] = useState(null);
  const [product, setProducts] = useState([]);
  let queryParam = useQuery();
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    images: "",
    departmentId: queryParam.get("id"),
    description: "",
    qty: 0,
    price: 0,
  });
  const [formError, setFormError] = useState({
    name: "",
    images: "",
    departmentId: queryParam.get("id"),
    description: "",
    qty: null,
    price: null,
  });
  function useQuery() {
    const { search } = useLocation();
    //esme URL kai parameter ate hai
    return useMemo(() => {
      return new URLSearchParams(search);
      //URLSearchParams kai through us parameter ko handel kar sakte hai
    }, [search]);
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function getAll() {
    fetch(`http://localhost:8000/product?departmentId=` + queryParam.get("id"))
      .then((res) => res.json()) // Convert the response to JSON
      .then((res) => {
        console.log(res.prodData);

        setProducts(res.prodData); // Set the state with the JSON data
      })
      .catch((err) => {
        console.error("Data not found", err);
      });
  }

  useEffect(() => {
    getAll();
  }, []);

  //Save Product
  function saveProduct() {
    const formData = new FormData();
    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i], form.images[i].name);
    }
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("qty", form.qty);
    formData.append("departmentId", queryParam.get("id"));

    fetch("http://localhost:8000/product", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to save data. Server returned status: ${res.status}`
          );
        }
        return res.json(); // assuming the response is in JSON format
      })
      .then((data) => {
        alert("Data Saved Success");
        getAll();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to submit data", error);
        alert("Failed to save data. " + error.message);
      });
  }

  //Update Product
  function updateProduct() {
    const formData = new FormData();
    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i], form.images[i].name);
    }
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("qty", form.qty);
    formData.append("departmentId", queryParam.get("id"));
    formData.append("id", productId);

    fetch("http://localhost:8000/product", {
      method: "PUT",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to Update data. Server returned status: ${res.status}`
          );
        }
        return res.json(); // assuming the response is in JSON format
      })
      .then((data) => {
        alert("Data Updated Success");
        getAll();
        resetForm();
      })
      .catch((error) => {
        console.error("Failed to submit data", error);
        alert("Failed to Update data. " + error.message);
      });
  }

  //On Submit

  function onProductSubmit() {
    let errors = false;
    let error = {
      name: "",
      images: "",
      description: "",
      qty: "",
      price: "",
    };
    if (form.name.trim().length === 0) {
      errors = true;
      error = { ...error, name: "Enter Valid name" };
    }
    if (form.description.trim().length === 0) {
      errors = true;
      error = { ...error, description: "Enter Valid description" };
    }
    if (form.qty === "" || form.qty === 0) {
      errors = true;
      error = { ...error, qty: "Enter Valid qty" };
    }
    if (form.price === "" || form.price === 0) {
      errors = true;
      error = { ...error, price: "Enter Valid price" };
    }
    if (form.images == null) {
      errors = true;
      error = { ...error, images: "Enter Valid images" };
    }

    if (errors) {
      setFormError(error);
    } else {
      productId ? updateProduct() : saveProduct();
    }
  }

  //

  function resetForm() {
    setForm({
      name: "",
      images: "",
      departmentId: queryParam.get("id"),
      description: "",
      qty: 0,
      price: 0,
    });
  }

  function deleteProduct(id) {
    let ans = window.confirm("Do you want to delete this product?");
    if (!ans) return;
    else {
      fetch(`http://localhost:8000/product`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            console.log("Failed to delete product");
          } else {
            alert("Product Deleted Successfully");
            getAll();
            resetForm();
          }
        })
        .catch((err) => {
          console.log("Something went wrong while deleting data ", err);
        });
    }
  }
  return (
    <>
      <Header />
      {/* <h1 className="text-center ">Product Page</h1> */}
      <div className="row p-2 m-2 d-flex justify-content-center">
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            {productId ? "Edit Product " : "New Product"}
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-4">Department Name</label>
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
              <label className="col-lg-4">Product Name</label>
              <div className="col-lg-8 ">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p className="text-danger">{formError.name}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Description</label>
              <div className="col-lg-8 ">
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p>{formError.description}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Price</label>
              <div className="col-lg-8 ">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p>{formError.price}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Quantity</label>
              <div className="col-lg-8 ">
                <input
                  type="number"
                  name="qty"
                  value={form.qty}
                  className="form-control"
                  onChange={changeHandler}
                />
                <p>{formError.qty}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4">Product Image</label>
              <div className="col-lg-8 ">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}
                  multiple
                />
                <p>{formError.images}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            {productId ? (
              <button
                className="btn btn-info"
                onClick={() => {
                  onProductSubmit();
                }}
              >
                Update
              </button>
            ) : (
              <button
                className="btn btn-info"
                onClick={() => {
                  onProductSubmit();
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border p-2 m-2">
        <table className="table table-active table-bordred table-stripped">
          <thead>
            <tr>
              <td>Image</td>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
              <td>Qty</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {/* <ErrorBoundary> */}
            {product.map((data) => (
              <tr key={data._id}>
                <td>
                  <img
                    src={`http://localhost:8000/${data.images[0]}`}
                    alt=""
                    height="150"
                    width="150"
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.description}</td>
                <td>{data.price}</td>
                <td>{data.qty}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setProductId(data._id);
                      setForm(data);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteProduct(data._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* </ErrorBoundary> */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Product;
