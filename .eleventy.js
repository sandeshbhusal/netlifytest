const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('eleventy-plugin-toc')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('static')

    eleventyConfig.setLibrary(
      'md', 
      markdownIt().use(markdownItAnchor)
    )

    eleventyConfig.addPlugin(pluginTOC, {
      tags: ['h1', 'h2', 'h3', 'h4'],
      wrapper: 'div'
    })

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
      passthroughFileCopy: true
    }
  }