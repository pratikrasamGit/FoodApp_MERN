const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://foodapp:bpaKP9TS3gNBfo88@cluster0.ldmy2hh.mongodb.net/bringItApp?retryWrites=true&w=majority&appName=Cluster0';
const mongoDb = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("connected to mongo");
        const result = mongoose.connection.db.collection("food_items");
        const data = await result.find({}).toArray();

        const foodCategorydata = mongoose.connection.db.collection("food_category");
        const catdata = await foodCategorydata.find({}).toArray();

        global.food_items = data;
        global.food_category = catdata;
        // console.log(global.food_items);
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoDb;




