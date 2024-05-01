;(function () {
  var urlAnchor = window.location.hash.substring(1); // Get the anchor from the URL
  var detailsElement = document.getElementById(urlAnchor); // Get the details element with the id that matches the anchor
  if (detailsElement) {
    detailsElement.toggleAttribute('open', true); // Add the 'open' attribute
  }
})();
