import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  eventTotal: 0,
  event: {},
  perPage: 3
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT_TOTAL(state, eventTotal) {
    state.eventTotal = eventTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem creating your event: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENT_TOTAL', parseInt(response.headers['x-total-count']))
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching events: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      // storeに存在しない場合fetchする
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

// export default {
//   state: {
//     events: [],
//     eventTotal: 0,
//     event: {}
//   },
//   mutations: {
//     ADD_EVENT(state, event) {
//       state.events.push(event)
//     },
//     SET_EVENTS(state, events) {
//       state.events = events
//     },
//     SET_EVENT_TOTAL(state, eventTotal) {
//       state.eventTotal = eventTotal
//     },
//     SET_EVENT(state, event) {
//       state.event = event
//     }
//   },
//   actions: {
//     createEvent({ commit, /* dispatch */ rootState }, event) {
//       console.log(`User creating Event is ${rootState.user.user.name}`)

//       // 別モジュールのactionを実行したいとき
//       // dispatchEvent('actionToCall')

//       return EventService.postEvent(event)
//         .then(() => {
//           commit('ADD_EVENT', event.data)
//         })
//         .catch(() => {
//           console.log('There was a problem creating your event')
//         })
//     },
//     fetchEvents({ commit }, { perPage, page }) {
//       EventService.getEvents(perPage, page)
//         .then(response => {
//           commit('SET_EVENTS', response.data)
//           commit('SET_EVENT_TOTAL', parseInt(response.headers['x-total-count']))
//         })
//         .catch(error => {
//           console.log('There was an error:', error.response)
//         })
//     },
//     fetchEvent({ commit, rootGetters }, id) {
//       let event = rootGetters.getEventById(id)
//       if (event) {
//         commit('SET_EVENT', event)
//       } else {
//         // storeに存在しない場合fetchする
//         console.log(id)
//         EventService.getEvent(id)
//           .then(response => {
//             commit('SET_EVENT', response.data)
//           })
//           .catch(error => {
//             console.log('There was an error:', error.response)
//           })
//       }
//     }
//   },
//   getters: {
//     getEventById: state => id => {
//       return state.events.find(event => event.id === id)
//     }
//   }
// }
