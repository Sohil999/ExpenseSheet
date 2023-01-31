const fs = require('fs');
const express = require('express');
const { authUser } = require('./basicAuth');

const app = express();


// 1) Middleware - It is a function that can modify incoming request data

app.use(express.json());


// 2) Route handlers

const users = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/users.json`));




app.get('/api/v1/users/:userId/expenses/:expenseId', authUser, (req, res) => {
    const userId = req.params.userId * 1;
    // const expenseId = req.params.expenseId * 1;

    if(userId===null){
        return res.status(404).json({
            status: 'fail',
            message: 'Please enter an id'
        })
    }

    const user = users.find(u => u.id === userId)



    if(user === undefined){
        return res.status(404).json({
            status: 'fail',
            message: 'user not found'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});




app.post('/api/v1/users', (req, res) => {
    let newId = users[users.length-1].id + 1;
    let newUser = Object.assign({id: newId}, req.body);

    users.push(newUser);

    fs.writeFile(`${__dirname}/starter/dev-data/data/users.json`, JSON.stringify(users), err => {
        res.status(200).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    });
});



app.delete('/api/v1/users/:id', (req, res) => {
    fs.writeFile(`${__dirname}/starter/dev-data/data/users.json`, JSON.stringify(users), err => {
        let id = req.params.id * 1;

        let index = users.findIndex((obj) => obj.id === id);
        if(index > -1){
            users.splice(index, 1)
        }

        res.status(204).json({
            status: 'success',
            data: null
        })
    })
});




// GET all expenses

app.get('/api/v1/expenses', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});



// GET a particular expense

app.get('/api/v1/expenses/:expenseId', (req, res) => {
    const expenseId = req.params.expenseId * 1;
    const expense = users.find(eid => eid.id === expenseId);

    if(!expenseId){
        return res.status(400).json({
            status: 'fail',
            message: 'Please enter an ID'
        })
    }else if(expense === undefined){
        return res.status(404).json({
            status: 'fail',
            message: 'expense not found'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
})




// DELETE a particular expense

app.delete('/api/v1/expenses/:expenseId', (req, res) => {

    fs.writeFile(`${__dirname}/starter/dev-data/data/expenses.json`, JSON.stringify(users), err => {
        const expenseId = req.params.expenseId * 1;

        let index = users.findIndex((obj) => obj.id === expenseId);
        
        if(index > -1){
            users.splice(index, 1);
        }else if(index === undefined){
            return res.status(404).json({
                status: 'fail',
                message: 'expense not found'
            })
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
})



// 3) Create server

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});



