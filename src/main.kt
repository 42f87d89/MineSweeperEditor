import kotlin.browser.window

fun main(args: Array<String>) {
    val mainField = deserialize(serialize(fromASCII(
              "[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[X] [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ ] [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [ [ [ [ [ [ [ [ [ [ [ [ [ [ \n" +
                "[ [ [ [ [ [ [X[X[ [X[X[ [ [ [ [ \n" +
                "[ [ [ [ [ [ [X[ [ [ [X[ [ [ [ [ \n" +
                "[ [ [X[X[X[X[X[ [ [ [X[X[ [ [ [ ")))
    val buttons = ButtonField(mainField)
    window.onload = { buttons.setUpField()}
}

