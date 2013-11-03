BMP-js
======

Javascript parser for BMP files. Demo of [bitratchet.js](https://github.com/kzar/bitratchet-js) usage / an experiment to see how well bitratchet fares on large files.

Demo
----

There's [a demo running on Plunkr here](http://plnkr.co/edit/y1Re1GCby0fVN4gkHaQo?p=info), check it out.

Usage
-----

       git clone https://github.com/kzar/bmp-js
       cd bmp-js
       git submodule update --init --recursive
       python -m SimpleHTTPServer 8000
       # Then browse to http://localhost:8000/demo

(For reference check out [the bitratchet.js documentation](https://github.com/kzar/bitratchet-js).)

Tests
-----

Tests are a work in progress but to run them just type `karma start karma.conf.js`.

Status
------

 - Basics of file spec have been implemented and appear to work.
 - Wrote demo that displays header as JSON and pixels on a HTML canvas.
 - Things like alpha channel, non 24bit bits_per_pixel, compression, colour palettes, different dib versions have not been implemented.

Cheers, Dave.
