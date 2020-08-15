'use strict';
(function () {

  var settings = {
    MOBILE_BREAKPOINT: 767,
    TABLET_BREAKPOINT: 1199,
    DESKTOP_MIN_BREAKPOINT: 1200,
    TRENERS_GUTTERS: {
      SLIDER_MOBILE_GUTTER: 0,
      SLIDER_TABLET_GUTTER: 30,
      SLIDER_DESKTOP_GUTTER: 40
    },
    INVALID_FIELD_BACKGROUND_COLOR: 'rgba(209, 10, 66, 0.5)',
    VALID_FIELD_BACKGROUND_COLOR: 'transparent'
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
  var formElement = document.querySelector('.requisition-form');
  var phoneInputElement = formElement.querySelector('input[type="tel"]');
  var formSubmitButton = formElement.querySelector('button[type="submit"]');
  var customSubmitValidations = [];

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

  var indicateInvalidField = function (element, indicator) {
    element.style.backgroundColor = (indicator) ? settings.INVALID_FIELD_BACKGROUND_COLOR : settings.VALID_FIELD_BACKGROUND_COLOR;
  };

  var initRequired = function (form) {
    var inputs = form.querySelectorAll('input');
    inputs.forEach(function (input) {
      if (input.hasAttribute('required')) {
        input.setAttribute('custom-required', true);
        input.removeAttribute('required');
      }
    });
  };

  var customRequired = function (element) {
    var validityMessage = '';

    if (element.hasAttribute('custom-required')) {
      if (!element.value) {
        validityMessage += 'Это обязательное поле';
      }
    }

    element.setCustomValidity(validityMessage);

    indicateInvalidField(element, validityMessage);
  };

  var validateForm = function (form, validations) {
    var validity = 1;
    var inputs = form.querySelectorAll('input');

    inputs.forEach(function (input) {
      for (var i = 0; i < validations.length; i++) {
        validations[i](input);
      }

      validity *= input.checkValidity();

      input.reportValidity();
    });

    return validity;
  };

  var customSubmitForm = function (form) {
    if (validateForm(form, customSubmitValidations)) {
      form.submit();
    }
  };
  customSubmitValidations.push(customRequired);

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

  phoneInputElement.addEventListener('input', function () {
    var validityMessage = '';
    if (phoneInputElement.value) {
      phoneInputElement.value = phoneInputElement.value.replace(/[^0-9-()]/, '');
    }

    phoneInputElement.setCustomValidity(validityMessage);

    indicateInvalidField(phoneInputElement, validityMessage);
  });

  initRequired(formElement);

  formSubmitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    customSubmitForm(formElement);
  });

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    customSubmitForm(formElement);
  });

})();
