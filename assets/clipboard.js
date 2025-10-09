(function () {
  document.querySelectorAll("pre:has(code)").forEach(code => {
    code.addEventListener("click", code.focus);
    code.addEventListener("copy", function (event) {
      event.preventDefault();
      if (navigator.clipboard) {
        const content = window.getSelection().toString() || code.textContent;
        navigator.clipboard.writeText(content);
      }
    });
  });
})();
