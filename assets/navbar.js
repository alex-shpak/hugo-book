;(function () {
  var navbarItems = document.querySelectorAll('.dcl.navbar .dcl.navbar-menu .ui.menu > div.item')
  navbarItems.forEach((menuItem) => {
    menuItem.querySelectorAll('a.item').forEach((link) => {
      var parent = menuItem.querySelector('a.item')
      link.addEventListener('click', function (event) {
        if (window.analytics) {
          window.analytics.track('Clicked on navbar', {
            section: parent.textContent.toLowerCase(),
            submenu: parent.textContent !== event.target.textContent ? event.target.textContent.toLowerCase() : undefined,
          })
        }
      })
    })
  })
})()
