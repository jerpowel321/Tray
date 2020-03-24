const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let startingPosition = [1,2];
let grid = [5,5];
let xAxisMax = grid[0]
let yAxisMax = grid[1]
let dirt = [[1, 0], [2, 2], [2, 3]];
let directions = "NNESEESWNWW"
let endingPoisition = [0,0];
let score = 0; 
let currentPosition = startingPosition;

console.log ("Starting directions", directions)
console.log("Current Position", currentPosition)
console.log("Dirty Tiles", dirt)

function runProgram (directions){
    let direction = directions[0]
    if (direction === undefined){
        console.log("Game is over")
        endGame()
        return;
    }
    // North
    else if (direction === "N"){
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] + 1;
        currentPosition = [xAxis, yAxis];
        console.log("North Updated Current Position" , currentPosition)
        if (yAxis >yAxisMax){
            console.log("Whoops! Looks like you hit a wall and can't move up. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    // East
    else if (direction === "E"){
        let xAxis = currentPosition[0] + 1;
        let yAxis = currentPosition[1];
        currentPosition = [xAxis, yAxis];
        console.log(" East Updated Current Position" , currentPosition)
        if (xAxis >xAxisMax){
            console.log("Whoops! Looks like you hit a wall and can't move right. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    // South
    else if(direction === "S"){
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] - 1;
        currentPosition = [xAxis, yAxis];
        console.log("South Updated Current Position" , currentPosition)
        if (yAxis < 0){
            console.log("Whoops! Looks like you hit a wall and can't move down. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    // West 
    else if (direction === "W"){
        let xAxis = currentPosition[0] -1;
        let yAxis = currentPosition[1];
        currentPosition = [xAxis, yAxis];
        console.log("West" , currentPosition)
        if (xAxis <0){
            console.log("Whoops! Looks like you hit a wall and can't move left. Try another move.")
            return;
        }
        updateScore(xAxis, yAxis)
    }
    directions = directions.substring(1);
    console.log(directions)
    runProgram(directions)
}

runProgram(directions)

function updateScore(xAxis, yAxis){
    for (let i=0; i<dirt.length; i++){
        let x = dirt[i][0]
        let y = dirt[i][1]
        if (x === xAxis && y === yAxis){
            score ++
            let index = i 
            let removed = dirt.splice(index,1);
            console.log("This was removed", removed)
            console.log("Remaining dirt", dirt)
            console.log("Score", score)
        }
    }
}

function endGame(){
    endingPoisition = currentPosition
    console.log("This is the ending position", endingPoisition)
    console.log("This is the score", score)
}