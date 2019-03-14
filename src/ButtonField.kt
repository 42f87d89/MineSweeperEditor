import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.HTMLSelectElement
import kotlin.browser.document

open class Behaviour {
    open fun clicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        return emptyList()
    }

    open fun doubleClicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        return emptyList()
    }
}

class ButtonField(private var minefield: Minefield) {
    private val buttons = Array(minefield.size) {
        Array(minefield[0].size) {
           document.createElement("button") as HTMLButtonElement
        }.asList()
    }.asList()
    var behaviour: Behaviour = Behaviour()

    constructor(width: Int, height: Int) : this(Minefield(width, height))

    private fun updateButtons() {
        for (y in 0 until minefield.height) {
            for (x in 0 until minefield.width) {
                updateButton(x, y)
            }
        }
    }

    private fun updateButton(x: Int, y: Int) {
        val spot = minefield[y][x]
        val button = buttons[y][x]
        button.textContent = minefield.getMines(x, y).toString()
        when {
            spot.state == SpotState.Shown -> when {
                spot.mine -> button.id = "mine"
                spot.unknown -> button.id = "unknown"
                minefield.getMines(x, y) == 0 -> button.id = "zero"
                else -> button.id = "empty"
            }
            spot.state == SpotState.Flagged -> button.id = "flag"
            else -> button.id = "hidden"
        }
    }

    fun setUpField() {
        var main = document.getElementById("Minefield") as HTMLDivElement
        for (row in 0 until buttons.size) {
            var curRow = document.createElement("div") as HTMLDivElement
            for (col in 0 until buttons[0].size) {
                var b = buttons[row][col]
                updateButton(col, row)
                b.onclick = {
                    val r = behaviour.clicked(minefield, col, row)
                    r.forEach { (x, y) -> updateButton(x, y) }
                }
                b.ondblclick = {
                    val r = behaviour.doubleClicked(minefield, col, row)
                    r.forEach { (x, y) -> updateButton(x, y) }
                }
                curRow.appendChild(b)
            }
            main.appendChild(curRow)
        }
        updateButtons()

        val getById = {id: String -> document.getElementById(id)}

        val saveButton = getById("save") as HTMLInputElement
        val loadButton = getById("load") as HTMLInputElement
        val dataBox = getById("data") as HTMLInputElement
        val modeSelector = getById("mode") as HTMLSelectElement

        saveButton.onclick = {
            dataBox.value = Serializer.serialize(minefield)
            Unit
        }
        loadButton.onclick = {
            minefield = Serializer.deserialize(dataBox.value)
            updateButtons()
        }
        modeSelector.onclick = {
            when (modeSelector.value) {
                "Edit Mode" -> behaviour = EditBehaviour
                "Play Mode" -> behaviour = PlayBehaviour
            }
        }
    }
}
