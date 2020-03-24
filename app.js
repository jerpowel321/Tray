const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var fs = require('fs');
var content = fs.readFileSync('index.txt', 'utf8');
// console.log("Blah blah blah", content);


let startingPosition = [];
let grid = [];
let xAxisMax = grid[0]
let yAxisMax = grid[1]
let dirt = [];
let directions = ""
let endingPoisition = [0, 0];
let score = 0;
let currentPosition = [];

// console.log("Starting directions", directions)
// console.log("Current Position", currentPosition)
// console.log("Dirty Tiles", dirt)
function setUp(content) {
    console.log("blah blah blah", content)
    let len = content.length;
    console.log("this is the content length" ,len)
    // for (let i = 0; i < len; i++) {

    //     //    console.log(content[i])
    // }
    for (let k=0; k<len; k++){
        if (content[k] === "N" || content[k] === "E" || content[k] === "S" || content[k] === "W"){
            directions = content.slice(k)
            console.log("This should be the directions", directions)
            return;
        }
        else if (k === 0){
            let xAxis = Number(content[k]);
            let yAxis = Number(content[k+2]);
            grid = [xAxis, yAxis];
            console.log("This is the grid " , grid);
        }
        else if (k === 4){
            let xAxis = Number(content[k]);
            let yAxis = Number(content[k+2]);
            startingPosition = [xAxis, yAxis];
            console.log("This is the starting position" , startingPosition);
            currentPosition = startingPosition;
            console.log("This should be the current position ", currentPosition)
        }
        else if (k%4 === 0 && k !=0 && k>5){
            let xAxis = Number(content[k]);
            let yAxis = Number(content[k+2]);
            dirt.push([xAxis, yAxis]);
            console.log("This should be the dirty tiles ", dirt)
        }
        else
        continue;
        
    }
    console.log("This should update the starting position", startingPosition)
    console.log("This should be the current Position", currentPosition)
    // runProgram(directions)

}
setUp(content)

function runProgram(directions) {
    let direction = directions[0]
    if (direction === undefined) {
        console.log("Game is over")
        endGame()
        return;
    }
    // North
    else if (direction === "N") {
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] + 1;
        currentPosition = [xAxis, yAxis];
        console.log("North Updated Current Position", currentPosition)
        if (yAxis > yAxisMax) {
            console.log("Whoops! Looks like you hit a wall and can't move up. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    // East
    else if (direction === "E") {
        let xAxis = currentPosition[0] + 1;
        let yAxis = currentPosition[1];
        currentPosition = [xAxis, yAxis];
        console.log(" East Updated Current Position", currentPosition)
        if (xAxis > xAxisMax) {
            console.log("Whoops! Looks like you hit a wall and can't move right. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    // South
    else if (direction === "S") {
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] - 1;
        currentPosition = [xAxis, yAxis];
        console.log("South Updated Current Position", currentPosition)
        if (yAxis < 0) {
            console.log("Whoops! Looks like you hit a wall and can't move down. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    // West 
    else if (direction === "W") {
        let xAxis = currentPosition[0] - 1;
        let yAxis = currentPosition[1];
        currentPosition = [xAxis, yAxis];
        console.log("West", currentPosition)
        if (xAxis < 0) {
            console.log("Whoops! Looks like you hit a wall and can't move left. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    directions = directions.substring(1);
    console.log(directions)
    runProgram(directions)
}



function updateScore(xAxis, yAxis) {
    for (let i = 0; i < dirt.length; i++) {
        let x = dirt[i][0]
        let y = dirt[i][1]
        if (x === xAxis && y === yAxis) {
            score++
            let index = i
            let removed = dirt.splice(index, 1);
            console.log("This was removed", removed)
            console.log("Remaining dirt", dirt)
            console.log("Score", score)
        }
    }
}

function endGame() {
    endingPoisition = currentPosition
    console.log("This is the ending position", endingPoisition)
    console.log("This is the score", score)
}