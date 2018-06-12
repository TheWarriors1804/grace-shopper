import axios from 'axios'
import history from '../history'
import order from './order';

/**
 * ACTION TYPES
 */

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const FETCH_HISTORY = 'FETCH_HISTORY'

/**
 * INITIAL STATE
 */

const defaultUser = {}

/**
 * ACTION CREATORS
 */

const getUser = (user) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updatedUser = user => ({type: UPDATE_USER, user})
const fetchedHistory = orderHistory => ({type: FETCH_HISTORY, orderHistory})

/**
 * THUNK CREATORS
 */

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

//thunk for login and signup
export const auth = (email, password, method, cart) => {
  return dispatch =>
    axios
      .post(`/auth/${method}`, {email, password, cart})
      .then(
        res => {
          dispatch(getUser(res.data))
          localStorage.clear()
          history.push('/home')
        },
        authError => {
          // rare example: a good use case for parallel (non-catch) error handler
          dispatch(getUser({error: authError}))
        }
      )
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

export const updateUser = user => async dispatch => {
  console.log('before thunk', user)
  const updated = await axios.put(`/api/users/${user.id}`, user)
  console.log('after thunk', updated)
  dispatch(updatedUser(updated))
}

export const deleteUser = id => async dispatch => {
  await axios.delete(`/api/users/${id}`)
  dispatch(removeUser())
}

export const fetchOrderHistory = userId => async dispatch => {
  console.log('HAS REACHED THUNK')
  const orderHistory = await axios.get(`/api/orders/${userId}`)
  let final = {}
  if(orderHistory.data[0]) {
  orderHistory.data.forEach(async (order) => {
    const orderobj = {}
    const orderitems = order.products
    if(orderitems[0]) {
    orderitems.forEach((item) => {
      orderobj[item.id] = item.orderItem.quantity
    })}
    final[order.id] = orderobj
  })}
  console.log('final orderhistory is: ', final)
  dispatch(fetchedHistory(final))

}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log('get user orderHistory is: ', action.orderHistory)
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case FETCH_HISTORY:
      return {
        ...state, orderHistory: action.orderHistory
      }
    default:
      return state
  }
}
