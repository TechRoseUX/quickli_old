import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';

// Reducer
const initialState = {
    showNavBar: 'none',
    showNavToggle: userb,
    selectedCustomer: null
};

export function toggleNavBar(display) {
    return {
        type: TOGGLE_NAV_BAR,
        display
    }
}

export function toggleNavToggle(display) {
    return {
        type: TOGGLE_NAV_TOGGLE,
        display
    }
}

export function getSelectedCustomer(customer) {
    return {
        type: GET_SELECTED_CUSTOMER,
        customer
    }
}

const TOGGLE_NAV_BAR = 'TOGGLE_NAV_BAR';
const TOGGLE_NAV_TOGGLE = 'TOGGLE_NAV_TOGGLE';  
const GET_SELECTED_CUSTOMER = 'GET_SELECTED_CUSTOMER';

export default function (state = initialState, action) {
    switch (action.type) {
    case TOGGLE_NAV_BAR:
        return {
            ...state,
            showNavBar: action.display
        }
    case TOGGLE_NAV_TOGGLE:
        return {
            ...state,
            showNavToggle: action.display
        }
    case GET_SELECTED_CUSTOMER:
        return {
            ...state,
            selectedCustomer: action.customer
        }
    default:
        return state;
    }
}
