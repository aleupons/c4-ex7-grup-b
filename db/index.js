require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("No se ha podido iniciar la base de datos");
      console.log(err.message);
      /* return; */
    }
    /* console.log("Se ha iniciado la base de datos"); */
  }
);
