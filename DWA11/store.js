/**
 * @typedef {object} Item
 * @prop {number} value
 */

/**
 * @typedef {object} State
 * @prop {Item} counter
 */

/**
 * @callback Notify
 * @param {State} next
 * @param {State} prev
 */

/**
 * @callback Action
 * @param {State}
 * @returns {State}
 */

/**
 * @callback Update
 * @param {Action}
 */

/**
 * @callback Subscribe
 * @param {Notify} notify
 */

/**
 * @callback EmptyFn
 */

/**
 * @typedef {object} Store
 * @prop {Update} update
 * @prop {Subscribe} subscribe
 */

export const state = {
    counter: {
        value: 0
    }
}

/**
* @type {Array<State>}
*/
const states = [state]

/**
 * @type {Array<Notify>}
 */
let notifiers = []

/**
 * @param {Action} action 
 */
export const update = (action) => {
    if(typeof action !== 'function') {
        throw new Error("action is required to be a function")
    }
    
    const prev = Object.freeze({ ...states[0] })
    const next = Object.freeze({ ...action(prev) })

    const handler = (notify) => notify(next, prev)

    notifiers.forEach(handler)

    states.unshift(next)
}

/**
 * @param {Notify} notify
 * @returns {}
 */
export const subscribe = (notify) => {
    notifiers.push(notify)
    console.log('Subscribed')

    const unsubscribe = () => {
        const handler = (current) => current !== notify
        const result = notifiers.filter(handler)
        notifiers = result
        console.log('Unsubscribed')
    }

    return unsubscribe
}