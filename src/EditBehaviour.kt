object EditBehaviour: Behaviour() {
    override fun clicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        field[y][x].mine = !field[y][x].mine
        return listOf(Pair(x, y))
    }

    override fun doubleClicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        field[y][x].state = when (field[y][x].state) {
            SpotState.Shown -> SpotState.Hidden
            SpotState.Hidden -> SpotState.Shown
            else -> field[y][x].state
        }
        return listOf(Pair(x, y))
    }
}