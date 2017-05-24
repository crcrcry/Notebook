// Greeter.js
var text = require('../static/data');
module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent = text.greetText;
    return greet;
};