import kotlin.random.Random

enum class SpotState {
    Hidden,
    Shown,
    Flagged
}

data class Spot(var state: SpotState = SpotState.Hidden, var mine: Boolean = false, var unknown: Boolean = false)

typealias Field = List<MutableList<Spot>>

data class Minefield(val width: Int, val height: Int,
                     val mines: Field = Array(height) { Array(width) { Spot() }.toMutableList() }.asList()
) : Field by mines

fun Minefield.toIterator(): Iterator<Spot> {
    val a = this
    return object : Iterator<Spot> {
        var x = 0
        var y = 0
        override fun next(): Spot {
            val result = a[y][x]
            if (x < a.width - 1) {
                x += 1
            } else {
                x = 0
                y += 1
            }
            return result
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
        val maxI = if (x + 1 < width) 1 else 0
        val maxJ = if (y + 1 < height) 1 else 0
        val minI = if (x - 1 >= 0) -1 else 0
        val minJ = if (y - 1 >= 0) -1 else 0
        //future position
        var i = minI
        var j = minJ

        override fun hasNext(): Boolean {
            return j <= maxJ
        }

        override fun next(): Pair<Int, Int> {
            val next = Pair(x + i, y + j)
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

fun Minefield.unhide(x: Int, y: Int): List<Pair<Int, Int>> {
    val result: MutableList<Pair<Int, Int>> = mutableListOf()
    result.add(Pair(x, y))
    if (this[y][x].state == SpotState.Hidden) this[y][x].state = SpotState.Shown
    for ((i, j) in this.around(x, y)) {
        if (getFlags(x, y) != getMines(x, y)) break
        if (this[j][i].state == SpotState.Hidden) {
            result.addAll(unhide(i, j))
        }
    }
    return result
}

var MINE_BIT = 0b0001.toUByte()
var UNKNOWN_BIT = 0b0010.toUByte()
var SHOWN_BIT = 0b0100.toUByte()
var FLAG_BIT = 0b1000.toUByte()

fun numerify(spot: Spot): UByte {
    var result: UByte = (0).toUByte()
    if (spot.mine) result = result or MINE_BIT
    if (spot.unknown) result = result or UNKNOWN_BIT
    result = result or when (spot.state) {
        SpotState.Shown -> SHOWN_BIT
        SpotState.Flagged -> FLAG_BIT
        else -> 0.toUByte()
    }
    return result
}

fun serialize(f: Minefield): String {
    var result = "${f.width} "
    var iter = f.toIterator()
    for (s in iter) {
        result += numerify(s).toString() + " "
    }
    return result
}

fun denumerify(n: UByte): Spot {
    var result = Spot()

    result.mine = n and MINE_BIT != 0.toUByte()
    result.unknown = n and UNKNOWN_BIT != 0.toUByte()

    result.state = when {
        n and SHOWN_BIT != 0.toUByte() -> SpotState.Shown
        n and FLAG_BIT != 0.toUByte() -> SpotState.Flagged
        else -> SpotState.Hidden
    }
    return result
}

fun deserialize(data: String): Minefield {
    val _data = data.split(' ')
    val data = _data.iterator()
    val width = data.next().toInt()
    val height = _data.size / width
    val result = Minefield(width, height)

    var row = 0
    var col = 0
    for (d in data) {
        result.mines[row][col] = denumerify(d.toUByte())
        col += 1
        if (col >= width) {
            col = 0
            row += 1
        }
    }
    return result
}

fun Minefield.makeRandom(x: Int, y: Int) {
    for (s in this.toIterator()) {
        s.state = SpotState.Hidden
        s.mine = Random.nextDouble() < 0.3
    }
    for ((a, b) in this.around(x, y)) {
        this[b][a].mine = false
    }
    this[y][x].mine = false
}

fun Minefield.makeSolvable(x: Int, y: Int, p: Double) {
    val r = 1
    for ((a, b) in this.around(x, y)) {
        this[b][a].mine = false
    }
    this[y][x].mine = false

    inline fun around(f: (Int, Int) -> Unit) {
        var i = x - r
        var j = y - r
        while (true) {
            f(i, j)
            if (j == y - r && i < x + r) {
                i++
            } else if (i == x + r && j < y + r) {
                j++
            } else if (j == y + r && i > x - r) {
                i--
            } else if (i == x - r && j > y - r) {
                j--
            }
        }
    }

    around { i, j ->
        this[j][i].mine = Random.nextDouble() > p
        this[j][i].state = SpotState.Hidden
    }

}

/*fun fromASCII(f: String): Minefield {
    val rows = f.split('\n')
    val width = rows[0].length / 2
    val height = rows.size
    var field = Array(height) { Array(width) { Spot(SpotState.Hidden, false) }.toMutableList() }.asList()
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
}*/
