const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost/accouts")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  S_No: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Account_Number: {
    type: String,
    required: true,
  },
  Balance: {
    type: Number,
    default: 0.0,
  },
});

const userModel = mongoose.model("userModel", userSchema);

const transactionSchema = mongoose.Schema({
  sender: {
    type: String,
  },
  reciever: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const transactionModel = mongoose.model("transactionModel", transactionSchema);

const data = [
  {
    S_No: 6,
    Name: "Vandhana",
    Account_Number: "230406",
    Balance: "900000",
  },
  {
    S_No: 7,
    Name: "Abhy",
    Account_Number: "230407",
    Balance: "60000",
  },
  {
    S_No: 8,
    Name: "Khushi",
    Account_Number: "230408",
    Balance: "4500000",
  },
  {
    S_No: 9,
    Name: "Ghazipur",
    Account_Number: "230409",
    Balance: "200000",
  },
  {
    S_No: 10,
    Name: "Varsha",
    Account_Number: "2304010",
    Balance: "143000",
  },
];

app.get("/getusers", async (req, res) => {
  try {
    const response = await userModel.find();

    return res.send(response);
  } catch (err) {
    return res.json({
      msg: "There is some Fault",
    });
  }
});

const addUsers = async () => {
  await userModel.insertMany(data);
  // await userModel.findOneAndDelete("Account_Number: 230405")
};

//  addUsers();

app.patch("/transfer", async (req, res) => {
  try {
    const { sen_acc, rec_acc, amt } = req.body;
    if (amt <= 0) {
      return res.status(203).json({
        msg: "Amount Cannot be Negative",
      });
    }

    const check1 = await userModel.findOne({ Account_Number: sen_acc });
    console.log(check1);
    const check2 = await userModel.findOne({ Account_Number: rec_acc });
    console.log(check1);

    if (!check1 || !check2) {
      return res.status(203).json({
        msg: "Either Sender or Reciever Account does not exist",
      });
    }

    if (check1.Balance < amt) {
      return res.status(203).json({
        msg: "Insufficient Balance",
      });
    }

    const q1 = await userModel.updateOne(
      {
        Account_Number: sen_acc,
      },
      { $inc: { Balance: -amt } }
    );

    const q2 = await userModel.updateOne(
      {
        Account_Number: rec_acc,
      },
      { $inc: { Balance: amt } }
    );

    if (q1 && q2) {
      const stored = await transactionModel.create({
        sender: sen_acc,
        reciever: rec_acc,
        amount: amt,
      });
      if (stored) {
        return res.status(203).json({
          msg: "Amount successfully transfered",
        });
      }
    }

    return res.status(500).json({
      msg: "There is some Error There",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get("/transactions", async (req, res) => {
    try {
      const response  = await transactionModel.find();
        if (response) {
        res.status(200).send(response);
      }
    } catch (err) {
      res.status(400).json({
        msg: "Server Facing Issues",
      });
    }
  });  



app.listen(5000, () => {
  console.log("server started");
});



