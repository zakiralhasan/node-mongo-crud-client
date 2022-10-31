import React from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);

  const handleDelete = (user) => {
    const agree = window.confirm("Are you rady to delete?");
    if (agree) {
      console.log(user._id);
      fetch(`http://localhost:5000/user/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            const remainingUsers = displayUsers.filter(
              (usr) => usr._id !== user._id
            );
            setDisplayUsers(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h1>home</h1>
      {displayUsers.length}

      {displayUsers.map((user) => (
        <p key={user._id}>
          {user.name} {user.email}{" "}
          <Link to={`/update/${user._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(user)}>x</button>
        </p>
      ))}
    </div>
  );
};

export default Home;
