// The Node.js file system module allows you to work with the file system on your computer.
// To include the File System module, use the require() method:
var fs = require('fs');

//The fs.readFile() method is used to read files on your computer.
var content = fs.readFileSync('index.txt', 'utf8');

// Including chalk for string styling in terminal
const chalk = require('chalk');

// declare the following variables and assign values
let startingPosition = [];
let grid = [];
let xAxisMax = 0
let yAxisMax = 0
let dirtyTiles = [];
let directions = ""
let endingPoisition = [0, 0];
let score = 0;
let currentPosition = [];
let contentArr = []

// created a function called setUp to update the starting position, grid, dirty tiles, directions and current position based on the content in the text file, index.txt
function setUp(content) {
    // update content array so each line in the text file is an element in the array
    contentArr = content.split("\n");
    // define a variable to represent the length of the contentArray (rows in the text file)
    let len = contentArr.length
    // iterate through the content Array to set up the starting position, grid, dirty tiles, directions and current position
    for (let k = 0; k < len; k++) {
        // check to see if the value of the first character in the row is either N, E, S or W as this would indicate the directions for the robotic hover 
        if (contentArr[k][0] === "N" || contentArr[k][0] === "E" || contentArr[k][0] === "S" || contentArr[k][0] === "W") {
            // if the value is N, E, S or W I want to use that index as the point where I am going to take the remaining values of the content and update the variable directions
            directions = contentArr[k]
            // calling on updateScore function below to see if the current position of the robot is a dirty tile, if it is, update the score variable
            updateScore(currentPosition[0], currentPosition[1])
            // the last part of the program set up is updating directions so now I call on the startCleaning function below
            startCleaning(directions)
            return;
        }
        // the first line of the file holds the room dimensions, so the content array at indices 0 will represent the grid row and grid column 
        else if (k === 0) {
            let strNumArr = contentArr[k].split(' ')
            // converting the string into a number
            let xAxis = Number(strNumArr[0]);
            let yAxis = Number(strNumArr[1]);
            // Making sure that the grid has at least a dimension 0 1 or 1 0 as the robot needs to be able to move to at least 1 tile
            if (xAxis <= 0 && yAxis <= 0) {
                console.log(chalk.cyan("The X and Y coordinates of your grid dimensions need to be greater or equal to 1"))
                return;
            }
            // update variables grid, xAxisMax, yAxisMax so I know the size of the room and know later if a direction cannot be made as the hover would hit into a wall
            else {
                grid = [xAxis, yAxis];
                xAxisMax = xAxis;
                yAxisMax = yAxis;
            }
        }
        // the second line of the file holds the inital hover position, so the content array at indices 1 will represent the X and Y cordinates of the inital position of the robot
        else if (k === 1) {
            let strNumArr = contentArr[k].split(' ')
            // converting the string into a number
            let xAxis = Number(strNumArr[0]);
            let yAxis = Number(strNumArr[1]);
            // updating the starting position and current position
            startingPosition = [xAxis, yAxis];
            currentPosition = startingPosition;
        }
        // subsequent lines of the file contain (the zero or more positions of) patches of dirt (one per line)
        else {
            let strNumArr = contentArr[k].split(' ')
            // converting the string into a number
            let xAxis = Number(strNumArr[0]);
            let yAxis = Number(strNumArr[1]);
            // I want the coordinates to be added into the dirt array variable
            dirtyTiles.push([xAxis, yAxis]);
        }

    }
}

setUp(content)

