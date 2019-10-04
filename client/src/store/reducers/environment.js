import lockb from '../../rersources/svg/lockb.svg';
import userb from '../../rersources/svg/userb.svg';
import barsw from '../../rersources/svg/barsw.svg';

// Reducer
const initialState = {
    showNavBar: 'none',
    showNavToggle: barsw,
    selectedCustomer: null,
    selectedVehicle: null,
    selectedService: null,
    selectedServiceMesssage: null,
    selectedMessageText: null,
    showTemplateOverlay: false,
    showEndServiceOverlay: false,
    currentEmailId: '',
    search: '',
    currentFilter: 'Name'
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

export function getSelectedVehicle(vehicle) {
    return {
        type: GET_SELECTED_VEHICLE,
        vehicle
    }
}

export function getSelectedService(service) {
    return {
        type: GET_SELECTED_SERVICE,
        service
    }
}

export function getSelectedServiceMessage(sm) {
    return {
        type: GET_SELECTED_SERVICE_MESSAGE,
        sm
    }
}

export function getSelectedMessageText(text) {
    return {
        type: GET_SELECTED_MESSAGE_TEXT,
        text
    }
}

export function toggleTemplateOverlay(status) {
    return {
        type: TOGGLE_TEMPLATE_OVERLAY,
        status
    }
}

export function toggleEndServiceOverlay(status) {
    return {
        type: TOGGLE_END_SERVICE_OVERLAY,
        status
    }
}

export function getCurrentEmailId(email) {
    return {
        type: GET_CURRENT_EMAIL_ID,
        email
    }
}

export function updateCustomerSearch(search) {
    return {
        type: UPDATE_CUSTOMER_SEARCH,
        search
    }
}

export function getCurrentFilter(filter) {
    return {
        type: GET_CURRENT_FILTER,
        filter
    }
}

const TOGGLE_NAV_BAR = 'TOGGLE_NAV_BAR';
const TOGGLE_NAV_TOGGLE = 'TOGGLE_NAV_TOGGLE';  
const GET_SELECTED_CUSTOMER = 'GET_SELECTED_CUSTOMER';
const GET_SELECTED_VEHICLE = 'GET_SELECTED_VEHICLE';
const GET_SELECTED_SERVICE = 'GET_SELECTED_SERVICE';
const GET_SELECTED_SERVICE_MESSAGE = 'GET_SELECTED_SERVICE_MESSAGE';
const GET_SELECTED_MESSAGE_TEXT = 'GET_SELECTED_MESSAGE_TEXT';
const TOGGLE_TEMPLATE_OVERLAY = 'TOGGLE_TEMPLATE_OVERLAY';
const TOGGLE_END_SERVICE_OVERLAY = 'TOGGLE_END_SERVICE_OVERLAY';
const GET_CURRENT_EMAIL_ID = 'GET_CURRENT_EMAIL_ID';
const UPDATE_CUSTOMER_SEARCH = 'UPDATE_CUSTOMER_SEARCH';
const GET_CURRENT_FILTER = 'GET_CURRENT_FILTER';

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
    case GET_SELECTED_VEHICLE:
        return {
            ...state,
            selectedVehicle: action.vehicle
        }
    case GET_SELECTED_SERVICE:
        return {
            ...state,
            selectedService: action.service
        }
    case GET_SELECTED_SERVICE_MESSAGE:
        return {
            ...state,
            selectedServiceMessage: action.sm
        }
    case GET_SELECTED_MESSAGE_TEXT:
        return {
            ...state,
            selectedMessageText: action.text
        }
    case TOGGLE_TEMPLATE_OVERLAY:
        return {
            ...state,
            showTemplateOverlay: action.status
        }
    case TOGGLE_END_SERVICE_OVERLAY:
        return {
            ...state,
            showEndServiceOverlay: action.status
        }
    case GET_CURRENT_EMAIL_ID:
        return {
            ...state,
            currentEmailId: action.email
        }
    case UPDATE_CUSTOMER_SEARCH:
        return {
            ...state,
            search: action.search
        }
    case GET_CURRENT_FILTER:
        return {
            ...state,
            currentFilter: action.filter
        }
    default:
        return state;
    }
}
