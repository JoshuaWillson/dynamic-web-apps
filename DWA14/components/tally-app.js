import { LitElement, html, css } from '../libs/lit-html.js'

class App extends LitElement {
    static properties = {
        count: {type: Number},
        minimumCount: {type: Number},
        maximumCount: {type: Number},
        stepAmount: {type: Number}
    }

    static styles = css`
    
    .header {
        text-align: center;
    }
    
    .header__title {
        font-size: 3rem;
        font-weight: 900;
        color: var(--color-light-grey);
    }
    
    /* counter  */
    .counter {
        text-align: center;
    }

    .counter__value {
        font-size: 4rem;
        color: rgb(125.00000000000001, 125.00000000000001, 50);
    }
    
    .counter__button::part(base) {
        width: 100%;
        font-size: 3rem;
        background: var(--color-dark-grey);
    }
    
    .counter__button::part(base):active {
        background: var(--color-medium-grey);
        transform: translateY(2%);
    }
    
    .counter__button::part(base):disabled {
        opacity: 0.2;
    }

    /* footer */
    .footer {
        background: var(--color-dark-grey);
        color: var(--color-light-grey);
        padding: 2rem;
        font-size: 0.8rem;
        margin-top: 2rem;
    }

    .footer__link {
        color: var(--color-white);
    }
    
    .error {
        background-color: var(--color-red-light);
        color: var(--color-red-dark);
        padding: 2rem;
    }
    
    .confirmation {
        margin-top: 2rem;
        color: red;
        display: none;
    }
    
    .confirmation__show {
        display: block;
    }

    `

    constructor() {
        super()
        this.count = 0
        this.minimumCount = -15
        this.maximumCount = 15
        this.stepAmount = 1
    }

    render() {
        return html`
        <header class="header">
        <h1 class="header__title">
         Tally Count
        </h1>
    </header>

    <main class="counter">
        <noscript>
            <p class="error">This web app requires JavaScript to work</p>
        </noscript>

        <h1 class="counter__value">${this.count}</h1>
        
        <div class="style"></div>
        
        <div class="counter__actions">

            <sl-button-group label="Alignment">
                <sl-button variant="neutral" class="counter__button"  size="large" data-increase @click="${this._decrementHandler}" .disabled="${this.count === this.minimumCount}"><sl-icon name="dash-lg"></sl-icon></sl-button>
                <sl-button variant="neutral" class="counter__button" size="large" data-reset @click="${this._resetHandler}"><sl-icon name="arrow-clockwise"></sl-icon></sl-button>
                <sl-button variant="neutral" class="counter__button" size="large" data-decrease @click="${this._incrementHandler}" .disabled="${this.count === this.maximumCount}"><sl-icon name="plus-lg"></sl-icon></sl-button>
            </sl-button-group>

        </div>

        <div class="confirmation" data-key="confirmation">Counter has been reset.</div>

    </main>

    <footer class="footer">
        Inspired by <a class="footer__link" href="https://tallycount.app/" target="_blank" rel="noopener noreferrer">Tally Count</a>
        . Note that this is merely a student practice project for learning JavaScript.

    </footer>
 
    `
    }

    _incrementHandler() {
        this.count += this.stepAmount
        this._updateColor()
        this.shadowRoot.querySelector('.confirmation').classList.remove('confirmation__show')
    }

    _decrementHandler() {
        this.count -= this.stepAmount
        this._updateColor()
        this.shadowRoot.querySelector('.confirmation').classList.remove('confirmation__show')
    }

    _resetHandler() {
        this.count = 0
        this._updateColor()
        this.shadowRoot.querySelector('.confirmation').classList.add('confirmation__show')
    }

    _updateColor() {
        let value = 0
        if(!(this.count === undefined)) value = this.count
        const singleStep = 250 / (this.maximumCount - this.minimumCount)
        const distMax = this.maximumCount - value
        const distMin = value - this.minimumCount
        const red = distMax * singleStep
        const green = distMin * singleStep
        this.styles = css`
            .counter__value: { color: rgb(${red}, ${green}, 50); }`
        this.shadowRoot.querySelector('.style').innerHTML = `<style>
        .counter__value { color: rgb(${red}, ${green}, 50); }
    </style>`
    }
}

customElements.define('tally-app', App)