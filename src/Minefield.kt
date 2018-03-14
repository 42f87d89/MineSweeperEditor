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
    val a = this
    println("$x,$y")
    return object : Iterator<Pair<Int, Int>> {
        val lowI = if (x - 1 > 0) -1 else 0
        var i = lowI
        var j = if (y - 1 > 0) -1 else 0

        override fun hasNext(): Boolean {
            println("$i,$j,${!(i == 1 && j == 1) || !(x + i < a.width - 1 && y + j < a.height - 1)}")
            return !(i >= 1 && j >= 1)
        }

        override fun next(): Pair<Int, Int> {
            if (i < 1) i += 1
            else {
                i = lowI
                j += 1
            }
            if (i == 0 && j == 0) i = 1
            return Pair(i + x, j + y)
        }
    }
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
    for (i in -1..1) {
        for (j in -1..1) {
            if (i == 0 && j == 0) continue
            if (y + i < 0 || y + i >= this.size) continue
            if (x + j < 0 || x + j >= this[0].size) continue
            if (this[y + i][x + j].state == SpotState.Flagged) result += 1
        }
    }
    return result
}

fun Minefield.unhide(x: Int, y: Int) {
    this[y][x].state = SpotState.Shown
    for (i in -1..1) {
        for (j in -1..1) {
            if (i == 0 && j == 0) continue
            if (y + i < 0 || y + i >= this.size) continue
            if (x + j < 0 || x + j >= this[0].size) continue
            if (getFlags(x, y) != getMines(x, y)) continue
            if (this[y + i][x + j].state == SpotState.Hidden) unhide(x + j, y + i)
        }
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