// created a function called startCleaning where the robot hover will move around the room based on the directions N - North, E - East, S - South, W - West
function startCleaning() {
    // define a variable direction and assign it the first letter in the directions string
    let direction = directions[0]
    // if the value of direction is undefined i.e. there are no more directions for the robot, then the cleaning is over
    if (direction === undefined) {
        // call on the cleaningOver function below
        cleaningOver()
        return;
    }
    // if the value of the direction is N for North
    else if (direction === "N") {
        // define and assign values to xAxis and yAxis variables, xAxis is not impacted, however yAxis needs to increase by 1 since the robot is moving up/north
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] + 1;
        // if the updated yAxis is greater than the yMax dimension of the room, then the robot cannot move in that direction (cannot move through a wall)
        if (yAxis > yAxisMax) {
            console.log(chalk.cyan("Whoops! Looks like you hit a wall and can't move up. Try another move."))
            return;
        }
        else {
            // update the current position
            currentPosition = [xAxis, yAxis];
            // calling on updateScore function below to see if the current position of the robot is a dirty tile, if it is, update the score variable
            updateScore(xAxis, yAxis)
        }
    }
    // if the value of the direction is E for East
    else if (direction === "E") {
        // define and assign values to xAxis and yAxis variables, yAxis is not impacted, however xAxis needs to increase by 1 since the robot is moving right/east
        let xAxis = currentPosition[0] + 1;
        let yAxis = currentPosition[1];
        // if the updated xAxis is greater than the xMax dimension of the room, then the robot cannot move in that direction (cannot move through a wall)
        if (xAxis > xAxisMax) {
            console.log(chalk.cyan("Whoops! Looks like you hit a wall and can't move right. Try another move."))
            return;
        }
        else {
            // update the current position
            currentPosition = [xAxis, yAxis];
            // calling on updateScore function below to see if the current position of the robot is a dirty tile, if it is, update the score variable
            updateScore(xAxis, yAxis)
        }
    }
    // if the value of the direction is S for South
    else if (direction === "S") {
        // define and assign values to xAxis and yAxis variables, xAxis is not impacted, however yAxis needs to decrease by 1 since the robot is moving down/south
        let xAxis = currentPosition[0];
        let yAxis = currentPosition[1] - 1;
        // if the updated yAxis is less than the yMin dimension of the room (which is 0), then the robot cannot move in that direction (cannot move through a wall)
        if (yAxis < 0) {
            console.log(chalk.cyan("Whoops! Looks like you hit a wall and can't move down. Try another move."))
            return;
        }
        else {
            // update the current position
            currentPosition = [xAxis, yAxis];
            // calling on updateScore function below to see if the current position of the robot is a dirty tile, if it is, update the score variable
            updateScore(xAxis, yAxis)
        }
    }
    // if the value of the direction is W for West 
    else if (direction === "W") {
        // define and assign values to xAxis and yAxis variables, yAxis is not impacted, however xAxis needs to decrease by 1 since the robot is moving left/West
        let xAxis = currentPosition[0] - 1;
        let yAxis = currentPosition[1];
        // if the updated xAxis is less than the xMin dimension of the room (which is 0), then the robot cannot move in that direction (cannot move through a wall)
        if (xAxis < 0) {
            console.log(chalk.cyan("Whoops! Looks like you hit a wall and can't move left. Try another move."))
            return;
        }
        else {
            // update the current position
            currentPosition = [xAxis, yAxis];
            // calling on updateScore function below to see if the current position of the robot is a dirty tile, if it is, update the score variable
            updateScore(xAxis, yAxis)
        }
    }
    // remove the first letter in the directions variable, as we just updated the current position and score, and want to move to the next direction
    directions = directions.substring(1);
    // I am using recursion to go through the directions variable and update the current position and score accordinly
    startCleaning(directions)
}


// created a function updateScore to update the score variable if the current position is a dirty tile
function updateScore(xAxis, yAxis) {
    // check to see if there are any dirty tiles, if not exit out of the function
    if (dirtyTiles.length === 0) {
        return;
    }
    else {
        // iterate through the dirty tiles array and check to see if the current position matches any dirty tile cordinates
        for (let i = 0; i < dirtyTiles.length; i++) {
            // looping through each pair of x and y cordinates in the array
            let x = dirtyTiles[i][0]
            let y = dirtyTiles[i][1]
            // if the x and y coordinates in the dirtyTiles array match with the current position coordinates then increase the score variable by 1
            if (x === xAxis && y === yAxis) {
                score++
                // defining a variable called removedTile which is the x and y coordinate of the dirty tile which matches the current position. Using the splice method, the dirtyTiles array is updated to remove 1 element at index i
                let removedTile = dirtyTiles.splice(i, 1);
            }
        }
    }
}

// created a function cleaningOver to provide the ending position of the robot and how many dirty tiles were cleaned
function cleaningOver() {
    // update endingPosition variable to be the currentPosition
    endingPoisition = currentPosition
    // print out the final hover position (x and y coordinates)
    console.log(chalk.magenta(endingPoisition[0], endingPoisition[1]))
    // pring out number of patches of dirt the robot cleaned up
    console.log(chalk.magenta(score))
}