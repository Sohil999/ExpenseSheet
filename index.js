const fs = require('fs');
const express = require('express');

const app = express();


// 1) Middleware - It is a function that can modify incoming request data

app.use(express.json());



// 2) Route handlers

const expenses = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/expenses.json`));




app.get('/api/v1/expenses', (req, res) => {
    res.json({
        message: 'success',
        results: expenses.length,
        data: {
            expenses
        }
    });
});



// app.get('/', async(req, res) => {
//     try {
//         const expenses = await Expenses.find()
//         res.json(expenses)
//     } catch (err) {
//         res.status(500).json({ message: err.message})
//     }
// })


app.get('/api/v1/expenses/:id', (req, res) => {
    let id = req.params.id * 1;

    // if(id > expenses.length){
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     });
    // }

    if(id===null){
        return res.status(404).json({
            status: 'fail',
            message: 'Please enter an ID'
        });
    }

    const expense = expenses.find(el => el.id === id );
    
    res.status(200).json({
        message: 'success',
        data: {
            expense
        }
    });
});




app.post('/api/v1/expenses', (req, res) => {
    const newId = expenses[expenses.length - 1].id + 1;
    const newExpense = Object.assign({id: newId}, req.body);

    expenses.push(newExpense);

    fs.writeFile(`${__dirname}/starter/dev-data/data/expenses.json`, JSON.stringify(expenses), err => {
        res.status(201).json({
            status: 'success',
            data: {
                expense: newExpense
            }
        });
    });
});




app.patch('/api/v1/expenses/:id', (req, res) => {
    if(req.params.id * 1 > expenses.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    if(req.body.amount != null){
        res.expenses.amount = req.body.amount
    }

    res.status(200).json({
        status: 'success',
        data: {
            expense: '<Updated expense here...>'
        }
    })
});




app.delete('/api/v1/expenses/:id', (req, res)=> {
    if(req.params.id * 1 > expenses.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    fs.writeFile(`${__dirname}/starter/dev-data/data/expenses.json`, JSON.stringify(expenses), err => {
        // let index = expenses.indexOf(req.params.id * 1);
        let id = req.params.id * 1;

        let index = expenses.findIndex((obj) => obj.id === id);
        if(index > -1){
            expenses.splice(index, 1);
        }
    
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
});





// 3) Create server

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});





// http.createServer(function (req, res) {

// res.writeHead(200, {'Content-Type': 'text/plain'});

// res.end('Hello Node.js\n');

// }).listen(3000, "127.0.0.1");

// console.log('Server running at http://127.0.0.1:3000/');

