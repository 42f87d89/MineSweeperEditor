import kotlin.browser.window

@ExperimentalUnsignedTypes
fun main(args: Array<String>) {
    val field = Serializer.deserialize("12 " +
            "1 0 0 0 0 0 0 5 0 0 0 0 " +
            "0 0 0 0 0 0 0 0 0 0 0 0 " +
            "0 0 2 0 0 0 0 4 0 0 0 0 " +
            "0 0 0 0 0 2 3 0 0 0 0 0 " +
            "1 0 0 0 0 0 0 0 0 0 0 0")
    val buttons = ButtonField(field)
    buttons.behaviour = PlayBehaviour

    window.onload = { buttons.setUpField() }
}

