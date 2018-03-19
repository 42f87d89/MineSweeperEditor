enum class SpotState {
    Hidden,
    Shown,
    Flagged
}

data class Spot(var state: SpotState, var mine: Boolean)

typealias Field = List<List<Spot>>

data class Minefield(val width: Int, val height: Int,
                     var mines: Field = Array(height) { Array(width) { Spot(SpotState.Hidden, false) }.asList() }.asList()
) : Field by mines

fun Minefield.toIterator(): Iterator<Spot> {
    val a = this
    return object : Iterator<Spot> {
        var x = 0
        var y = 0
        override fun next(): Spot {
            if (x < a.width - 1) x += 1
            else {
                x = 0
                y += 1
            }
            return a[y][x]
        }

        override fun hasNext(): Boolean {
            return !(y == a.height - 1 && x == a.width - 1)
        }

    }
}

fun Minefield.around(x: Int, y: Int): Iterator<Pair<Int, Int>> {
    val height = this.height
    val width = this.width
    val iter = object : Iterator<Pair<Int, Int>> {
        val maxI = if(x+1<width) 1 else 0
        val maxJ = if(y+1<height) 1 else 0
        val minI = if(x-1>=0) -1 else 0
        val minJ = if(y-1>=0) -1 else 0
        //future position
        var i = minI
        var j = minJ

        override fun hasNext(): Boolean {
            return j <= maxJ
        }

        override fun next(): Pair<Int, Int> {
            val next = Pair(x+i, y+j)
            squareNext()
            if (i == 0 && j == 0) squareNext()
            return next
        }

        fun squareNext() {
            i += 1
            if (i > maxI) {
                i = minI
                j += 1
            }
        }
    }
    if (iter.minI == 0 && iter.minJ == 0) iter.squareNext()//this only happens if the width of the field is 1
    return iter
}

fun Minefield.getMines(x: Int, y: Int): Int {
    var result = 0
    for ((i, j) in this.around(x, y)) {
        if (this[j][i].mine) result += 1
    }
    return result
}

fun Minefield.getFlags(x: Int, y: Int): Int {
    var result = 0
    for ((i, j) in this.around(x, y)) {
            if (this[j][i].state == SpotState.Flagged) result += 1
    }
    return result
}

fun Minefield.unhide(x: Int, y: Int) {
    this[y][x].state = SpotState.Shown
    for ((i, j) in this.around(x, y)) {
        if (getFlags(x, y) != getMines(x, y)) break
        if (this[j][i].state == SpotState.Hidden) unhide(i, j)
    }

}

fun serialize(f: Minefield): String {
    fun numerify(spot: Spot): Int {
        var result = 0
        if (spot.mine) result += 1
        when {
            spot.state == SpotState.Hidden -> result += 2
            spot.state == SpotState.Flagged -> result += 4
        }
        return result
    }

    fun base36(n: Int): Char {
        when {
            n < 10 -> return n.toString()[0]
            n == 10 -> return 'a'
            n == 11 -> return 'b'
            n == 12 -> return 'c'
            n == 13 -> return 'd'
            n == 14 -> return 'e'
            n == 15 -> return 'f'
            n == 16 -> return 'g'
            n == 17 -> return 'h'
            n == 18 -> return 'i'
            n == 19 -> return 'j'
            n == 20 -> return 'k'
            n == 21 -> return 'l'
            n == 22 -> return 'm'
            n == 23 -> return 'n'
            n == 24 -> return 'o'
            n == 25 -> return 'p'
            n == 26 -> return 'q'
            n == 27 -> return 'r'
            n == 28 -> return 's'
            n == 29 -> return 't'
            n == 30 -> return 'u'
            n == 31 -> return 'v'
            n == 32 -> return 'w'
            n == 33 -> return 'x'
            n == 34 -> return 'y'
            else -> return 'z'
        }
    }

    var result = "${f.width} "
    var iter = f.toIterator()
    for (s in iter) {
        var asd = numerify(s)
        if (iter.hasNext()) asd += 6 * numerify(iter.next())
        result += base36(asd)
    }
    return result
}

fun fromASCII(f: String): Minefield {
    val rows = f.split('\n')
    val width = rows[0].length / 2
    val height = rows.size
    var field = Array(height) { Array(width) { Spot(SpotState.Hidden, false) }.asList() }.asList()
    for (y in 0 until height) {
        for (x in 0 until width) {
            when {
                rows[y][x * 2] == '[' -> field[y][x].state = SpotState.Hidden
                rows[y][x * 2] == 'F' -> field[y][x].state = SpotState.Flagged
                else -> field[y][x].state = SpotState.Shown
            }
            field[y][x].mine = rows[y][x * 2 + 1] == 'X'
        }
    }
    return Minefield(width, height, field)
}