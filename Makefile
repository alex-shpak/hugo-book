# run: make
SHELL := /bin/bash

static_css:
	sass assets/book.scss > assets/book.static.css

test:
	cd exampleSite && hugo --themesDir ../.. --theme monako-book