
var m = 40
var n = 40
var matrix = []
for (var y = 0; y < m; y++) {
    matrix[y] = []
    for (var x = 0; x < n; x++) {
        matrix[y][x] = Math.floor(Math.random() * 6)
        
    }
}

var side = 10;
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var predatorEaterArr =  []
var predatorEaterEaterArr = []
function setup() {
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                // var emptyCells = gr.chooseCell(0)
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grr = new GrassEater(x, y);
                grassEaterArr.push(grr);
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y);
                predatorArr.push(pred);
            }
            else if (matrix[y][x] == 4) {
                var predeat= new PredatorEater(x, y);
               predatorEaterArr.push(predeat);
            }
            else if (matrix[y][x] == 5) {
                var predeatereater = new PredatorEaterEater(x, y);
                predatorEaterEaterArr.push( predeatereater);
            }
        }

    }
}


function draw() {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("white");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }


    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var o in grassEaterArr) {
        grassEaterArr[o].mul();
        grassEaterArr[o].eat();
    
       

    }
    for (var j in predatorArr) {
        predatorArr[j].mul();
        predatorArr[j].eat();
     

    }
    for (var p in  predatorEaterArr) {
        predatorEaterArr[p].mul();
       predatorEaterArr[p].eat();
 
      
    }
 }
    for (var h in  predatorEaterEaterArr) {
        predatorEaterEateArr[h].mul();
        predatorEaterEateArr[h].eat();
      

    }
