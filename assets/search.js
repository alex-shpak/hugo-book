'use strict';

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "bookSearchConfig" | default "{}" }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';
  const indexConfig = Object.assign({{ $searchConfig }}, {
    doc: {
      id: 'id',
      field: ['title', 'content'],
      store: ['title', 'href', 'section']
    }
  });

  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return
  }

  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);

  document.addEventListener('keypress', focusSearchFieldOnKeyPress);

  /**
   * @param {Event} event
   */
  function focusSearchFieldOnKeyPress(event) {
    if (event.target.value !== undefined) {
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    input.focus();
    event.preventDefault();
  }

  /**
   * @param {String} character
   * @returns {Boolean} 
   */
  function isHotkey(character) {
    const dataHotkeys = input.getAttribute('data-hotkeys') || '';
    return dataHotkeys.indexOf(character) >= 0;
  }

  function init() {
    input.removeEventListener('focus', init); // init once
    input.required = true;

    fetch(searchDataURL)
      .then(pages => pages.json())
      .then(pages => {
        window.bookSearchIndex = FlexSearch.create('balance', indexConfig);
        window.bookSearchIndex.add(pages);
      })
      .then(() => input.required = false)
      .then(search);
  }

  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value) {
      return;
    }

    const searchHits = window.bookSearchIndex.search(input.value, 10);
    searchHits.forEach(function (page) {
      const li = element('<li><a href></a><span></span><small></small></li>');
      const a = li.querySelector('a'), small = li.querySelector('small'),span = li.querySelector('span');

      a.href = page.href;
      a.textContent = page.title;
      small.textContent = page.section;

      // 使用 Promise+async 实现
      async function asyncFn() {
        let returnData = await getSomething(page.href)
        return returnData
      }

      // 因为asyncFn()返回的是 Promise对象，而不是直接返回值，所以需要.then来获取值进行操作
      asyncFn().then(content => {
        // 去除html标签
        content = content.replace(/(<([^>]+)>)/ig, '');
        // 按换行符分割成数组
        let contentArray = lengthCutting(content, 15);
        console.log(contentArray)
        contentArray.forEach(line => {
          if (line.match(/^\s+$/) || line.match(/^[ ]+$/) || line.match(/^[ ]*$/) || line.match(/^\s*$/)) {
            console.log(1+line);
            return;
          }
          if (line.search(input.value) != -1 && span.textContent == '') {
            console.log(2 + line);
            span.textContent = line;
            return;
          }
        })
        if (span.textContent == '') {
          contentArray.forEach(line => {
            if (line.match(/^\s+$/) || line.match(/^[ ]+$/) || line.match(/^[ ]*$/) || line.match(/^\s*$/)) {
              console.log(3 + line);
              return;
            }
            input.value.split('').forEach(s => {
              console.log(1111 + s)
              console.log(2222 +line) 
              if (line.search(s) != -1 && span.textContent == '') {
                console.log(4 + line);
                span.textContent = line;
                return;
              }
            })
          })
        }
        console.log(888+span.textContent)
      })

      results.appendChild(li);
    });
  }

function lengthCutting(str, num) {
  let strArr = [];

  for (let i = 0; i < str.length; i += num) strArr.push(str.slice(i, i + num));

  return strArr;
}

// 封装数据请求方法（异步）
function getSomething(link) {
  return new Promise(resolve => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      }
    }
  })
}

  /**
   * @param {String} content
   * @returns {Node}
   */
  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }
})();
