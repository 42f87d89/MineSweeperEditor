import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import kotlin.browser.document
import kotlin.browser.window

val f = fromASCII(
              "[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[X] [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ ] [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [ [ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [ [ [ [ [X[X[ [X[X[ [ [ [ [ \n" +
                "[ [ [ [ [ [ [X[ [ [ [X[ [ [ [ [ \n" +
                "[ [ [X[X[X[X[X[ [ [ [X[X[ [ [ [ ")
val buttons = Array(f.size) { Array(f[0].size) { document.createElement("button") as HTMLButtonElement }}
fun main(args: Array<String>) {
    window.onload = { setUpField(f)}
}

fun clicked(x: Int, y: Int) {
    when {
        f[y][x].state == SpotState.Hidden -> f[y][x].state = SpotState.Flagged
        f[y][x].state == SpotState.Flagged -> f[y][x].state = SpotState.Hidden
        else -> {
            f.unhide(x, y)
            updateButtons()
        }
    }
    updateButton(x, y)
}

fun doubleClicked(x: Int, y: Int) {
    f.unhide(x, y)
    updateButtons()
}

fun updateButtons() {
    for (y in 0 until f.height) {
        for (x in 0 until f.width) {
            updateButton(x, y)
        }
    }
}

fun updateButton(x: Int, y: Int) {
    val spot = f[y][x]
    val button = buttons[y][x]
    when {
        spot.state == SpotState.Shown -> when {
            spot.mine -> button.id = "mine"
            f.getMines(x, y) == 0 -> buttons[y][x].id = "zero"
            else -> button.id = "empty"
        }
        spot.state == SpotState.Flagged -> button.id = "flag"
        else -> button.id = "hidden"
    }
}

fun setUpField(field: Minefield) {
    var main = document.createElement("div") as HTMLDivElement
    for (row in 0 until field.size) {
        var curRow = document.createElement("div") as HTMLDivElement
        for(col in 0 until field[0].size) {
            var b = buttons[row][col]
            b.textContent = f.getMines(col, row).toString()
            updateButton(col, row)
            b.onclick = { clicked(col, row) }
            b.ondblclick = { doubleClicked(col, row) }
            curRow.appendChild(b)
        }
        main.appendChild(curRow)
    }
    document.body!!.appendChild(main)
    println(serialize(f))
}