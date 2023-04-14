import React, { useState, useEffect } from "react";
import axios from "axios";
// import './Customers.css';

function Customers() {
  const [users, setUsers] = useState([]);

  async function getUsersData() {
    const response = await axios.get("http://localhost:5000/getusers");

    if (response) {
      console.log(response.data);
      setUsers(response.data);
    }
  }
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div>
        <table className="table-container">
          <tr>
            <th>S_No</th>
            <th>Name</th>
            <th>Account No.</th>
            <th>Balance</th>
          </tr>
          {
            users.map((item) => (
            <tr key = {item._id}>
                <td>{item.S_No}</td>
                <td>{item.Name}</td>
                <td>{item.Account_Number}</td>
                <td>{item.Balance}</td>
              </tr>
            ))
          }
         
        </table>
   
    </div>
  );
}

export default Customers;
