// ==UserScript==
// @name         COCC - Chrome On Crack Client
// @namespace    https://www.guilded.gg/i/Eqz4YlD2
// @version      0.5
// @description  COCC (Chrome On Crack Client) is a utility client designed for Tampermonkey with many features.
// @author       YumYummity
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
  'use strict';

  // Use GM_xmlhttpRequest to fetch the script content
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/YumYummity/COCC/main/code/code.js',
    onload: function(response) {
      if (response.status === 200) {
        // Script content loaded successfully
        var scriptContent = response.responseText;
        // Use eval to execute the script
        eval(scriptContent);
        console.log('Script loaded and executed successfully.');
      } else {
        console.error('Failed to load script:', response.statusText);
      }
    },
    onerror: function(error) {
      console.error('Failed to load script:', error.statusText);
    }
  });
})();
