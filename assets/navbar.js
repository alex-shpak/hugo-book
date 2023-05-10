;(function () {
  var navbarItems = document.querySelectorAll('.dcl.navbar .dcl.navbar-menu .ui.menu > div.item')
  navbarItems.forEach((menuItem) => {
    menuItem.addEventListener('mouseenter', function (event) {
      var submenu = event.target.querySelector('.item.submenu')
      if (submenu) {
        submenu.classList.add('active')
      }
    })
    menuItem.addEventListener('mouseleave', function (event) {
      var submenu = event.target.querySelector('.item.submenu')
      if (submenu && submenu.classList.contains('active')) {
        submenu.classList.remove('active')
      }
    })
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
