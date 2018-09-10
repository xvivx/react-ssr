// var express = require('express');


// var app = express();

// app.use(express.static(__dirname + '/tests'));

// app.listen(3000)


var a = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(11);
            resolve(1);
        }, 1000);
    });
};


async function abs() {
    await a();

    console.log(1);
}

abs();