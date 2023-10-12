import { BOOKS_PER_PAGE, authors, genres } from "./data.js";
import { html, state } from "./references.js";
import { previewList } from "./components.js";


/** 
 * a function that creates and returns html containing image, title and author based on parsed properties for 
 * the inner html of a preview list item.
 * 
 * @param {Object} props - properties from each object in the matches array to be parsed and returned within the function.
 * 
 * @returns {string} - returns a string formatted in html syntax
 */
export const createPreviewItemInnerHTML = (props) => {
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
export const createExtractedPreviewHTMLListItems = () => {
    const previewDocumentFragment = document.createDocumentFragment()
    const extractedBooks = state.matches.slice(state.range[0], state.range[1])
    
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

/** a function that sets the value of the remaining button html element, whether it is disabled or not,
 *  and the inner html based on calculations using the matches array length, the value of the page variable,
 *  and the BOOKS_PER_PAGE value.
 * 
 * @returns {void}
 */
export const calcButtonRemainingBooks = () => {
    html.buttons.remaining.value = `Show more (${state.matches.length - BOOKS_PER_PAGE})`

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

export const preloadedScripts = () => {
    const preloadedList = previewList()
    preloadedList.createPreviewList()

    calcButtonRemainingBooks()

    createOptionsList('Genres')
    createOptionsList('Authors')
}