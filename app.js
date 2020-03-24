const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

console.log(arr)

console.log("hello world")

let startingPosition = [1,2];
let grid = [5,5];
let xAxisMax = grid[0]
let yAxisMax = grid[1]
let dirt = [[1, 0], [2, 2], [2, 3]];
let dirtString = [10, 22, 23]
let directions = "NNESEESWNWW"
let endingPoisition = [0,0];
let score = 0; 
let currentPosition = startingPosition
let currentPositionString = 10


console.log ("Starting directions", directions)
console.log("Current Position", currentPosition)

function runProgram (directions){
    let direction = directions[0]
    console.log(direction)
    
    if (direction === undefined){
        console.log("Game is over")
        endGame()
        return;
    }
    // North
    else if (direction === "N"){
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] + 1;
        currentPosition = [xAxis, yAxis]
        console.log("North Updated Current Position" , currentPosition)
    }

    // East
    else if (direction === "E"){
        let xAxis = currentPosition[0] + 1;
        let yAxis = currentPosition[1];
        currentPosition = [xAxis, yAxis]
        console.log(" East Updated Current Position" , currentPosition)
        if (xAxis >xAxisMax){
            console.log("Whoops! Looks like you hit a wall and can't move right. Try another move.")
        }
    }


    // South
    else if(direction === "S"){
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] - 1;
        currentPosition = [xAxis, yAxis]
        console.log("South Updated Current Position" , currentPosition)
    }

    // West 
    else if (direction === "W"){
        let xAxis = currentPosition[0] -1;
        let yAxis = currentPosition[1];
        currentPosition = [xAxis, yAxis]
        console.log("West" , currentPosition)
        if (xAxis <0){
            console.log("Whoops! Looks like you hit a wall and can't move left. Try another move.")
        }
    }

    directions = directions.substring(1);
    console.log(directions)
    runProgram(directions)
}

runProgram(directions)

// function updateScore(){
//     let index = dirtString.indexOf(currentPositionString)
//     console.log("This is the current position", currentPositionString)
//     console.log("This is the index", index)
    
//     if (index != -1){
//         score++
//        console.log("This is the index" , index)
//         let removed = dirtString.splice(index,1);
//         console.log("This was removed")
//     }
//     console.log("Remaining dirt", dirtString)
//     console.log("Score", score)
// }

// updateScore()

function endGame(){
    endingPoisition = currentPosition
    console.log("This is the ending position", endingPoisition)
    console.log("This is the score", score)
}