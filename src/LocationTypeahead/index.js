// # Location Search Typeahead
//
//   Extends `Typeahead` class to:
//
//   - add a "use my current location" icon to text input
//   - add fixed result that triggers "use my current location" on click

// styles
require('./styles.css');

// html
const currentLocationTemplate = require('./useMyCurrentLocation.tmpl');

// scripts
const $ = require('jquery');
const Typeahead = require('../Typeahead');
const FragFactory = require('../BaseFragmentFactory');
const CurrentLocation = require('../CurrentLocation');

class LocationTypeahead extends Typeahead {
  constructor(el, opts = {}) {

    // define the "current location" icon DOM fragment
    const iconFactory = new FragFactory({
      render: (data) => {
        data.displayValue = data.name === 'listItem' ? 'inline' : 'none';
        return currentLocationTemplate(data);
      },

      controller: (data) => {
        const currentLocationIcon = new CurrentLocation('.ui-current-location-' + data.name, {
          geolocationAPI: opts.geolocationAPI
        });

        currentLocationIcon.subscribe((event) => {
          if (event.isLocation) {
            this.set(event);
            this.textInput.$input.val('Your current location'); // just for display
          }
        });
        currentLocationIcon.render();
      }
    });

    //Ensure we have an opts.textInputOpts object
    opts.textInputOpts = opts.textInputOpts || {};

    // setup the input icon to be a "use current location" component
    Object.assign(opts.textInputOpts, {
      iconClearsValue: false,
      icon: iconFactory.make({
        name: 'icon'
      })
    });

    // setup "current location" fixed result
    opts.fixedResults = (opts.fixedResults || []).concat([{
      useMyCurrentLocation: true,
      preSelectHook: (item) => {
        $('.ui-current-location-listItem').click(); // trigger 'use my location' icon
        return false; // don't run normal selection behavior
      }
    }]);

    super(el, opts);

    this.iconFactory = iconFactory;
    this.$el.addClass('ui-location-typeahead');
  }

  renderItem(item) {
    if (item && item.useMyCurrentLocation) {
      return this.iconFactory.make({
        name: 'listItem'
      });
    } else {
      return super.renderItem(item);
    }
  };
}

module.exports = LocationTypeahead;