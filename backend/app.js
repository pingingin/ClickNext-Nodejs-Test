require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require('cors');

const User = require("./model/user");
const Transaction = require("./model/transaction");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/home", auth, async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email })

  return res.status(200).json({
    'user': user
  });
});

app.get("/deposit", auth, async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email })

  return res.status(200).json({
    'user': user
  });
});

app.post("/deposit", auth, async (req, res) => {
  const { email } = req.user;
  let amount = parseFloat(req.body.amount);
  const user = await User.findOne({ email })
  {
    if(amount <= 0 || amount == NaN) {
      return res.status(200).json({
        'message': 'Invalid Amount',
        'user': user
      });
    }
  }
  let { balance } = await User.findOne({ email })
  try{
    await User.updateOne({email}, {$set:{balance:amount + balance}})
  }
  catch(e) {
    return res.status(200).json({
      'message': 'Invalid Amount',
      'user': user
    });
  }
  
  return res.status(200).json({
    'user': user
  });
});


app.get("/withdraw", auth, async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email })

  return res.status(200).json({
    'user': user
  });
});

app.post("/withdraw", auth, async (req, res) => {
  const { email } = req.user;
  let amount = parseFloat(req.body.amount);
  const user = await User.findOne({ email })

  {
    if(amount <= 0 || amount == NaN) {
      return res.status(200).json({
        'message': 'Invalid Amount',
        'user': user
      });
    }
  }

  let { balance } = await User.findOne({ email })
  {
    let user = await User.findOne({ email })
    if(parseFloat(balance) < parseFloat(amount)) {
      return res.status(200).json({
        'message': 'Insufficient Balance',
        'user': user
      });
    }
  }
  try{
    await User.updateOne({email}, {$set:{balance:balance - amount}})
  }
  catch(e) {
    return res.status(200).json({
      'message': 'Invalid Amount',
      'user': user
    });
  }
  
  return res.status(200).json({
    'user': user
  });
});

app.get("/transfer", auth, async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email })

  return res.status(200).json({
    'user': user
  });
});

app.post("/transfer", auth, async (req, res) => {
  const { email } = req.user;
  const { receiver } = req.body;
  const user = await User.findOne({ email })
  let { balance } = await User.findOne({ email })
  let amount = parseFloat(req.body.amount);

  {
    if(amount <= 0 || amount == NaN) {
      return res.status(200).json({
        'message': 'Invalid Amount',
        'user': user
      });
    }
    if(parseFloat(balance) < amount) {
      return res.status(200).json({
        'message': 'Insufficient Balance',
        'user': user
      });
    }
    if(user.account_number===receiver){
      return res.status(200).json({
        'message': 'Wrong Account Number',
        'user': user
      });
    }
  }
    
  try{
    let { balance } = await User.findOne({account_number: receiver})
    try{
      await User.updateOne({account_number: receiver}, {$set:{balance:parseFloat(balance) + amount}})
    }
    catch(e) {
      return res.status(200).json({
        'message': 'Invalid Amount',
        'user': user
      });
    }
  }
  catch(e){
    return res.status(200).json({
      'message': 'Wrong Account Number',
      'user': user
    });
  }

  await User.updateOne({email}, {$set:{balance:parseFloat(balance) - amount}})
  
  await Transaction.create({
    sender: user.account_number,
    receiver: receiver,
    amount: amount,
    type: "Transfer",
    remain: (user.balance-amount),
    date: (new Date()).toLocaleString()
  });

  const user_receiver = await User.findOne({ account_number: receiver })
  await Transaction.create({
    sender: user.account_number,
    receiver: receiver,
    amount: amount,
    type: "Receive",
    remain: user_receiver.balance,
    date: (new Date()).toLocaleString()
  });

  return res.status(200).json({
    'user': user
  });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
          process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      
      
      return res.status(200).json(user);
    }
    return res.status(400).send({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/history/transfer", auth, async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email })
  const { account_number } = await User.findOne({ email })
  const data = await Transaction.find({sender: account_number, type: "Transfer"}).sort({ _id: -1 })
  return res.status(200).json({
    'user': user,
    'data': data
  });
});

app.get("/history/receive", auth, async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email })
  const { account_number } = await User.findOne({ email })
  const data = await Transaction.find({receiver: account_number, type: "Receive"}).sort({ _id: -1 })
  return res.status(200).json({
    'user': user,
    'data': data
  });
});

app.post("/logout", auth, async (req, res) => {
  try {
    return res.status(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
