import {combineReducers} from 'redux';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOGIN_FAILD_API_MESSAGE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  DETAILS,
  DETAILS_SUCCESS,
  DETAILS_FAILD,
  LOAD_ORG,
  LOAD_ORG_SUCCESS,
  LOAD_ORG_FAILD,
  LOAD_ARTICAL,
  LOAD_ARTICAL_SUCCESS,
  LOAD_ARTICAL_FAILD,
  LOAD_ARTICALS,
  LOAD_ARTICALS_SUCCESS,
  LOAD_ARTICALS_FAILD,
  LOAD_ACCEPTED,
  LOAD_ACCEPTED_SUCCESS,
  LOAD_ACCEPTED_FAILD,
  LOAD_PENDING,
  LOAD_PENDING_SUCCESS,
  LOAD_PENDING_FAILD,
  LOAD_ALL_ARTICALS,
  LOAD_ALL_ARTICALS_SUCCESS,
  LOAD_ALL_ARTICALS_FAILD,
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILD,
  LOAD_COMPLETED,
  LOAD_COMPLETED_SUCCESS,
  LOAD_COMPLETED_FAILD,
  LOAD_REJECTED,
  LOAD_REJECTED_SUCCESS,
  LOAD_REJECTED_FAILD,
  LOAD_COUNT,
  LOAD_COUNT_SUCCESS,
  LOAD_COUNT_FAILD,
  RTIUPDATE_SUCCESS, RTIUPDATE_FAILD
} from '../actions';

// store user data
let userData = {data: [], loading: false, error: false};

let rtiData = {data: [], loading: false, error: false};
// store user register data
let userRegisterData = {data: [], loading: false, error: false};
// store user details data
let userDetailsData = {data: [], loading: false, error: false};
// store org list data
let orgListData = {data: [], loading: false, error: false};
// store atticals list data
let articalsData = {data: [], loading: false, error: false};
// store artical data
let articalData = {data: [], loading: false, error: false};
// store accepted data
let acceptedData = {data: [], loading: false, error: false};
// store pending data
let pendingData = {data: [], loading: false, error: false};

let completedData = {data: [], loading: false, error: false};

let rejectedData = {data: [], loading: false, error: false};

let countData = {data: [], loading: false, error: false};
// store all articals data
let allArticalsData = {data: [], loading: false, error: false};
// store create request data
let createRequestData = {data: [], loading: false, error: false};

// user login data
const userDataReducer = (state = userData, action) => {
    switch (action.type) {
      case LOGIN:
        state = Object.assign({}, state, {loading: true});
        return state;
      case LOGIN_SUCCESS:
        state = Object.assign({}, state, {data: action.data, loading: false});
        return state;
      case LOGIN_FAILD:
        state = Object.assign({}, state, {error: true, loading: false});
        return state;
      case LOGIN_FAILD_API_MESSAGE:
        state = Object.assign({}, state, {loading: false});
        return state;
      default:
        return state;
    }
  };

const rtiDataReducer = (state = rtiData, action) => {
    switch (action.type) {
      case RTIUPDATE_SUCCESS:
        state = Object.assign({}, state, {data: action.data, loading: false});
        return state;
      case RTIUPDATE_FAILD:
        state = Object.assign({}, state, {error: true, loading: false});
        return state;
      default:
        return state;
    }
  };


  // user register data
const userRegisterDataReducer = (state = userRegisterData, action) => {
  switch (action.type) {
    case REGISTER:
      state = Object.assign({}, state, {loading: true});
      return state;
    case REGISTER_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case REGISTER_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

  // user register data
const userDetailsDataReducer = (state = userDetailsData, action) => {
  switch (action.type) {
    case DETAILS:
      state = Object.assign({}, state, {loading: true});
      return state;
    case DETAILS_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case DETAILS_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// org list data
const orgListDataReducer = (state = orgListData, action) => {
  switch (action.type) {
    case LOAD_ORG:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_ORG_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_ORG_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// count list data
const countDataReducer = (state = countData, action) => {
  switch (action.type) {
    case LOAD_ALL_ARTICALS:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_ALL_ARTICALS_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_ALL_ARTICALS_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    case LOAD_COUNT:
      state = Object.assign({}, state, {loadingCount: true});
      return state;
    case LOAD_COUNT_SUCCESS:
      state = Object.assign({}, state, {dataCount: action.data, loading: false});
      return state;
    case LOAD_COUNT_FAILD:
      state = Object.assign({}, state, {errorCount: true, loading: false});
      return state;
    default:
      return state;
  }
};

// articals list data
const articalsDataReducer = (state = articalsData, action) => {
  switch (action.type) {
    case LOAD_ARTICALS:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_ARTICALS_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_ARTICALS_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// artical data
const articalDataReducer = (state = articalData, action) => {
  switch (action.type) {
    case LOAD_ARTICAL:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_ARTICAL_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_ARTICAL_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// load accepted data
const acceptedDataReducer = (state = acceptedData, action) => {
  switch (action.type) {
    case LOAD_ACCEPTED:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_ACCEPTED_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_ACCEPTED_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// load pending data
const pendingDataReducer = (state = pendingData, action) => {
  switch (action.type) {
    case LOAD_PENDING:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_PENDING_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_PENDING_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};


// load completed data
const completedDataReducer = (state = completedData, action) => {
  switch (action.type) {
    case LOAD_COMPLETED:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_COMPLETED_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_COMPLETED_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};


// load completed data
const rejectedDataReducer = (state = rejectedData, action) => {
  switch (action.type) {
    case LOAD_REJECTED:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_REJECTED_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_REJECTED_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// load all articals data
const allArticalsDataReducer = (state = allArticalsData, action) => {
  switch (action.type) {
    case LOAD_ALL_ARTICALS:
      state = Object.assign({}, state, {loading: true});
      return state;
    case LOAD_ALL_ARTICALS_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case LOAD_ALL_ARTICALS_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

// create request data
const createRequestDataReducer = (state = createRequestData, action) => {
  switch (action.type) {
    case CREATE_REQUEST:
      state = Object.assign({}, state, {loading: true});
      return state;
    case CREATE_REQUEST_SUCCESS:
      state = Object.assign({}, state, {data: action.data, loading: false});
      return state;
    case CREATE_REQUEST_FAILD:
      state = Object.assign({}, state, {error: true, loading: false});
      return state;
    default:
      return state;
  }
};

  // Combine all the reducers
const rootReducer = combineReducers({
  userDataReducer,
  userRegisterDataReducer,
  userDetailsDataReducer,
  orgListDataReducer,
  articalsDataReducer,
  articalDataReducer,
  acceptedDataReducer,
  pendingDataReducer,
  allArticalsDataReducer,
  createRequestDataReducer,
  completedDataReducer,
  rejectedDataReducer,
  rtiDataReducer,
  countDataReducer
  });


  export default rootReducer;
