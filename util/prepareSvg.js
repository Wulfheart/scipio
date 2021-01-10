"use strict";
exports.__esModule = true;
var fs = require("fs");
var jsdom_1 = require("jsdom");
var file = fs.readFileSync('../example/classical.svg', 'utf8');
var dom = new jsdom_1.JSDOM(file, {
// contentType: "image/svg+xml"
});
var groups = ['unit-positions'];
groups.forEach(function (group) {
    var gElement = dom.window.document.querySelector("g[inkscape:label=" + group + "]");
    // gElement.attributes.setNamedItem('id') = gElement.attributes.getNamedItem('inkscape:label');
    applyInkscapeLabels(gElement);
});
fs.writeFileSync('../example/classic2.svg', dom.serialize());
fs.writeFileSync('../dev/classical.js', "\nwindow.classical = `\n" + dom.serialize() + "\n`\n");
function applyInkscapeLabels(elem) {
    var il = elem.attributes.getNamedItem('inkscape:label').textContent;
    if (il != null) {
        elem.id = il;
    }
    if (elem.hasChildNodes()) {
        var children = elem.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            applyInkscapeLabels(child);
        }
    }
}
