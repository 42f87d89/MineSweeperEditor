open class PlayBehaviour() : Behaviour() {
    override fun clicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        when(field[y][x].state) {
            SpotState.Hidden -> field[y][x].state = SpotState.Flagged
            SpotState.Flagged -> field[y][x].state = SpotState.Hidden
            else -> {
                return field.unhide(x, y)
            }
        }
        return emptyList()
    }

    override fun doubleClicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        return field.unhide(x, y)
    }
}