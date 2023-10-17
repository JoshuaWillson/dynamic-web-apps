import { BOOKS_PER_PAGE, authors, genres } from "./data.js";
import { html, state } from "./references.js";
import "../components/preview-item.js"

/** 
 * a function that creates a document fragment and an array that extracts items within a range from the matches array, 
 * it then loops through each object of the extracted array and uses specified properties as arguments for the 
 * createPreviewItemInnerHTML function, within each loop iteration a button document element is created and within its inner
 * html the createPreviewItemInnerHTML function is called, each preview element is appended to the fragment and the fragment is 
 * then returned.
 * 
 * @returns {void} 
 */
export const createExtractedPreviewHTMLListItems = () => {
    const extractedBooks = state.matches.slice(state.range[0], state.range[1])

    for (const { author, image, title, id } of extractedBooks) {
        const previewItem = `<preview-item id="${id}" image="${image}" title="${title}" author="${authors[author]}"></preview-item>`
        html.buttons.bookList.innerHTML += previewItem
    }
}

/** a function that sets the value of the remaining button html element, whether it is disabled or not,
 *  and the inner html based on calculations using the matches array length, the value of the page variable,
 *  and the BOOKS_PER_PAGE value.
 * 
 * @returns {void}
 */
export const calcButtonRemainingBooks = () => {
    html.buttons.remaining.value = `Show more (${state.matches.length - (state.page * BOOKS_PER_PAGE) > 0 ? state.matches.length - (state.page * BOOKS_PER_PAGE) : 0})`

    html.buttons.remaining.disabled = !(state.matches.length - (state.page * BOOKS_PER_PAGE) > 0)
    
    html.buttons.remaining.innerHTML = /* html */ 
        `<span>Show more</span>
         <span class="list__remaining"> (${state.matches.length - (state.page * BOOKS_PER_PAGE) > 0 ? state.matches.length - (state.page * BOOKS_PER_PAGE) : 0})</span>`   

}

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
export const createOptionsList = (optionType) => {
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

/** all of the functions that will run when the app is started.*/
export const preloadedScripts = () => {
    createExtractedPreviewHTMLListItems()

    calcButtonRemainingBooks()

    createOptionsList('Genres')
    createOptionsList('Authors')
}