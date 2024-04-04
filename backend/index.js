const express = require('express')
const app = express()
const port = 5000
const mongoDb = require("./db")
mongoDb();

// const cors = require("cors");
// app.use(cors());

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin",`${process.env.REACT_APP_BASE_URL}`);
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  // res.setHeader('Access-Control-Allow-Methods', '*');
    // res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
})


app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));

app.get('/', (req, res) => {
  res.send('Hello World!')
  // app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  // res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})