import React,{useState, useEffect} from 'react'
import axios from "axios";
// import './History.css'

function History() {

    const [users, setUsers] = useState([]);

  async function getUsersData() {
    const response = await axios.get("http://localhost:5000/transactions");

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
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
          {
            users.map((item) => (
            <tr key = {item.sender}>
                <td>{item.sender}</td>
                <td>{item.reciever}</td>
                <td>{item.amount}</td>
              </tr>
            ))
          }
         
        </table>
    </div>
  )
}

export default History