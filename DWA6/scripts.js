import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

/**
 * @type {Array<object>} - a temporary array that at first contains every object of books array but changes
 * according to the filters applied by the user.
 */
let matches = books;

/** @type {Number} - a variable that starts at 1 and increases by 1 or is reset based on the state of the app.*/
let page = 1;

/**
 * @type {Array<number>} - an array that only has two indexes, index 0 starts at 0 and index 1 starts at the
 * BOOKS_PER_PAGE value which is 36, both indexes either increase by 36 or is reset based on the state of the app.
 */
let range = [0, BOOKS_PER_PAGE];

/** 
 * @typedef {Object} CSSValuesObject
 * 
 * @property {string} higherValue - the value assigned to dark property for dark mode and the value assigned to light property for light mode.
 * @property {string} lowerValue - the value assigned to dark property for light mode and the value assigned to light property for dark mode.
 */

/**@type {CSSValuesObject} - an object literal of css values to be assigned to style properties based on the chosen day/night setting.*/
const css = {
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
const html = {
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
 * a function that creates and returns html containing image, title and author based on parsed properties for 
 * the inner html of a preview list item.
 * 
 * @param {Object} props - properties from each object in the matches array to be parsed and returned within the function.
 * 
 * @returns {string} - returns a string formatted in html syntax
 */
const createPreviewItemInnerHTML = (props) => {
    const {author, image, title} = props
    return /* html */ `
    <img
        class="preview__image"
        src="${image}"
    />
    
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
    `
 }

/** 
 * a function that creates a document fragment and an array that extracts items within a range from the matches array, 
 * it then loops through each object of the extracted array and uses specified properties as arguments for the 
 * createPreviewItemInnerHTML function, within each loop iteration a button document element is created and within its inner
 * html the createPreviewItemInnerHTML function is called, each preview element is appended to the fragment and the fragment is 
 * then returned.
 * 
 * @returns {DocumentFragment} - a document fragment containing extracted preview list elements
 */
const createExtractedPreviewHTMLListItems = () => {
    const previewDocumentFragment = document.createDocumentFragment()
    const extractedBooks = matches.slice(range[0], range[1])
    
    for (const { author, image, title, id } of extractedBooks) {
        const previewItem = document.createElement('button')
        previewItem.classList = 'preview'
        previewItem.setAttribute('data-preview', id)
        
        previewItem.innerHTML = createPreviewItemInnerHTML({
            author,
            image,
            title
        })
    
        previewDocumentFragment.appendChild(previewItem)
    }

    return previewDocumentFragment
}


/**
 * a factory function that creates and returns an object containing a method which appends extracted preview 
 * elements to the document.
 * 
 * @returns {Object} - an object containing a createPreviewList method
 */
const previewList = () => {
    const previewItems = createExtractedPreviewHTMLListItems()

    return {
        createPreviewList: () => html.buttons.bookList.appendChild(previewItems)
    }
}

const preloadedList = previewList()
preloadedList.createPreviewList()

/** a function that sets the value of the remaining button html element, whether it is disabled or not,
 *  and the inner html based on calculations using the matches array length, the value of the page variable,
 *  and the BOOKS_PER_PAGE value.
 * 
 * @returns {void}
 */
const calcButtonRemainingBooks = () => {
    html.buttons.remaining.value = `Show more (${matches.length - BOOKS_PER_PAGE})`

    html.buttons.remaining.disabled = !(matches.length - (page * BOOKS_PER_PAGE) > 0)
    
    html.buttons.remaining.innerHTML = /* html */ 
        `<span>Show more</span>
         <span class="list__remaining"> (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})</span>`   

}

calcButtonRemainingBooks()

/**
 * a function that creates a document fragment and appends options based on the id and name of each property
 * in the object, an array of two key value pairs(the id and name) of each property is created using the 
 * object.entries method on the object, it is looped through for every key value pair, the document fragment
 * is then appended to the html document.
 * 
 * @param {string} optionType - the name of the object starting with a capital letter in order to specify an options list.
 * 
 * @returns {void}
 */
const createOptionsList = (optionType) => {
    const fragment = document.createDocumentFragment()
    const optionsAll = document.createElement('option')
    optionsAll.value = 'any'
    optionsAll.innerText = `All ${optionType}`
    fragment.appendChild(optionsAll)
    
    for (const [id, name] of Object.entries(eval(optionType.toLowerCase()))) {
        const option = document.createElement('option')
        option.value = id
        option.innerText = name
        fragment.appendChild(option)
    }
    
    html.searchOverlay[`${optionType.toLowerCase()}Options`].appendChild(fragment)
}

createOptionsList('Genres')
createOptionsList('Authors')

/**
 * an event handler that first increases page by 1, range index 0 is increased by BOOKS_PER_PAGE, and range index 1 is increased by 
 * BOOKS_PER_PAGE, then the createHTMLListItems function and the calcButtonRemainingBooks function is called.
 * 
 * @returns {void}
 */
const remainingListButtonHandler = () => {
    page = page + 1
    range[0] = range[0] + BOOKS_PER_PAGE
    range[1] = range[1] + BOOKS_PER_PAGE

    const remainingList = previewList()
    remainingList.createPreviewList()

    calcButtonRemainingBooks()
}

//an event listener for the remaining books button.
html.buttons.remaining.addEventListener('click', remainingListButtonHandler)

/**
 * an event handler that creates key value pairs through the form data constructor of the event target,
 * and then creates an object from the form data using the object.fromentries method, the matches array 
 * is then set to an empty array, the books array is then looped through for every book index, within the 
 * loop three different boolean variable are created in order to check whether the form data of the current
 * event matches the title, author, and genre of any book in the books array or if the title form data is empty, 
 * and the author and genre form data is equal to 'any', within each book of the books array the genre array is 
 * looped through and checked to see if the genre form data matches the genres in the genre array, finally all 
 * three boolean statements are checked to be true, and if they are the book object will be added to the matches
 * array, lastly if the matches array length is less than 1 the no result message will show, the book list html 
 * will be set to empty, the calcButtonRemainingBooks function will be called, and the search overlay will be closed, 
 * otherwise the page, range index 0, and range index 1 will be reset, the book list html will be set to empty, the
 * createHTMLListItems function and the calcButtonRemainingBooks function will be called, the book list html will 
 * scroll to the top of the page, and the search overlay will close.
 * 
 * @param {Event} event
 * 
 * @returns {void}
 */
const searchFormHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    matches = []

    for (const book of books) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())
        const authorMatch = filters.author === 'any' || book.author === filters.author
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) { if (singleGenre === filters.genre) { genreMatch = true }}

        if (titleMatch && authorMatch && genreMatch) matches.push(book)

    }

    if (matches.length < 1) {
        html.other.noResultMessage.classList.add('list__message_show')

        html.buttons.bookList.innerHTML = ''

        calcButtonRemainingBooks()

        html.overlays.search.open = false
    
    } else { 
        page = 1
        range[0] = 0
        range[1] = BOOKS_PER_PAGE
        
        html.other.noResultMessage.classList.remove('list__message_show')
        
        html.buttons.bookList.innerHTML = ''
        
        const matchingList = previewList()
        matchingList.createPreviewList()

        calcButtonRemainingBooks()
    
        window.scrollTo({ top: 0, behavior: 'smooth' });
        html.overlays.search.open = false
    }
 
}

