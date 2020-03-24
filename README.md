# P6B-lt2 :robot: Robotic Hover Cleaner 

## Introduction 

P6B-lt2 is tasked with cleaning a room with dimensions as X and Y coordinates, identifying the top right corner of the room rectangle. 

- This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hover positions. The bottom left corner is the point of origin for the coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
- This room has X and Y coordinates for the locations of patches of dirt in the room
- P6B-lt2 has an initial hover position and P6B-lt2 is always on - there is no need to enable it 
- P6B-lt2 is given driving instructions (as cardinal directions where e.g. N and E mean "go north" and "go east" respectively)

The room is rectangular and has no obstacles (except the room walls), no doors and all locations in the room will be clean (hovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing P6B-lt2 on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. 

Driving into a wall has no effect (the robot skids in place).

## Goal
The goal of the program is to take the room dimensions, the locations of the dirt patches, P6B-lt2 location and the driving instructions as input and to then output the following:

- The final hover position (X, Y)
- The number of patches of dirt the robot cleaned up

## Input
Program input is received in a file input.txt and resides in the same directory as my executable program.

Example:
``` 
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
``` 

- the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
- the second line holds P6B-lt2 initial position
- subsequent lines contain the zero or more positions of patches of dirt (one per line)
- the next line then always contains the driving instructions (at least one)

## Output
Program output is printed to the standard output (STDOUT) of the terminal

- The first line of my program output displays the X and Y coordinates marking the position of P6B-lt2 after processing all commands.
- The second line of the program output displays the number of patches of dirt the robot cleaned up

Example (matching the input above):

``` 
1 3
1
```

## 🔑 How to Run the App

#### Clone the repository
1. Open Terminal
2. Change the current working directory to the location where you want the cloned directory to be made.
3. Type git clone https://github.com/jerpowel321/Tray.git
4. Press Enter. Your local clone will be created.

#### Before starting the application...
1. Make sure you have Node and NPM (Node Package Manager) installed. 
    - You can use the following comands in terminal to check which version is installed 

```
node -v  
npm -v
```
The versions of node and npm you currently have installed should appear. If you don't have them installed, follow Node installation instructions located [here](https://nodejs.org/en/download/). NPM is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.

#### Starting the application
1. Open Terminal and navigate into the directory that you just cloned down 
2. Type <b> npm i </b>  (this will install all dependencies)
    
    - chalk (terminal string styling) 
3. Run the program by typing <b> node app.js </b>

#### Test the program
Feel free to change x and y coordinates of the room, of P6B-lt2 initial position within the room, of dirty tiles in the room and directions (N,S,E,W) within the index.txt file. 

<b> Make sure at the very minimum that you provide the grid coordinates, starting position of P6B-lt2 and directions. </b>
- Note that inputs must be provided in a certain order. Refer back to the section above under Input
- Once you make changes to index.txt, make sure to rerun the program. 


## 🔧 Technologies Used
- Javascript
- Node.js 
- NPM packages

    - chalk (terminal string styling) 