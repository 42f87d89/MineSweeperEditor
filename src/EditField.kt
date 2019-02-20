class EditField(override val field: Minefield): ButtonField(field) {
    override fun clicked(x: Int, y: Int) {
        field[y][x].mine = !field[y][x].mine
        updateButtons()
    }

    override fun updateButton(x: Int, y: Int) {
        val spot = field[y][x]
        val button = buttons[y][x]
        val mines = field.getMines(x, y)
        button.textContent = mines.toString()
        when {
            spot.mine -> button.id = "mine"
            mines == 0 -> button.id = "zero"
            else -> button.id = "empty"
        }
    }
}