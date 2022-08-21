import { IS_AUTH, LOGIN, TOKEN } from '../constants/index'

const initialValues = {
	auth: false,
	user: {},
	token : ""
}
const userReducer = (state = initialValues, action) => {
	switch (action.type) {
		case LOGIN: {
			return {
				...state,
				user: action.payload,
			}
		}
		case IS_AUTH: {
			return {
				...state,
				auth: action.payload,
			}
		}
		case TOKEN: {
			return {
				...state,
				token: action.payload,
			}
		}
		default:
			return state
	}
}

export default userReducer
