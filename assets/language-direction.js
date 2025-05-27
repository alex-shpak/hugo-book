document.querySelectorAll('.book-article p').forEach(articleElement => {
    const text = articleElement.textContent.trim();
    if (/[\u0590-\u05FF]/.test(text)) {
        articleElement.setAttribute("dir", "rtl");
    } else {
        articleElement.setAttribute("dir", "ltr");
    }
});