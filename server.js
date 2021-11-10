const express = require('express');
const _bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { Parser } = require('json2csv');

const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//     res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//     next();
// });

app.use(cors());

app.use(_bodyParser.json());

app.listen(port, () => console.log(`Server is running on port: ${port}`));

const users = ['iRfana', 'Apsara', 'Mariyam', 'Sumiya'];

const consoleLog = msg => {
    return console.log(`Console Log: ${msg}`);
};

app.get('/api/users', (req, res) => {
    consoleLog(req.path);
    res.json(users);
});

app.post('/api/user', (req, res) => {
    consoleLog(req.body);
    debugger
    users.push(req.body.user);
    res.json('User Added..!');
});

app.get('/ex', (req, res) => {
    console.log('req.query', req.query);
    // res.json({express: 'Bienvenue..!'});
    res.send({express: 'Assalam-u-Alaikum..!'});
});


app.get('/', (req, res) => {
    console.log('req.query', req.query);
    res.send({express: 'Assalam-u-Alaikum..!'});
});

    let fields = ['username', 'role'];
    let opts = {fields};
    let myData = [{username: 'root', role: 'Admin'}, {username: 'dev', role: 'User'}];
    let parser = new Parser(opts);
    let csv = parser.parse(myData);
    console.log({csv});

//CSV Download: GET METHOD
app.get('/api/download/csv', (req, res) => {
    let fields = ['username', 'role'];
    let opts = {fields};
    let myData = [{username: 'root', role: 'Admin'}, {username: 'dev', role: 'User'}];
    let csv;
    try {
        let parser = new Parser(opts);
        csv = parser.parse(myData);
        console.log(csv);
      } catch (err) {
        console.error(err);
      }
    res.setHeader('Content-disposition', 'attachment; filename=testFile.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
});

//CSV Download: POST METHOD
app.post('/api/download/csv', (req, res) => {
    let fields = ['username', 'role'];
    let opts = {fields};
    let myData = [{username: 'root', role: 'Admin'}, {username: 'dev', role: 'User'}];
    let csv;
    try {
        let parser = new Parser(opts);
        csv = parser.parse(myData);
        console.log(csv);
      } catch (err) {
        console.error(err);
      }
    res.setHeader('Content-disposition', 'attachment; filename=testFile.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
});