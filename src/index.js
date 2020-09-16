const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.post("/add", (req,res) => {
    const { num1, num2} = req.body;

    if(typeof num1 === "string" || typeof num2 === "string") {
        return res.json({
            status: "failure",
            message: "Invalid data types",
        });
    }
    else if(num1 > 1000000 || num2 > 1000000 || (num1+num2) > 1000000 ) {
        return res.json({
            status: "error",
            message: "Overflow",
        });
    }
    else {
        let sum = num1 + num2;
        return res.json({
            status: "success",
            message: "the sum of given two numbers",
            sum
        })
    }
});

app.post("/sub", (req, res) => {
    const { num1, num2 } = req.body;

    if(typeof num1 === "string" || typeof num2 === "string") {
        return res.json({
            status: "error",
            message: "Invalid data types",
        });
    }
    else if(num1 < -1000000 || num2 < -1000000 || (num1-num2) < -1000000) {
        return res.json({
            status: "error",
            message: "Underflow"
        });
    }
    else {
        let difference = num1 - num2;

        return res.json({
            status: "success",
            message: "the difference of given two number",
            difference
        });
    }
});

app.post("/multiply", (req, res) => {
    const {num1, num2} = req.body;
    let result = num1 * num2;

    if(typeof num1 === "string" || typeof num2 === "string") {
        return res.json({
            status: "error",
            message: "Invalid data types",
        });
    }
    else if(result > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow",
        });
    }
    else {
        return res.json({
            status: "success",
            message: "The product of given numbers",
            result
        });
    }
});

app.post("/divide", (req, res) => {
    const { num1, num2 } = req.body;

    if(typeof num1 === "string" || typeof num2 === "string") {
        return res.json({
            status: "error",
            message: "Invalid data types",
        });
    }
    if(num2 === 0) {
        return res.json({
            status: "error",
            message: "Cannot divide by zero",
        });
    }
    else {
        let result = num1 / num2;
        return res.json({
            status: "success",
            message: "The division of given numbers",
            result
        });
    }
});

// here


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;