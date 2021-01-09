import './style.css'
import { SVG } from '@svgdotjs/svg.js'
import * as snap from 'snapsvg'

import * as s from './classical'

var t = snap('#app')
var data = snap.parse(s)
t.append(data)
// console.log(typeof(s.default));

// // var draw = SVG(s.default);
// var draw = SVG('<g><rect width="100" height="50" fill="#f06"></rect></g>').addTo('#app');
// console.log(draw);

// draw.svg("<rect><rect><rect>", true);
// console.log(typeof(c));
// document.querySelector('#app').innerHTML = draw.svg()
