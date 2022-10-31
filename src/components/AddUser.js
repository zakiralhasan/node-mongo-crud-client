import React from "react";
import { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({});

  const handleForm = (event) => {
    event.preventDefault();
    console.log(user);

    //send data to server side through POST methode
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data._id) {
          alert("data added successfully");
          event.target.reset();
        }
      });
  };

  //getting input name and value trhough onblure function
  const handleInputBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
  };

  return (
    <div>
      <h1>user</h1>

      <form onSubmit={handleForm}>
        <input
          onBlur={handleInputBlur}
          type="text"
          name="name"
          placeholder="name"
        />
        <br />
        <input
          onBlur={handleInputBlur}
          type="email"
          name="email"
          placeholder="email"
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddUser;
