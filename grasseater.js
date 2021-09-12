class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 6;
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