import * as fs from 'fs';
import { JSDOM } from 'jsdom';
var file: string = fs.readFileSync('../example/classical.svg', 'utf8');
const dom = new JSDOM(file, {
    // contentType: "image/svg+xml"
  })    


const groups = ['unit-positions'] 
groups.forEach(group => {
    var gElement = dom.window.document.querySelector(`g[inkscape:label=${group}]`) as SVGElement;
    // gElement.attributes.setNamedItem('id') = gElement.attributes.getNamedItem('inkscape:label');
    
    applyInkscapeLabels(gElement)
    

    
});

fs.writeFileSync('../example/classic2.svg', dom.serialize());
fs.writeFileSync('../dev/classical.js', `
window.classical = \`
${dom.serialize()}
\`
`);

function applyInkscapeLabels(elem: SVGElement) {
    var il: string = elem.attributes.getNamedItem('inkscape:label').textContent;
    if(il != null){
        elem.id = il;
    }
    if(elem.hasChildNodes()){
        var children = elem.children 
        for (let i = 0; i < children.length; i++) {
            var child = children[i] as SVGElement;
            applyInkscapeLabels(child)
        }
    }
}


