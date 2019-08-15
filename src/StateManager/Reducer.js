import Actions from './Actions';
const Reducer = (state, action) => {
    switch (action.type) {
      case Actions.setPrimaryValue:
        return {
          ...state,
          primary: {
            ...state.primary,
            value: action.value
          }}

      case Actions.setPrimaryCurrency:
        return {...state,
            primary: {
            ...state.primary,
            currency: action.currency
          }}

      case Actions.setSecondaryValue:
        return {
          ...state,
          secondary: {
            ...state.secondary,
            value: action.value
          }}

      case Actions.setSecondaryCurrency:
        return {...state,
          secondary: {
            ...state.secondary,
            currency: action.currency
          }}  
      default:
        return state;
    }
  };

  export default Reducer;