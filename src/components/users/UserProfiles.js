import { useState, useEffect } from "react";
import { getAllUsers } from "../../managers/UserManager.js";

export const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUserProfiles);
  }, []);

  return (
    <div className="container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Joined On</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((userProfile) => (
            <tr key={userProfile.id}>
              <td>{userProfile.first_name} {userProfile.last_name}</td>
              <td>@{userProfile.username}</td>
              <td>{userProfile.email}</td>
              <td>{userProfile.bio}</td>
              <td>{userProfile.created_on}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};