import { html } from "./references.js"
import { createExtractedPreviewHTMLListItems } from "./functions.js"

/**
 * a factory function that creates and returns an object containing a method which appends extracted preview 
 * elements to the document.
 * 
 * @returns {Object} - an object containing a createPreviewList method
 */
export const previewList = () => {
    const previewItems = createExtractedPreviewHTMLListItems()

    return {
        createPreviewList: () => html.buttons.bookList.appendChild(previewItems)
    }
}