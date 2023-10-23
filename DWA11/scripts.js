import { update ,subscribe } from './store.js'
import { increase, decrease, reset, getState } from './actions.js'
import { state } from './store.js'

console.log(getState(state))

const handler = (next) => console.log(next)
const unsubscribe = subscribe(handler)

update(increase)
update(reset)
update(decrease)

unsubscribe()

update(increase)
update(reset)
update(decrease)

