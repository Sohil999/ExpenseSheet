const { MongoClient } = require('mongodb');
const { Expense } = require('./expense')
const express = require('express');
const app = express();
const port = 3000;

let abc;
let db;
let collection;

// 1) Middleware - It is a function that can modify incoming request data

app.use(express.json());

app.use('/api/expenses', require('./routes/expenseRoutes'))


const uri = "mongodb+srv://sohil1999:sohil1999@sohilcluster0.hbrkfvg.mongodb.net/ExpenseTracker?retryWrites=true&w=majority"

const client = new MongoClient(uri);

async function connect(){
    try {
        await client.connect();
        db = client.db('sample_expense');
        collection = db.collection('Expenses')
        // await listDatabases(client);

    } catch (e) {
        console.error(e);
    }finally{
        await client.close();
    }
}

connect()

// async function listDatabases(client){
//     const databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => {
//         console.log(`-${db.name}`);
//     });
// }




app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


module.exports = collection