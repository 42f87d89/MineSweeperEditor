open class PlayField(override val field: Minefield) : ButtonField(field) {
    override fun clicked(x: Int, y: Int) {
        when {
            field[y][x].state == SpotState.Hidden -> field[y][x].state = SpotState.Flagged
            field[y][x].state == SpotState.Flagged -> field[y][x].state = SpotState.Hidden
            else -> {
                field.unhide(x, y)
                updateButtons()
            }
        }
        updateButton(x, y)
    }

    override fun doubleClicked(x: Int, y: Int) {
        field.unhide(x, y)
        updateButtons()
    }

    override fun updateButton(x: Int, y: Int) {
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
}