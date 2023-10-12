import { books, BOOKS_PER_PAGE } from "./data.js"

/** 
 * @typedef {Object} CSSValuesObject
 * 
 * @property {string} higherValue - the value assigned to dark property for dark mode and the value assigned to light property for light mode.
 * @property {string} lowerValue - the value assigned to dark property for light mode and the value assigned to light property for dark mode.
 */

/**@type {CSSValuesObject} - an object literal of css values to be assigned to style properties based on the chosen day/night setting.*/
export const css = {
    higherValue: '255, 255, 255',
    lowerValue: '10, 10, 20',
}

/** 
 * @typedef {Object} HTMLCategoriesObject
 * 
 * @property {object.<documentElement>} buttons - an object property of document elements for buttons category.
 * @property {object.<documentElement>} overlays - an object property of document elements for overlays category.
 * @property {object.<documentElement>} searchOverlay - an object property of document elements for search overlay category.
 * @property {object.<documentElement>} settingsOverlay - an object property of document elements for settings overlay category.
 * @property {object.<documentElement>} activeOverlay - an object property of document elements for active overlay category.
 * @property {object.<documentElement>} other - an object property of document elements for other category.
 */

/**@type {HTMLCategoriesObject} - an object literal of object categories for all of the document elements used throughout the app.*/
export const html = {
    buttons: { bookList: document.querySelector('[data-list-items]'),
               remaining: document.querySelector('[data-list-button]'),
               search: document.querySelector('[data-header-search]'),
               settings: document.querySelector('[data-header-settings]'),     
    },
    overlays: { activeBook: document.querySelector('[data-list-active]'),
                search: document.querySelector('[data-search-overlay]'),
                settings: document.querySelector('[data-settings-overlay]'),
    },
    searchOverlay: { searchButton: document.querySelector('[data-search-form]'),
                     cancelButton: document.querySelector('[data-search-cancel]'),
                     titleInput: document.querySelector('[data-search-title]'),
                     genresOptions: document.querySelector('[data-search-genres]'),
                     authorsOptions: document.querySelector('[data-search-authors]'),
    },
    settingsOverlay: { saveButton: document.querySelector('[data-settings-form]'),
                       cancelButton: document.querySelector('[data-settings-cancel]'),
                       themeOptions: document.querySelector('[data-settings-theme]'),
    },
    activeOverlay: { closeButton: document.querySelector('[data-list-close]'),
                     blur: document.querySelector('[data-list-blur]'),
                     image: document.querySelector('[data-list-image]'),
                     title: document.querySelector('[data-list-title]'),
                     subtitle: document.querySelector('[data-list-subtitle]'),
                     description: document.querySelector('[data-list-description]'),

    },
    other: {noResultMessage: document.querySelector('[data-list-message]'),
    },

}

/**
 * @typedef {Object} StateObject
 * 
 * @prop {Array<object>} matches - a temporary array that at first contains every object of books array but changes
 * according to the filters applied by the user.
 * @prop {Number} page - a variable that starts at 1 and increases by 1 or is reset based on the state of the app.
 * @prop {Array<number>} range - an array that only has two indexes, index 0 starts at 0 and index 1 starts at the
 * BOOKS_PER_PAGE value which is 36, both indexes either increase by 36 or is reset based on the state of the app.
 */

/** @type {StateObject} - an object literal for the state of the app which can change depending on how many books match the search filter, 
 *  what page the preview list is on and the range of books that are displayed. 
 */
export const state = {
    matches: books,
    page: 1,
    range: [0, BOOKS_PER_PAGE]
}