var asciidoc_list = $("#toc > ul");

if (asciidoc_list.length > 0) {
    // Add new sub item to right nav
    var right_toc = $("body > main > aside.book-toc")[0];
    right_toc.innerHTML += "<nav id='TableOfContents'> </nav>";

    // Take content from central asciidoc nav to right side
    var new_nav = $("body > main > aside.book-toc > nav")[0];
    new_nav.append(asciidoc_list[0]);

    // Remove all "Table of Contents" from central asciidoc
    $("#toctitle")[0].remove();
}