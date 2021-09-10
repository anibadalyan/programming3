class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        var found = [];
        // console.log(character)
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        console.log(emptyCells);
        if (newCell && this.multiply >= 4) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }


}


class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(characterr) {

        var found = [];
        // console.log(character)
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == characterr) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newx = newCell[0]
            var newy = newCell[1]
            matrix[newy][newx] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            // var newgrasseater = new GrassEater(newx, newy)
            // grassEaterArr.push(newgrasseater)
            this.x = newx
            this.y = newy
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }


    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 6;
        }

    }
    eat() {
        this.getNewCoordinates()
        var grassCells = this.chooseCell(1)
        var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (var j in grassEaterArr) {
            if (this.x == grassEaterArr[j].x && this.y == grassEaterArr[j].y) {
                grassEaterArr.splice(j, 1);
                break
            }
        }
    }

}


class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(characterr) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == characterr) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newx = newCell[0]
            var newy = newCell[1]
            matrix[newy][newx] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0

            // var newpredator = new Predator(newx, newy)
            // predatorArr.push(newpredator)
            this.x = newx
            this.y = newy
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }


    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;

            var newpredator = new Predator(newX, newY);
            predatorArr.push(newpredator);
            this.energy = 6;
        }

    }
    eat() {
        this.getNewCoordinates()
        var grassEaterCells = this.chooseCell(2)
        var newCell = grassEaterCells[Math.floor(Math.random() * grassEaterCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (var j in  predatorArr) {
            if (this.x ==  predatorArr[j].x && this.y == predatorArr[j].y) {
                predatorArr.splice(j, 1);
                break
            }
        }
    }

}


class PredatorEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(characterr) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == characterr) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newx = newCell[0]
            var newy = newCell[1]
            matrix[newy][newx] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }


    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newpredatoreater = new PredatorEater(newX, newY);
            predatorEaterArr.push(newpredatoreater);
            this.energy = 6;
        }

    }
    eat() {
        this.getNewCoordinates()
        var predatorCells = this.chooseCell(3)
        var newCell = predatorCells[Math.floor(Math.random() * predatorCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in predatorArr) {
                if (newX ==predatorArr[i].x && newY == predatorArr[i].y) {
                   predatorArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (var j in predatorEaterArr) {
            if (this.x == predatorEaterArr[j].x && this.y == predatorEaterArr[j].y) {
                predatorEaterArr.splice(j, 1);
                break
            }
        }
    }

}


       

class PredatorEaterEater{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(characterr) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == characterr) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        this.getNewCoordinates()
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newx = newCell[0]
            var newy = newCell[1]
            matrix[newy][newx] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newx
            this.y = newy
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }



    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newpredatorEaterEater= new PredatorEaterEater(newX, newY);
            predatorEaterEaterArr.push(newpredatorEaterEater);
            this.energy = 6;
        }

    }
    eat() {
        this.getNewCoordinates()
        var predatorCells = this.chooseCell(4)
        var newCell = predatorCells[Math.floor(Math.random() * predatorCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in predatorArr) {
                if (newX ==predatorEaterArr[i].x && newY == predatorEaterArr[i].y) {
                   predatorEaterArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (var j in predatorEaterEaterArr) {
            if (this.x == predatorEaterEaterArr[j].x && this.y == predatorEaterEaterArr.y) {
                predatorEaterEaterArr.splice(j, 1);
                break
            }
        }
    }

}