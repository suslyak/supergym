'use strict';
(function () {
  var AbonementTapsFormElement = document.querySelector('.abonements__taps');
  var AbonementTapsRadioElements = AbonementTapsFormElement.querySelectorAll('input[name="mounth"]');
  var AbonementCardsListElement = document.querySelector('.abonements__cards-list');

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

  AbonementTapsFormElement.classList.remove('abonements__taps--no-js');
  AbonementCardsListElement.classList.remove('abonements__cards-list--no-js');

  var switchAbonements = function (data) {
    var abonementCards = AbonementCardsListElement.querySelectorAll('.abonements__card');

    abonementCards.forEach(function (card) {
      if (parseInt(card.getAttribute('slider-data-mounth'), 10) !== parseInt(data, 10)) {
        card.classList.add('abonements__card--hide');
      } else {
        card.classList.remove('abonements__card--hide');
      }
    });
  };

  var initAbonements = function () {
    switchAbonements(1);
  };

  initAbonements(1);

  AbonementTapsRadioElements.forEach(function (element) {
    element.addEventListener('change', function () {
      switchAbonements(element.value);
    });
  });

})();
