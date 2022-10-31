import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const storedUser = useLoaderData();
  const [user, setuser] = useState();

  const handleForm = (event) => {
    event.preventDefault();
    console.log(storedUser);
    fetch(`http://localhost:5000/user/${storedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("user updated usccessfully");
          console.log(data);
        }
      });
  };

  //getting input name and value trhough onblure function
  const handleInputCange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setuser(newUser);
  };

  console.log(storedUser);
  return (
    <div>
      <h1>uapdate user: {storedUser.name}</h1>
      <form onSubmit={handleForm}>
        <input
          defaultValue={storedUser.name}
          onChange={handleInputCange}
          type="text"
          name="name"
          placeholder="name"
        />
        <br />
        <input
          defaultValue={storedUser.email}
          onChange={handleInputCange}
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

export default Update;
