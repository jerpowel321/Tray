const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var fs = require('fs');
var content = fs.readFileSync('index.txt', 'utf8');


let startingPosition = [];
let grid = [];
let xAxisMax = 0
let yAxisMax = 0
let dirt = [];
let directions = ""
let endingPoisition = [0, 0];
let score = 0;
let currentPosition = [];

// created a function called setUp to update the starting position, grid, dirty tiles, directions and current position based on the content in the text file, index.txt
function setUp(content) {
    // define a variable to represent the length of the content in the text file
    let len = content.length;
    // iterate through the text file to set up the starting position, grid, dirty tiles, directions and current position
    for (let k=0; k<len; k++){
        // check to see if the value is either N, E, S or W as this would indicate the directions for the robotic hover 
        if (content[k] === "N" || content[k] === "E" || content[k] === "S" || content[k] === "W"){
            // if the value is N, E, S or W I want to use that index as the point where I am going to take the remaining values of the content and update the variable directions
            directions = content.slice(k)
            // the last part of the program set up is updating directions so now I call on the startCleaning function below
            startCleaning(directions)
            return;
        }
        // the first line of the file holds the room dimensions, so the content of the file at indices 0 and 2 will represent the grid row and grid column 
        else if (k === 0){
            // converting the string into a number
            let xAxis = Number(content[k]);
            let yAxis = Number(content[k+2]);
            // update variables grid, xAxisMax, yAxisMax so I know the size of the room and know later if a direction cannot be made as the hover would hit into a wall
            grid = [xAxis, yAxis];
            xAxisMax = xAxis;
            yAxisMax = yAxis;
        }
        // the second line holds the inital hover position
        else if (k === 4){
            // converting the string into a number
            let xAxis = Number(content[k]);
            let yAxis = Number(content[k+2]);
            // updating the starting position and current position
            startingPosition = [xAxis, yAxis];
            currentPosition = startingPosition;
        }
        //subsequent lines contain (the zero or more positions of) patches of dirt (one per line)
        else if (k%4 === 0 && k>5){
            // converting the string into a number
            let xAxis = Number(content[k]);
            let yAxis = Number(content[k+2]);
            // I want the cordinates to be added into the dirt array variable
            dirt.push([xAxis, yAxis]);
        }
        else
        continue;
        
    }
}

setUp(content)

// created a function called startCleaning where the robot hover will move around the room based on the directions N - North, E - East, S - South, W - West
function startCleaning() {
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
    startCleaning(directions)
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