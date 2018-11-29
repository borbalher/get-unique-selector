const previousPolyfill = require('./previous-sibling-polyfill')

/**
 * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
 * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
 * @param {HTMLElement} element - DOM node
 * @return {string} Unique CSS selector for the given DOM node
 */
function previousElementSibling(element)
{
  if(element.previousElementSibling !== 'undefined')
    return element.previousElementSibling
  else
    return previousPolyfill(element)
}

/**
 * Get a unique CSS selector for a given DOM node
 * @param {HTMLElement} element - DOM node
 * @return {string} Unique CSS selector for the given DOM node
 */
function getPath(element)
{
  // False on non-elements
  if(!(element instanceof HTMLElement))
    return false

  const path = []
  while(element !== null && element.nodeType === Node.ELEMENT_NODE) // If element is null it's the end of partial. It's a loose element which has, sofar, not been attached to a parent in the node tree.
  {
    let selector = element.nodeName

    if(element.id)
    {
      selector += `#${element.id}`
    }
    else
    {
      let
      sibling           = element, // Walk backwards until there is no previous sibling
      siblingSelectors  = [] // Will hold nodeName to join for adjacent selection

      while(sibling !== null && sibling.nodeType === Node.ELEMENT_NODE)
      {
        siblingSelectors.unshift(sibling.nodeName)
        sibling = previousElementSibling(sibling)
      }

      // :first-child does not apply to HTML
      if(siblingSelectors[0] !== 'HTML')
        siblingSelectors[0] = siblingSelectors[0] + ':first-child'

      selector = siblingSelectors.join(' + ')
    }
    path.unshift(selector)
    element = element.parentNode
  }

  return path.join(' > ')
}

module.exports = getPath