/** an event handler that opens the search overlay and sets focus on title input within the search overlay.
 * 
 * @returns {void}
 */
const searchOpenHandler = () => {
    html.overlays.search.open = true ;
    html.searchOverlay.titleInput.focus();
}

/** 
 * an event handler that closes the search overlay.
 * 
 * @returns {void}
 */
const searchCancelHandler = () => { html.overlays.search.open = false }

// an event listener for the search button within the search overlay.
html.searchOverlay.searchButton.addEventListener('submit', searchFormHandler)

// an event listener for the search button.
html.buttons.search.addEventListener('click', searchOpenHandler)

// an event listener for the cancel button within the search overlay.
html.searchOverlay.cancelButton.addEventListener('click', searchCancelHandler)

/**
 * an event handler that sets the value of the theme options in the settings overlay to night or day depending on 
 * whether the style property value of the root document is equal to '' or the higherValue of the css object, and then
 * then the settings overlay is opened.
 * 
 * @returns {void}
 */
const settingsOpenHandler = () => {
    html.settingsOverlay.themeOptions.value = document.documentElement.style.getPropertyValue('--color-dark') === '' || 
    document.documentElement.style.getPropertyValue('--color-dark') === css.higherValue ? 'night' : 'day'

    html.overlays.settings.open = true 
}

