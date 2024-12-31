(function () {
  let tocLinks = document.querySelectorAll("#TableOfContents li");
  let tocInput = document.getElementById("toc-control");
  tocLinks.forEach(l =>
    l.addEventListener("click",
      () => tocInput.checked = false));
})();
(function () {
  let menuLabel = document.querySelector("label[for='menu-control']");
  let menuInput = document.getElementById("menu-control");
  let tocInput = document.getElementById("toc-control");
  menuLabel.addEventListener("click",
    function () {
      if (!menuInput.checked) {
        tocInput.checked = false;
      }
    });
})();
