//Using Browserify for Node Modules to be run in the browser (client-side).
// browserify views/rez_bundle1.js --standalone rezBundle > views/bundle.js (see box_notes)

var Mousetrap = require('mousetrap');
var copy = require('clipboard-copy');

module.exports = {
  Mousetrap: Mousetrap,
  copy: copy
}