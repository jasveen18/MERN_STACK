import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {

  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    confirm_password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, confirm_password } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        confirm_password,
      }),
    });

    const data = await res.json();

    
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registeration Successful");
      history.push("/login");
    }
  };


  return (
    <>
      <h1 className="text-center mt-4">Sign Up</h1>

      <div className="container">
        <form method="POST">

          <div className="form">
            <label htmlFor="exampleInputPassword1">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="exampleInputPassword1"
              value={user.name}
              onChange={handleInputs}
              placeholder="Your Name"
            />
          </div>


          <div className="form">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={user.email}
              onChange={handleInputs}
              placeholder="Enter email"
            />
          </div>


          <div class="form">
            <label htmlFor="exampleInputPassword1">Phone No.</label>
            <input
              type="text"
              name="phone"
              class="form-control"
              id="exampleInputPassword1"
              value={user.phone}
              onChange={handleInputs}
              placeholder="Phone"
            />
          </div>


          <div class="form">
            <label htmlFor="exampleInputPassword1">Your Profession</label>
            <input
              type="text"
              name="work"
              class="form-control"
              id="exampleInputPassword1"
              value={user.work}
              onChange={handleInputs}
              placeholder="Your Profession"
            />
          </div>
          

          <div class="form">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              id="exampleInputPassword1"
              value={user.password}
              onChange={handleInputs}
              placeholder="Enter Password"
            />
          </div>


          <div class="form">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              class="form-control"
              id="exampleInputPassword1"
              value={user.confirm_password}
              onChange={handleInputs}
              placeholder="Confirm Password"
            />
          </div>
          

          <div className="text-center">
            <button type="submit" onClick={postData} class="btn btn-primary  m-4">
              Register
            </button>
          </div>


        </form>
      </div>
    </>
  );
}

export default Signup;
