open class PlayBehaviour: Behaviour() {
    override fun clicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        when(field[y][x].state) {
            SpotState.Hidden -> field[y][x].state = SpotState.Flagged
            SpotState.Flagged -> field[y][x].state = SpotState.Hidden
            else -> {
                return field.unhide(x, y)
            }
        }
        return listOf(Pair(x, y))
    }

    override fun doubleClicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        field[y][x].state = SpotState.Shown //This only matters when the second click leaves a flagged spot, as unhide won't work then
        return field.unhide(x, y)
    }
}