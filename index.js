const Jimp = require("jimp");
const config = require('./config.json');
const fs = require('fs');
const { parse } = require('csv-parse');

const imageGenerator = require('./imageGenerator');

let parser = parse({columns: false}, function(err, records){

    let i = 1;

    records.forEach(element => {
        let i2 = i;
        
        if(i >= 100){
            i2 = i.toString();
        }
        else if(i >= 10){
            i2 = "0" + i.toString();
        }
        else if(i <= 9){
            i2 = "00" + i.toString();
        }

        imageGenerator(i, element[0]);
        i++;
        console.log('Task done for ' + element[0]);
    });
});
let csvFilePath = "./osoby.csv";

fs.createReadStream(csvFilePath).pipe(parser);