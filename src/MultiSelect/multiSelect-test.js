const $ = require('jquery');
const expect = require('expect');
const MultiSelect = require('./index.js');

describe('multiSelect initialize', () => {
  it('test initially all unchecked', () => {
    $('body').append('<div class="multiSelect-test"></div>');
    const categories = new MultiSelect('.multiSelect-test', {
      options: [{
        displayName: 'Marketing',
        value: 'mrkt01',
        count: 5
      }, {
        displayName: 'Sales',
        value: 'sales',
        count: 9
      }, {
        displayName: 'Engineering',
        value: 'eng-2015',
        count: 43
      }],
      renderItem(item) {
        return item.displayName + ' (' + item.count + ')';
      }
    });

    categories.subscribe((choice) => {
      categories.render();
    });

    categories.render();
    expect(Array.isArray(categories.get())).toBe(true);
    expect(categories.get().length).toBe(0);
  });
});

describe('multiSelect checked values', () => {
  it('test checking an option', () => {
    $('body').append('<div class="multiSelect-test"></div>');
    const categories = new MultiSelect('.multiSelect-test', {
      options: [{
        displayName: 'Marketing',
        value: 'mrkt01',
        count: 5
      }, {
        displayName: 'Sales',
        value: 'sales',
        count: 9
      }, {
        displayName: 'Engineering',
        value: 'eng-2015',
        count: 43
      }],
      renderItem(item) {
        return item.displayName + ' (' + item.count + ')';
      }
    });

    categories.subscribe((choice) => {
      categories.render();
    });

    categories.render();
    categories.set(['mrkt01', 'sales']);
    let selected = categories.get();
    expect(selected.length).toBe(2);
    expect(selected[0].value).toBe('mrkt01');
    expect(selected[1].value).toBe('sales');
    const elementToClick = $($('.multiSelect-test .ui-multi-select .select-option input')[0]);
    elementToClick.click();
    selected = categories.get();
    expect(selected.length).toBe(1);
    expect(selected[0].value).toBe('sales');
  });
});