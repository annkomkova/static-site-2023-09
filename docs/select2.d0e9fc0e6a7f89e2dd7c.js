/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/js-cookie/dist/js.cookie.mjs
/*! js-cookie v3.0.5 | MIT */
/* eslint-disable no-var */
function js_cookie_assign (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      target[key] = source[key];
    }
  }
  return target
}
/* eslint-enable no-var */

/* eslint-disable no-var */
var defaultConverter = {
  read: function (value) {
    if (value[0] === '"') {
      value = value.slice(1, -1);
    }
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  write: function (value) {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
};
/* eslint-enable no-var */

/* eslint-disable no-var */

function init (converter, defaultAttributes) {
  function set (name, value, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = js_cookie_assign({}, defaultAttributes, attributes);

    if (typeof attributes.expires === 'number') {
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString();
    }

    name = encodeURIComponent(name)
      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName;

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }

    return (document.cookie =
      name + '=' + converter.write(value, name) + stringifiedAttributes)
  }

  function get (name) {
    if (typeof document === 'undefined' || (arguments.length && !name)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split('=');
      var value = parts.slice(1).join('=');

      try {
        var found = decodeURIComponent(parts[0]);
        jar[found] = converter.read(value, found);

        if (name === found) {
          break
        }
      } catch (e) {}
    }

    return name ? jar[name] : jar
  }

  return Object.create(
    {
      set,
      get,
      remove: function (name, attributes) {
        set(
          name,
          '',
          js_cookie_assign({}, attributes, {
            expires: -1
          })
        );
      },
      withAttributes: function (attributes) {
        return init(this.converter, js_cookie_assign({}, this.attributes, attributes))
      },
      withConverter: function (converter) {
        return init(js_cookie_assign({}, this.converter, converter), this.attributes)
      }
    },
    {
      attributes: { value: Object.freeze(defaultAttributes) },
      converter: { value: Object.freeze(converter) }
    }
  )
}

var api = init(defaultConverter, { path: '/' });
/* eslint-enable no-var */



;// CONCATENATED MODULE: ./src/select2.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }


var selectOptions = ['#веловоскресенье', '#цветыпопонедельникам', '#архитектураповторникам', '#природнаясреда', '#жизненнаясреда', '#танцыпосредам', '#птицыпочетвергам', '#рыбныйчетверг', '#четвероногийчетверг', '#пятничныекотики', '#ачётаковапопятницам', '#субботниепёсики', '#субботнеефотодлядуши'];
var multiSelectOptions = [];
function initSwitch() {
  var checkbox = document.querySelector('input[type=checkbox]');
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      api.set('theme', 'dark');
      switchTheme();
    } else {
      api.remove('theme');
      switchTheme();
    }
  });
}
function switchTheme() {
  var body = document.querySelector('body');
  if (api.get('theme') === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}
function initSelect() {
  var select = document.querySelector('.O_Select');
  var optionList = document.querySelector('.C_selectOptionList');
  var selectInput = document.querySelector('.A_selectInput');
  var dropdownButton = document.querySelector('.A_selectDropdownButton');
  selectOptions.forEach(function (option) {
    var listItem = document.createElement('div');
    listItem.classList.add('A_selectOptionListItem');
    listItem.innerText = option;
    listItem.addEventListener('click', function () {
      var listItems = document.getElementsByClassName('A_selectOptionListItem');
      for (var index = 0; index < listItems.length; index++) {
        var element = listItems[index];
        element.classList.remove('active');
      }
      listItem.classList.add('active');
      selectInput.value = option;
      select.classList.remove('focus');
    });
    optionList.appendChild(listItem);
  });
  dropdownButton.addEventListener('click', function () {
    select.classList.toggle('focus');
  });
  selectInput.addEventListener('click', function () {
    select.classList.toggle('focus');
  });
}

// _____________________________________________________________________

function initMultiSelect() {
  var select = document.querySelector('.O_multiSelect');
  var selectInput = document.querySelector('.C_multiSelectInput');
  var dropdownButton = document.querySelector('.A_multiSelectDropdownButton');
  getContentCardDataTags().forEach(function (tag) {
    multiSelectOptions.push({
      text: tag,
      active: false
    });
  });
  console.log(multiSelectOptions);
  updateSelectOptionList();
  dropdownButton.addEventListener('click', function () {
    select.classList.toggle('focus');
  });
  selectInput.addEventListener('click', function () {
    select.classList.toggle('focus');
  });
}
function createChip(option) {
  //старый способ вытащить ключи из объекта
  // const text = option.text
  // const active = option.active

  //мы вытаскиваем любое колич-во ключей из объекта option
  var text = option.text;
  var chipElement = document.createElement('div');
  var chipElementText = document.createElement('span');
  var chipElementButton = document.createElement('span');
  chipElement.classList.add('A_multiSelectChip');
  chipElementText.classList.add('Q_multiSelectChipText');
  chipElementButton.classList.add('Q_multiSelectChipButton');
  chipElementText.innerText = text;
  chipElementButton.addEventListener('click', function () {
    updateSelectData(option); // вызываем функцию, которая сменит active на false при удалении чипсов
    updateSelectOptionList();
    updateContent();
    chipElement.remove();
  });
  chipElement.appendChild(chipElementText);
  chipElement.appendChild(chipElementButton);
  return chipElement;
}
function updateSelectData(option) {
  multiSelectOptions.forEach(function (o) {
    if (o.text === option.text) {
      o.active = !option.active;
    }
  });
}
function updateSelectOptionList() {
  var optionList = document.querySelector('.C_multiSelectOptionList');
  var chips = document.querySelector('.C_multiSelectInput');
  var select = document.querySelector('.O_multiSelect');
  optionList.innerHTML = '';
  multiSelectOptions.forEach(function (option) {
    var text = option.text,
      active = option.active;
    if (!active) {
      var listItem = document.createElement('div');
      listItem.classList.add('A_multiSelectOptionListItem');
      listItem.innerText = text;
      listItem.addEventListener('click', function () {
        updateSelectData(option);
        updateSelectOptionList();
        updateContent();
        var chipElement = createChip(option);
        chips.appendChild(chipElement);
        select.classList.remove('focus');
      });
      optionList.appendChild(listItem);
    }
  });
}
function getContentCardDataTags() {
  var contentCards = document.getElementsByClassName('O_contentCard');
  var tags = [];
  var transformedTags = [];
  for (var i = 0; i < contentCards.length; i++) {
    var contentCard = contentCards[i];
    var contentCardTags = contentCard.dataset.tags.split(',');

    // contentCardTags.forEach((item) => {
    //   tags.push(item)
    // })
    tags.push.apply(tags, _toConsumableArray(contentCardTags)); //спреад-оператор делает то же самое, что forEach выше
  }
  tags.forEach(function (tag) {
    transformedTags.push(tag.toLowerCase());
  });
  var uniqueTags = _toConsumableArray(new Set(transformedTags));
  console.log(tags, transformedTags, uniqueTags.sort());
  return uniqueTags.sort();
}
function updateContent() {
  var contentCards = document.querySelectorAll('.O_contentCard');
  var selectedTags = [];
  multiSelectOptions.forEach(function (obj) {
    if (obj.active) {
      selectedTags.push(obj.text);
    }
  });
  var _loop = function _loop() {
    var contentCard = contentCards[i];
    var contentCardTags = contentCard.dataset.tags.split(',');
    var transformedTags = [];
    contentCardTags.forEach(function (tag) {
      transformedTags.push(tag.toLowerCase());
    });
    contentCard.classList.remove('hidden');
    selectedTags.forEach(function (tag) {
      if (!transformedTags.includes(tag)) {
        contentCard.classList.add('hidden');
      }
    });
  };
  for (var i = 0; i < contentCards.length; i++) {
    _loop();
  }
}
document.addEventListener('DOMContentLoaded', function () {
  switchTheme();
  initSwitch();
  initSelect();
  initMultiSelect();
});
/******/ })()
;