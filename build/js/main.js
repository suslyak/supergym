'use strict';
(function () {
  if (typeof window !== 'undefined' && window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  if (!HTMLInputElement.prototype.reportValidity) {
    HTMLInputElement.prototype.reportValidity = function () {
      if (this.checkValidity()) {
        return true;
      } else {
        return false;
      }
    };
  }
})();
