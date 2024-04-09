const database = require("mongoose");
const is_render = process.env.IS_RENDER || false;
const databaseName = "lab_example"
const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const localURI = "mongodb://localhost/"+databaseName+"?authSource=admin&retryWrites=true"
if (is_render) {
database.connect(renderURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
database.connect(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}