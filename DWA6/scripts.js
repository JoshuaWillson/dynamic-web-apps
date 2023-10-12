import { html } from "./modules/references.js";
import { remainingListButtonHandler,
         searchFormHandler, 
         searchOpenHandler, 
         searchCancelHandler, 
         settingsOpenHandler, 
         settingsCancelHandler, 
         submitSettingsHandler, 
         activeListItemHandler, 
         activeListItemCloseHandler 
} from "./modules/event-handlers.js";
import { preloadedScripts } from "./modules/functions.js";

preloadedScripts()

//an event listener for the remaining books button.
html.buttons.remaining.addEventListener('click', remainingListButtonHandler)

// an event listener for the search button within the search overlay.
html.searchOverlay.searchButton.addEventListener('submit', searchFormHandler)

// an event listener for the search button.
html.buttons.search.addEventListener('click', searchOpenHandler)

// an event listener for the cancel button within the search overlay.
html.searchOverlay.cancelButton.addEventListener('click', searchCancelHandler)

// an event listener for the settings button.
html.buttons.settings.addEventListener('click', settingsOpenHandler)

// an event listener for the cancel button within the settings overlay.
html.settingsOverlay.cancelButton.addEventListener('click', settingsCancelHandler)

// an event listener for the save button in the settings overlay.
html.settingsOverlay.saveButton.addEventListener('submit', submitSettingsHandler)

// an event listener for any book in book list.
html.buttons.bookList.addEventListener('click', activeListItemHandler)

// an event listener for the close button within the active list item overlay.
html.activeOverlay.closeButton.addEventListener('click', activeListItemCloseHandler)

// sets scroll position to the top when page is reloaded.
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }