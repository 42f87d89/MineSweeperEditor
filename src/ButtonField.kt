import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import kotlin.browser.document

data class ButtonField (val field: Minefield,
                        var buttons: List<List<HTMLButtonElement>> = Array(field.height) { Array(field.width) { document.createElement("button") as HTMLButtonElement }.asList() }.asList()
                        ) : List<List<HTMLButtonElement>> by buttons

fun ButtonField.clicked(x: Int, y: Int) {
    when {
        field[y][x].state == SpotState.Hidden -> field[y][x].state = SpotState.Flagged
        field[y][x].state == SpotState.Flagged -> field[y][x].state = SpotState.Hidden
        else -> {
            field.unhide(x, y)
            updateButtons(field)
        }
    }
    updateButton(x, y)
}

fun ButtonField.doubleClicked(x: Int, y: Int) {
    field.unhide(x, y)
    updateButtons(field)
}

fun ButtonField.updateButtons(field: Minefield) {
    for (y in 0 until field.height) {
        for (x in 0 until field.width) {
            updateButton(x, y)
        }
    }
}

fun ButtonField.updateButton(x: Int, y: Int) {
    val spot = field[y][x]
    val button = buttons[y][x]
    when {
        spot.state == SpotState.Shown -> when {
            spot.mine -> button.id = "mine"
            field.getMines(x, y) == 0 -> buttons[y][x].id = "zero"
            else -> button.id = "empty"
        }
        spot.state == SpotState.Flagged -> button.id = "flag"
        else -> button.id = "hidden"
    }
}

fun ButtonField.setUpField() {
    var main = document.createElement("div") as HTMLDivElement
    main.id = "Minefield"
    for (row in 0 until field.size) {
        var curRow = document.createElement("div") as HTMLDivElement
        for(col in 0 until field[0].size) {
            var b = buttons[row][col]
            b.textContent = field.getMines(col, row).toString()
            updateButton(col, row)
            b.onclick = { clicked(col, row) }
            b.ondblclick = { doubleClicked(col, row) }
            curRow.appendChild(b)
        }
        main.appendChild(curRow)
    }
    document.body!!.appendChild(main)
}
