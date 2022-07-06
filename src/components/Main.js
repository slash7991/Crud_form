import React, { useState } from "react";
import data from "../mock-data.json";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Main() {

  var index; //to store the id of a record
  const [Persons, setPersons] = useState(data);
  const [formData, setformData] = useState({
    id: "",
    fullName: "",
    age: "",
    dateOfBirth: "",
    gender: "",
  });
  const handleFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...formData };
    newFormData[fieldName] = fieldValue;
    setformData(newFormData);
  };
  const handleNewSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: formData.fullName,
      age: formData.age,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
    };
    if (!formData.fullName) {
      alert("please enter a name");
    } else if (!formData.age) {
      alert("please enter your age");
    } else if (!formData.dateOfBirth) {
      alert("please enter your date of birth");
    } else if (!formData.gender) {
      alert("please enter your gender");
    } else {
      const newPersons = [...Persons, newContact];
      setPersons(newPersons);
      setformData("");
    }
  };
  const saveID = (id) => {
    index = id;
    return index;
  };
  const deleteRecord = () => {
    console.log(index);
    if (!index) {
    } else {
      const newRecords = [...Persons];

      const dIndex = Persons.findIndex((record) => record.id === index);

      newRecords.splice(dIndex, 1);

      setPersons(newRecords);
      index = "";
    }
  };

  return (
    <div className="card position-relative">
      <h5 className="card-header text-white bg-primary">
        Manage <b>Emloyees</b>
        <div className="position-absolute top-0 end-0">
          {/* <----------------Add Button-----------> */}
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#addEmployee"
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Add new Emloyee
          </button>
        </div>
      </h5>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">age</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Persons.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.fullName}</td>
                <td>{employee.age}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.gender}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-Link"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEmployee"
                    onClick={() => saveID(employee.id)}
                  >
                    <i className="fas fa-trash" style={{ color: "red" }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <--------------Delete Modal----------------> */}

      <div className="modal text-black" id="deleteEmployee" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete record</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this record?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-Link"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteRecord}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <----------------end Modal----------------> */}
      {/* <------------------------------------------------add Name Modal------------------------------------------------> */}
      <div
        className="modal fade"
        id="addEmployee"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Employee
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 needs-validation" noValidate>
                {/* name */}
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="name"
                    onChange={handleFormChange}
                    required
                  />
                </div>
                {/* age */}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    name="age"
                    rows="3"
                    onChange={handleFormChange}
                    required
                  />
                </div>
                {/* dateOfBirth */}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleFormChange}
                    required
                  />
                </div>

                {/* gender */}
                <div className="mb-3">
                  <label htmlFor="PhoneNumber" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select form-select-sm"
                    name="gender"
                    aria-label=".form-select-sm example"
                    value={formData.gender}
                    onChange={handleFormChange}
                    required
                  >
                    <option defaultValue>select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-Link"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <------------------------------------------------Modal end------------------------------------------------> */}
    </div>
  );
}

export default Main;
