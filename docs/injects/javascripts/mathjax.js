window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    packages: {
        // 支持 boldsymbol，见 https://docs.mathjax.org/en/latest/input/tex/extensions/boldsymbol.html
        '[+]': ['boldsymbol'],
        // 支持 xrightleftharpoons，见 https://docs.mathjax.org/en/latest/input/tex/extensions/mathtools.html
        '[+]': ['mathtools']
    }
  },
  loader: {load: [
    '[tex]/boldsymbol',
    '[tex]/mathtools'
  ]},
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

document$.subscribe(() => { 
  MathJax.startup.output.clearCache()
  MathJax.typesetClear()
  MathJax.texReset()
  MathJax.typesetPromise()
})