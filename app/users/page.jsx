"use client"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectAllUsers,
  getUsersError,
  getUsersStatus,
  fetchUsers,
  userRemoved,
} from "../features/usersSlice/usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  let content;
  console.log(users);
  if (usersStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (usersStatus === "succeeded") {
    content = (
      <table className="container mx-auto text-center py-10 space-x-12">
        <thead >
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleUserDelete(user.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (usersStatus === "failed") {
    content = <p>{error}</p>;
  }

  const handleUserDelete = (userId) => {
    dispatch(userRemoved(userId));
  };

  return <div>{content}</div>;
};

export default Users;
