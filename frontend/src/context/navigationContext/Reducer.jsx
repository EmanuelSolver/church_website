
const Reducer = (state, action) => {
    switch (action.type) {
        case "PROFILE":
            return{
                navigator: action.payload,
            }
        case "USERS":
            return{
                navigator: action.payload,
            }
        case "NOTIFICATIONS":
            return{
               navigator: action.payload,
            }
        case "APPOINTMENT":
            return{
                navigator: action.payload,
            }
        case "MEDIA":
            return{
                navigator: action.payload,
            }
        case "DEPARTMENTS":
            return{
                navigator: action.payload,
            }
        case "SETTINGS":
                return{
                    navigator: action.payload,
                }
        case "EVENTS":
            return{
                navigator: action.payload,
            }
        default:
            return state;
    }
}

export default Reducer