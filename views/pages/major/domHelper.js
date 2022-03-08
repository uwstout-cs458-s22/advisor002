export function makeElement(tagName, childNodeOrText, attributes) {
    // Make the element
    const newElem = document.createElement(tagName)

    // Make and append a text node or directly append child node
    if (typeof childNodeOrText === 'string') {
        const newTextNode = document.createTextNode(childNodeOrText)
        newElem.appendChild(newTextNode)
    } else if (typeof childNodeOrText === 'object' && childNodeOrText instanceof Node) {
        newElem.appendChild(childNodeOrText)
    }

    // Process attribute object
    for (const attribute in attributes) {
        newElem.setAttribute(attribute, attributes[attribute])
    }

    // Return the constructed element
    return newElem;
}