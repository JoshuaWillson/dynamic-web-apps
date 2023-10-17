const template = document.createElement('template')

    template.innerHTML = `
    <style>
    * {
    box-sizing: border-box;
    }
      
      .preview__image {
        width: 48px;
        height: 70px;
        object-fit: cover;
        background: grey;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      }
      
      .preview__info {
        padding: 1rem;
      }
      
      .preview__title {
        margin: 0 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
      }
      
      .preview__author {
        color: rgba(var(--color-dark), 0.4);
      }

    </style>
    
    <img class="preview__image" data-image src="image source">

    <div class="preview__info">
    <h3 class="preview__title" data-title>book title</h3>
    <div class="preview__author" data-author>book author</div>
    </div>`

export class PreviewItem extends HTMLElement {
    #id = this.getAttribute('id')
    #image = this.getAttribute('image')
    #title = this.getAttribute('title')
    #author = this.getAttribute('author')
    #class = this.setAttribute('class', 'preview')
    #elements = {
        image: undefined,
        title: undefined,
        author: undefined
    }

    #inner = this.attachShadow({mode: "closed"})

    constructor() {
        super()
        const {content} = template
        this.#inner.appendChild(content.cloneNode(true))
    }

    connectedCallback() {
        this.#elements = {
            image: this.#inner.querySelector('[data-image]'),
            title: this.#inner.querySelector('[data-title]'),
            author: this.#inner.querySelector('[data-author]')
        }

        this.#elements.image.setAttribute('src', this.#image)
        this.#elements.title.innerHTML = this.#title
        this.#elements.author.innerHTML = this.#author
    }
}

customElements.define("preview-item", PreviewItem)