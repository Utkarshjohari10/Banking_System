import React, { useState } from "react";
import "./transaction.css";
import axios from "axios";

function Transaction() {
  const [sender, setSender] = useState("");
  const [reciever, setReciever] = useState("");
  const [amt, setAmt] = useState(0);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
        if(sender == reciever) {
            alert('Cannot transfer money to Same account')
            return;
        }
      const response = await axios.patch("http://localhost:5000/transfer", {
        sen_acc: sender,
        rec_acc: reciever,
        amt: amt,
      });
      if (response.status == 200) {
        console.log(response);
        alert("Money Transfered!");
      } else if(response.status == 203) {
        console.log('error Hai')
        console.log(response)
        alert(response.data.msg);
      }
    } catch (err) {
        console.log(err)
      alert("There is some error", err.msg);
    } finally {
      setSender("");
      setReciever("");
      setAmt(0);
    }
    console.log('button cliked')
  };

  return (
    <div className="transaction">
      <h1>Transfer Money</h1>
      <form>
        <label htmlFor="from">From</label>
        <input
          type="text"
          placeholder="From Account"
          value = {sender}
          onChange={(e) => setSender(e.target.value)}
        />

        <label htmlFor="from">To</label>
        <input
          type="text"
          placeholder="To Account"
          value={reciever}
          onChange={(e) => setReciever(e.target.value)}
        />

        <label htmlFor="from">Amount</label>
        <input
          type="text"
          placeholder="Enter Amount"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />

        <button
          onClick={handleSubmit}
        >Transfer</button>
      </form>
    </div>
  );
}

export default Transaction;