/** an event handler that closes the settings overlay.
 * 
 * @returns {void}
 */
const settingsCancelHandler = () => { html.overlays.settings.open = false }

/**
 * an event handler that checks if the theme options value is equal to 'night', then sets the style property values of 
 * the root document to the higherValue or lowerValue depending on the theme options value, and then the settings overlay is 
 * closed.
 * 
 * @param {Event} event
 * 
 * @returns {void}
 */
const submitSettingsHandler = (event) => {
    event.preventDefault()

    if(html.settingsOverlay.themeOptions.value === 'night') {
        document.documentElement.style.setProperty('--color-dark', css.higherValue);
        document.documentElement.style.setProperty('--color-light', css.lowerValue);
    } else {
        document.documentElement.style.setProperty('--color-dark', css.lowerValue);
        document.documentElement.style.setProperty('--color-light', css.higherValue);
    }

    html.overlays.settings.open = false
}

// an event listener for the settings button.
html.buttons.settings.addEventListener('click', settingsOpenHandler)

// an event listener for the cancel button within the settings overlay.
html.settingsOverlay.cancelButton.addEventListener('click', settingsCancelHandler)

// an event listener for the save button in the settings overlay.
html.settingsOverlay.saveButton.addEventListener('submit', submitSettingsHandler)

/**
 * an event handler that creates an array from the event path and sets the active variable to null, then a for loop iterates 
 * through every node in the path array, within the for loop, active is checked to be true, if so the loop will stop iterating,
 * then a preview id variable is created and assigned the current node's dataset preview id within the loop, then a nested for loop
 * iterates through every book object of the books array and checks if the book id equals the preview id of the current event, if it does, 
 * the book object is assigned to the active variable and the loop stops iterating, and then outside the loop if active is false nothing is returned 
 * and the function ends otherwise, the active book overlay will open, the html active overlay blur source will be the active book object image, the 
 * html active overlay image source will be the active book object image, the html active overlay title inner html will be the active book object 
 * title, the html active overlay subtitle inner html will be the a string literal of the authors name using the authors object and the active book 
 * object author as the matching property key value pair, along with the year in brackets using the new date constructor of the active book object
 * published, and finally the html active overlay description will be the active book object description.
 * 
 * @param {Event} event
 * 
 * @returns {void}
 */
const activeListItemHandler = (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null;

    for (const node of pathArray) {
        if (active) break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === previewId) active = singleBook
        }
    }
    
    if (!active) return
    html.overlays.activeBook.open = true
    html.activeOverlay.blur.src = active.image

    html.activeOverlay.image.src = active.image
    html.activeOverlay.title.innerHTML = active.title
    
    html.activeOverlay.subtitle.innerHTML = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    html.activeOverlay.description.innerHTML = active.description
}

/** an event handler that closes the active book overlay.
 * 
 * @returns {void}
 */
const activeListItemCloseHandler = () => { html.overlays.activeBook.open = false }

// an event listener for any book in book list.
html.buttons.bookList.addEventListener('click', activeListItemHandler)

// an event listener for the close button within the active list item overlay.
html.activeOverlay.closeButton.addEventListener('click', activeListItemCloseHandler)

// sets scroll position to the top when page is reloaded.
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }