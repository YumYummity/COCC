// ==UserScript==
// @name         COCC - Chrome On Crack Client
// @namespace    https://www.guilded.gg/i/Eqz4YlD2
// @version      0.5
// @description  COCC (Chrome On Crack Client) is a utility client designed for Tampermonkey with many features.
// @author       YumYummity
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

var script = document.createElement('script');
script.src = 'https://raw.githubusercontent.com/YumYummity/COCC/main/code/code.js';
document.head.appendChild(script);
