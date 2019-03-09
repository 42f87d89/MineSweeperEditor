class EditBehaviour: Behaviour() {
    override fun clicked(field: Minefield, x: Int, y: Int): List<Pair<Int, Int>> {
        field[y][x].mine = !field[y][x].mine
        return listOf(Pair(x, y))
    }
}