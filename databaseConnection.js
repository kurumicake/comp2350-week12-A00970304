const mongoose = require("mongoose");
const isRender = process.env.IS_RENDER === 'true';
const databaseName = "lab_example";
const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const localURI = `mongodb://localhost:27017/${databaseName}?authSource=admin&retryWrites=true`;

const connectURI = isRender ? renderURI : localURI;

mongoose.connect(connectURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("Database connection error:", err));
