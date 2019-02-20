import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import kotlin.browser.document

open class ButtonField (open val field: Minefield,
                        val buttons: List<List<HTMLButtonElement>> = Array(field.height) { Array(field.width) { document.createElement("button") as HTMLButtonElement }.asList() }.asList()
) {
    open fun clicked(x: Int, y: Int) {
        field.makeRandom(x, y)
        field.unhide(x, y)
        document.body!!.removeChild(document.getElementById("Minefield")!!)
        PlayField(field).setUpField()
    }

    open fun doubleClicked(x: Int, y: Int) {
    }

    fun updateButtons() {
        for (y in 0 until field.height) {
            for (x in 0 until field.width) {
                updateButton(x, y)
            }
        }
    }

    open fun updateButton(x: Int, y: Int) {
        val spot = field[y][x]
        val button = buttons[y][x]
        button.textContent = field.getMines(x, y).toString()
        when {
            spot.state == SpotState.Shown -> when {
                spot.mine -> button.id = "mine"
                field.getMines(x, y) == 0 -> button.id = "zero"
                else -> button.id = "empty"
            }
            spot.state == SpotState.Flagged -> button.id = "flag"
            else -> button.id = "hidden"
        }
    }

    fun setUpField() {
        var main = document.createElement("div") as HTMLDivElement
        main.id = "Minefield"
        for (row in 0 until field.size) {
            var curRow = document.createElement("div") as HTMLDivElement
            for(col in 0 until field[0].size) {
                var b = buttons[row][col]
                updateButton(col, row)
                b.onclick = { clicked(col, row) }
                b.ondblclick = { doubleClicked(col, row) }
                curRow.appendChild(b)
            }
            main.appendChild(curRow)
        }
        document.body!!.appendChild(main)
    }
}
