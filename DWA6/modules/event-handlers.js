import { css, html, state } from "./references.js"
import { BOOKS_PER_PAGE, authors, books } from "./data.js";
import { calcButtonRemainingBooks, createExtractedPreviewHTMLListItems } from "./functions.js";

/**
 * an event handler that first increases page by 1, range index 0 is increased by BOOKS_PER_PAGE, and range index 1 is increased by 
 * BOOKS_PER_PAGE, then the createHTMLListItems function and the calcButtonRemainingBooks function is called.
 * 
 * @returns {void}
 */
export const remainingListButtonHandler = () => {
    state.page = state.page + 1
    state.range[0] = state.range[0] + BOOKS_PER_PAGE
    state.range[1] = state.range[1] + BOOKS_PER_PAGE

    createExtractedPreviewHTMLListItems()

    calcButtonRemainingBooks()
}

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
export const searchFormHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    state.matches = []

    for (const book of books) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())
        const authorMatch = filters.author === 'any' || book.author === filters.author
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) { if (singleGenre === filters.genre) { genreMatch = true }}

        if (titleMatch && authorMatch && genreMatch) state.matches.push(book)

    }

    if (state.matches.length < 1) {
        html.other.noResultMessage.classList.add('list__message_show')

        html.buttons.bookList.innerHTML = ''

        calcButtonRemainingBooks()

        html.overlays.search.open = false
    
    } else { 
        state.page = 1
        state.range[0] = 0
        state.range[1] = BOOKS_PER_PAGE
        
        html.other.noResultMessage.classList.remove('list__message_show')
        
        html.buttons.bookList.innerHTML = ''
        
        createExtractedPreviewHTMLListItems()

        calcButtonRemainingBooks()
    
        window.scrollTo({ top: 0, behavior: 'smooth' });
        html.overlays.search.open = false
    }
 
}

/** an event handler that opens the search overlay and sets focus on title input within the search overlay.
 * 
 * @returns {void}
 */
export const searchOpenHandler = () => {
    html.overlays.search.open = true ;
    html.searchOverlay.titleInput.focus();
}

/** 
 * an event handler that closes the search overlay.
 * 
 * @returns {void}
 */
export const searchCancelHandler = () => { html.overlays.search.open = false }

/**
 * an event handler that sets the value of the theme options in the settings overlay to night or day depending on 
 * whether the style property value of the root document is equal to '' or the higherValue of the css object, and then
 * then the settings overlay is opened.
 * 
 * @returns {void}
 */
export const settingsOpenHandler = () => {
    html.settingsOverlay.themeOptions.value = document.documentElement.style.getPropertyValue('--color-dark') === '' || 
    document.documentElement.style.getPropertyValue('--color-dark') === css.higherValue ? 'night' : 'day'

    html.overlays.settings.open = true 
}

/** an event handler that closes the settings overlay.
 * 
 * @returns {void}
 */
export const settingsCancelHandler = () => { html.overlays.settings.open = false }

/**
 * an event handler that checks if the theme options value is equal to 'night', then sets the style property values of 
 * the root document to the higherValue or lowerValue depending on the theme options value, and then the settings overlay is 
 * closed.
 * 
 * @param {Event} event
 * 
 * @returns {void}
 */
export const submitSettingsHandler = (event) => {
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
export const activeListItemHandler = (event) => {
    let active = null;

    const previewId = event.target.id

    for (const singleBook of books) {
        if (singleBook.id === previewId) active = singleBook
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
export const activeListItemCloseHandler = () => { html.overlays.activeBook.open = false }