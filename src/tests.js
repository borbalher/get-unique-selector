const
assert            = require('chai').assert,
fs                = require('fs'),
path              = require('path')

describe('getUniqueCssSelector tests', () =>
{
  describe('getPath tests', () =>
  {
    before(() =>
    {
      const HTML = fs.readFileSync(path.join(__dirname, 'get-selector-test.html'), 'utf-8')
      this.jsdom = require('jsdom-global')(HTML)
    })

    after(() =>
    {
      this.jsdom()
    })

    it('should get the second topic paragraph', () =>
    {
      const
      getUniqueSelector = require('.'),
      element           = document.querySelectorAll('.topic-title')[1],
      selector          = getUniqueSelector(element),
      domElement        = document.querySelector(selector)
      assert(domElement.isSameNode(element) === true)
    })

    it('should return false when element is not HTMLElement', () =>
    {
      const
      getUniqueSelector = require('.'),
      selector          = getUniqueSelector({})

      assert(selector === false)
    })
  })

  describe('previousSiblingPolyfill tests', () =>
  {
    before(() =>
    {
      const HTML = fs.readFileSync(path.join(__dirname, 'polyfill-test.html'), 'utf-8')
      this.jsdom = require('jsdom-global')(HTML)
    })

    after(() =>
    {
      this.jsdom()
    })

    it('should get #previous-sibling from #starting-point (separated by text nodes)', () =>
    {
      const
      getPrevious     = require('./previous-sibling-polyfill'),
      element         = window.document.querySelector('#starting-point'),
      previousElement = getPrevious(element),
      previousSibling = document.querySelector('#previous-sibling')

      assert(previousElement.isSameNode(previousSibling) === true)
    })
  })
})
