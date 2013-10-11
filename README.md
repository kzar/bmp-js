BMP-js
======

Javascript parser for BMP files. Demo of [bitratchet.js](https://github.com/kzar/bitratchet-js) usage / an experiment to see how well bitratchet fares on large files.

Usage
-----

       git clone https://github.com/kzar/bmp-js
       cd bmp-js
       git submodule update --init --recursive
       python -m SimpleHTTPServer 8000
       # Then browse to http://localhost:8000/demo

(For reference check out [the bitratchet.js documentation](https://github.com/kzar/bitratchet-js).)

Status
------

 - Basics of file spec have been implemented and appear to work.
 - Wrote demo that displays header as JSON and pixels on a HTML canvas.
 - Things like alpha channel, non 24bit bits_per_pixel, compression, colour palettes, different dib versions have not been implemented.

Cheers, Dave.