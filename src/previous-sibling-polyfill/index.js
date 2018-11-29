/**
 * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
 * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
 * @param {HTMLElement} element - DOM node
 * @return {string} Unique CSS selector for the given DOM node
 */
function previousElementSiblingPolyfill(element)
{
  element = element.previousSibling
  // Loop through ignoring anything not an element
  while(element !== null)
  {
    if(element.nodeType === Node.ELEMENT_NODE)
      return element
    else
      element = element.previousSibling
  }
}

module.exports = previousElementSiblingPolyfill
