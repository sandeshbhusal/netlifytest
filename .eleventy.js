const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('eleventy-plugin-toc')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('static')

    eleventyConfig.setLibrary(
      'md', 
      markdownIt().use(markdownItAnchor)
    )

    eleventyConfig.addPlugin(pluginTOC, {
      tags: ['h2', 'h3'],
      wrapper: 'div'
    })

    return {
      passthroughFileCopy: true
    }
  }