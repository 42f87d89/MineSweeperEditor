import kotlin.browser.window

fun main(args: Array<String>) {
    val field = deserialize("12 " +
            "1 0 0 0 0 0 0 5 0 0 0 0 " +
            "0 0 0 0 0 0 0 0 0 0 0 0 " +
            "0 0 2 0 0 0 0 4 0 0 0 0 " +
            "0 0 0 0 0 2 3 0 0 0 0 0 " +
            "1 0 0 0 0 0 0 0 0 0 0 0")
    val buttons = ButtonField(field)

    window.onload = { buttons.setUpField() }
}

