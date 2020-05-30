const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      state = {good: state.good + 1, bad: state.bad, ok: state.ok}
      return state
    case 'OK':
      state = {good: state.good, bad: state.bad, ok: state.ok + 1}
      return state
    case 'BAD':
      state = {good: state.good, bad: state.bad + 1, ok: state.ok}
      return state
    case 'ZERO':
      return {good: 0, ok: 0, bad: 0}
    default: return state
  }
  
}

export default counterReducer