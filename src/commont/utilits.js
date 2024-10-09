/**
 * Handle key press events to restrict input based on a regular expression.
 * @param {KeyboardEvent} evt - The keyboard event triggered on key press.
 * @param {RegExp} [reg] - Optional regular expression to test the key pressed. Defaults to allowing only numbers.
 */
export const onKeyPress = (evt, reg) => {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = reg ? reg : /^[0-9\b]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
};