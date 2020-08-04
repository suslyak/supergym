'use strict';
(function () {
  var AbonementTapsElement = document.querySelector(".abonements__taps");
  var AbonementCardsListElement = document.querySelector(".abonements__cards-list");

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

  AbonementTapsElement.classList.remove('abonements__taps--no-js');
  AbonementCardsListElement.classList.remove('abonements__cards-list--no-js');
})();
