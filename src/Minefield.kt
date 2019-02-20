import kotlin.js.Math.random;

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
        result += when (spot.state) {
            SpotState.Shown -> SpotState.Shown.ordinal * 2
            SpotState.Hidden -> SpotState.Hidden.ordinal * 2
            SpotState.Flagged -> SpotState.Flagged.ordinal * 2
        }
        return result
    }

    fun base36(n: Int): Char {
        when (n) {
            10 -> return 'a'
            11 -> return 'b'
            12 -> return 'c'
            13 -> return 'd'
            14 -> return 'e'
            15 -> return 'f'
            16 -> return 'g'
            17 -> return 'h'
            18 -> return 'i'
            19 -> return 'j'
            20 -> return 'k'
            21 -> return 'l'
            22 -> return 'm'
            23 -> return 'n'
            24 -> return 'o'
            25 -> return 'p'
            26 -> return 'q'
            27 -> return 'r'
            28 -> return 's'
            29 -> return 't'
            30 -> return 'u'
            31 -> return 'v'
            32 -> return 'w'
            33 -> return 'x'
            34 -> return 'y'
            35 -> return 'z'
            else -> return n.toString()[0]
        }
    }

    var result = "${f.width} "
    var iter = f.toIterator()
    var i = 0
    for (s in iter) {
        var num = numerify(s)
        if (iter.hasNext() && i < f.width) num += 6 * numerify(iter.next())
        else i = 0
        result += base36(num)
    }
    return result
}

fun deserialize(data: String): Minefield {
    fun denumerify(n: Int): Spot {
        val statenum = n / 2
        return Spot(
                when (statenum) {
                    SpotState.Shown.ordinal -> SpotState.Shown
                    SpotState.Hidden.ordinal -> SpotState.Hidden
                    else -> SpotState.Flagged
                }
                , n % 2 == 1)
    }

    fun base36(n: Char): Int {
        when (n) {
            'a' -> return 10
            'b' -> return 11
            'c' -> return 12
            'd' -> return 13
            'e' -> return 14
            'f' -> return 15
            'g' -> return 16
            'h' -> return 17
            'i' -> return 18
            'j' -> return 19
            'k' -> return 20
            'l' -> return 21
            'm' -> return 22
            'n' -> return 23
            'o' -> return 24
            'p' -> return 25
            'q' -> return 26
            'r' -> return 27
            's' -> return 28
            't' -> return 29
            'u' -> return 30
            'v' -> return 31
            'w' -> return 32
            'x' -> return 33
            'y' -> return 34
            'z' -> return 35
            else -> return n.toString().toInt()
        }
    }

    val asd = data.split(' ')
    val field = asd[1]
    val width = asd[0].toInt()
    val height = field.length / width * 2
    val result = Minefield(width, height)

    var i = 0
    var j = 0
    for (c in field) {
        val num = base36(c)
        val spot1 = denumerify(num % 6)
        result[j][i].state = spot1.state
        result[j][i].mine = spot1.mine
        i += 1
        if (i > width - 1) {
            i = 0
            j += 1
            continue
        }
        val spot2 = denumerify((num - num % 6) / 6)
        result[j][i].state = spot2.state
        result[j][i].mine = spot2.mine
        i += 1
        if (i > width - 1) {
            i = 0
            j += 1
        }
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

fun Minefield.makeRandom(x: Int, y: Int) {
    for (s in this.toIterator()) {
        s.state = SpotState.Hidden
        s.mine = random() < 0.3
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
        this[j][i].mine = random() > p
        this[j][i].state = SpotState.Hidden
    }

}