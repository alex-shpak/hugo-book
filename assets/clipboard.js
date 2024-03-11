(function () {
  function select(element) {
    const selection = window.getSelection();

    const range = document.createRange();
    range.selectNodeContents(element);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  document.addEventListener("click", onCodeblock, { capture: true });

  function onCodeblock(event) {
    const code = event.target.closest("pre code");
    if (!code || window.getSelection().toString()) return
    select(code.parentElement);
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(code.parentElement.textContent);
  }
})();
