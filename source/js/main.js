'use strict';
(function () {

  var settings = {
    MOBILE_BREAKPOINT: 767,
    TABLET_BREAKPOINT: 1023,
    DESKTOP_MIN_BREAKPOINT: 1024,
    TRENERS_GUTTERS: {
      SLIDER_MOBILE_GUTTER: 0,
      SLIDER_TABLET_GUTTER: 30,
      SLIDER_DESKTOP_GUTTER: 40
    }
  };

  var AbonementTapsFormElement = document.querySelector('.abonements__taps');
  var AbonementTapsRadioElements = AbonementTapsFormElement.querySelectorAll('input[name="mounth"]');
  var AbonementCardsListElement = document.querySelector('.abonements__cards-list');
  var ArrowsElements = document.querySelectorAll('.arrow-control');
  var TrenersContainerElement = document.querySelector('.treners__container');
  var TrenersListElement = TrenersContainerElement.querySelector('.treners__treners-list');
  var TrenersControlForward = TrenersContainerElement.querySelector('.arrow-control--forward');
  var TrenersControlBackward = TrenersContainerElement.querySelector('.arrow-control--backward');
  var ReviewsContainerElement = document.querySelector('.reviews__container');
  var ReviewsListElement = ReviewsContainerElement.querySelector('.reviews__list');
  var ReviewsControlForward = ReviewsContainerElement.querySelector('.arrow-control--forward');
  var ReviewsControlBackward = ReviewsContainerElement.querySelector('.arrow-control--backward');

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
  TrenersListElement.classList.remove('treners__treners-list--no-js');
  ReviewsListElement.classList.remove('reviews__list--no-js');
  ArrowsElements.forEach(function (element) {
    element.classList.remove('arrow-control--no-js');
  });

  var switchAbonements = function (data) {
    var abonementCardElements = AbonementCardsListElement.querySelectorAll('.abonements__card');

    abonementCardElements.forEach(function (card) {
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

  var getGutter = function (parameter) {
    var gutter = 0;

    var mediaQueries = [
      {
        gutter: parameter.SLIDER_MOBILE_GUTTER,
        query: window.matchMedia('(max-width:' + settings.MOBILE_BREAKPOINT + 'px)')
      },
      {
        gutter: parameter.SLIDER_TABLET_GUTTER,
        query: window.matchMedia('(max-width:' + settings.TABLET_BREAKPOINT + 'px) and (min-width:' + (settings.MOBILE_BREAKPOINT + 1) + 'px)')
      },
      {
        gutter: parameter.SLIDER_DESKTOP_GUTTER,
        query: window.matchMedia('(min-width:' + settings.DESKTOP_MIN_BREAKPOINT + 'px)')
      }
    ];

    for (var i = 0; i < mediaQueries.length; i++) {
      gutter = gutter + mediaQueries[i].gutter * mediaQueries[i].query.matches;

    }

    return gutter;
  };

  var slideForward = function (element, viewport, gutters) {
    var gutter = 0;

    if (gutters) {
      gutter = getGutter(gutters);
    }

    if (element.scrollWidth - Math.abs(element.offsetLeft) > viewport.offsetWidth) {
      element.style.left = element.offsetLeft - element.offsetWidth - gutter + 'px';
    } else {
      element.style.left = '0px';
    }
  };

  var slideBackward = function (element, viewport, gutters) {
    var gutter = 0;

    if (gutters) {
      gutter = getGutter(gutters);
    }

    if (Math.abs(element.offsetLeft) < viewport.offsetWidth) {
      element.style.left = viewport.offsetWidth - element.scrollWidth + 'px';
    } else {
      element.style.left = element.offsetLeft + element.offsetWidth + gutter + 'px';
    }
  };

  initAbonements(1);

  AbonementTapsRadioElements.forEach(function (element) {
    element.addEventListener('change', function () {
      switchAbonements(element.value);
    });
  });

  TrenersControlForward.addEventListener('click', function () {
    slideForward(TrenersListElement, TrenersContainerElement, settings.TRENERS_GUTTERS);
  });

  TrenersControlBackward.addEventListener('click', function () {
    slideBackward(TrenersListElement, TrenersContainerElement, settings.TRENERS_GUTTERS);
  });

  ReviewsControlForward.addEventListener('click', function () {
    slideForward(ReviewsListElement, ReviewsContainerElement);
  });

  ReviewsControlBackward.addEventListener('click', function () {
    slideBackward(ReviewsListElement, ReviewsContainerElement);
  });

})();
