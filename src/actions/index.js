import NavigationService from '../services/navigation'
import '../global';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILD = 'LOGIN_FAILD';
export const LOGIN_FAILD_API_MESSAGE = 'LOGIN_FAILD_API_MESSAGE';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILD = 'REGISTER_FAILD';

export const DETAILS = 'DETAILS';
export const DETAILS_SUCCESS = 'DETAILS_SUCCESS';
export const DETAILS_FAILD = 'DETAILS_FAILD';

export const PROFILEUPDATE = 'PROFILEUPDATE';
export const PROFILEUPDATE_SUCCESS = 'PROFILEUPDATE_SUCCESS';
export const PROFILEUPDATE_FAILD = 'PROFILEUPDATE_FAILD';

export const RTIUPDATE = 'RTIUPDATE';
export const RTIUPDATE_SUCCESS = 'RTIUPDATE_SUCCESS';
export const RTIUPDATE_FAILD = 'RTIUPDATE_FAILD';

export const LOAD_ORG = 'LOAD_ORG';
export const LOAD_ORG_SUCCESS = 'LOAD_ORG_SUCCESS';
export const LOAD_ORG_FAILD = 'LOAD_ORG_FAILD';

export const LOAD_ARTICALS = 'LOAD_ARTICALS';
export const LOAD_ARTICALS_SUCCESS = 'LOAD_ARTICALS_SUCCESS';
export const LOAD_ARTICALS_FAILD = 'LOAD_ARTICALS_FAILD';

export const LOAD_ARTICAL = 'LOAD_ARTICAL';
export const LOAD_ARTICAL_SUCCESS = 'LOAD_ARTICAL_SUCCESS';
export const LOAD_ARTICAL_FAILD = 'LOAD_ARTICAL_FAILD';

export const LOAD_ACCEPTED = 'LOAD_ACCEPTED';
export const LOAD_ACCEPTED_SUCCESS = 'LOAD_ACCEPTED_SUCCESS';
export const LOAD_ACCEPTED_FAILD = 'LOAD_ACCEPTED_FAILD';

export const LOAD_COMPLETED = 'LOAD_COMPLETED';
export const LOAD_COMPLETED_SUCCESS = 'LOAD_COMPLETED_SUCCESS';
export const LOAD_COMPLETED_FAILD = 'LOAD_COMPLETED_FAILD';

export const LOAD_REJECTED = 'LOAD_REJECTED';
export const LOAD_REJECTED_SUCCESS = 'LOAD_REJECTED_SUCCESS';
export const LOAD_REJECTED_FAILD = 'LOAD_REJECTED_FAILD';

export const LOAD_COUNT = 'LOAD_COUNT';
export const LOAD_COUNT_SUCCESS = 'LOAD_COUNT_SUCCESS';
export const LOAD_COUNT_FAILD = 'LOAD_COUNT_FAILD';

export const LOAD_PENDING = 'LOAD_PENDING';
export const LOAD_PENDING_SUCCESS = 'LOAD_PENDING_SUCCESS';
export const LOAD_PENDING_FAILD = 'LOAD_PENDING_FAILD';

export const LOAD_ALL_ARTICALS = 'LOAD_ALL_ARTICALS';
export const LOAD_ALL_ARTICALS_SUCCESS = 'LOAD_ALL_ARTICALS_SUCCESS';
export const LOAD_ALL_ARTICALS_FAILD = 'LOAD_ALL_ARTICALS_FAILD';

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CREATE_REQUEST_FAILD = 'CREATE_REQUEST_FAILD';


// API URL
const URL = 'https://rtiapi.proconsinfo.com/api/public';

var USER_ID;
/**
 * Get the token using login data
 * @param {*} data
 * @param {*} callback
 */
export function userLogin(data, callback) {
    return dispatch => {
        dispatch({ type: LOGIN });
        fetch(URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('userLogin - ', responseJson);
                if(responseJson){
                    global.TOKEN_TYPE = responseJson.token_type;
                    global.TOKEN = responseJson.access_token;
                    this.userDetails();
                }
                if (responseJson.message) {
                  alert(responseJson.message);
                  dispatch({ type: LOGIN_FAILD_API_MESSAGE });
                  callback(false);
                }else{
                  dispatch({ type: LOGIN_SUCCESS, data: responseJson });
                  callback(true);
                }

            })
            .catch(err => {
                console.log('userLogin Err- ', err);
                dispatch({ type: LOGIN_FAILD });
                callback(false);
            });
    };
}

/**
 * user login
 * @param {*} data
 * @param {*} callback
 */
export function userRegister(data, callback) {
    return dispatch => {
        dispatch({ type: REGISTER });
        fetch(URL + '/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('userRegister - ', responseJson);
                dispatch({ type: REGISTER_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('userRegister Err- ', err);
                dispatch({ type: REGISTER_FAILD });
                callback(false);
            });
    };
}

/**
 * get user details
 */
export function userDetails(callback) {
    return dispatch => {
        dispatch({ type: DETAILS });
        fetch(URL + '/user/logged', {
            method: 'GET',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('userDetails - ', responseJson);
                global.USERID = responseJson.user.id;
                dispatch({ type: DETAILS_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('userDetails Err- ', err);
                dispatch({ type: DETAILS_FAILD });
                callback(false);
            });
    };
}

/**
 * user updates
 * @param {*} data
 * @param {*} callback
 */
export function userUpdate(data, callback) {
    var userd = global.USERID;
    return dispatch => {
        dispatch({ type: PROFILEUPDATE });
        fetch(URL + '/user/' + userd,{
            method: 'PATCH',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('userUpdate - ', responseJson);
                dispatch({ type: PROFILEUPDATE_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('userUpdate Err- ', err);
                dispatch({ type: PROFILEUPDATE_FAILD });
                callback(false);
            });
    };

}

// export function rtiUpdate(data, callback) {
//   console.log("dimma");
//   console.log(data.fileName);
//     return dispatch => {
//         dispatch({ type: RTIUPDATE});
//         fetch(URL + '/rti-request/update-status',{
//             method: 'POST',
//             headers: {
//                 'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data),
//         })
//             .then(response => {
//                 console.log(response)
//                 if (!response.ok) {
//                     callback(false);
//                     throw new Error(response.status);
//                 }
//                 else {
//                     return response.json();
//                 }
//             })
//             .then(responseJson => {
//                 console.log('rtiUpdate - ', responseJson);
//                 dispatch({ type: RTIUPDATE_SUCCESS, data: responseJson });
//                 callback(true);
//             })
//             .catch(err => {
//                 console.log('rtiUpdate Err- ', err);
//                 dispatch({ type: RTIUPDATE_FAILD });
//                 callback(false);
//             });
//     };
// }

// export function rtiUpdate(data, callback) {
//     console.log("dimuuuu");
//     console.log(data);
//   if(data.asking == "AskingMoreYes"){
//   const formData = new FormData();
//     formData.append('asking', data.asking);
//     formData.append('rti_id', data.rti_id);
//     // formData.append('test', "test one");
//       return dispatch => {
//           dispatch({ type: RTIUPDATE});
//           fetch(URL + '/rti-request/update-status',{
//               method: 'POST',
//               headers: {
//                   'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
//                   "Accept": "application/json",
//                   "Content-Type": "application/json"
//               },
//               body: formData,
//           })
//               .then(response => {
//                   console.log(response)
//                   if (!response.ok) {
//                       callback(false);
//                       throw new Error(response.status);
//                   }
//                   else {
//                       return response.json();
//                   }
//               })
//               .then(responseJson => {
//                   console.log('rtiUpdate - ', responseJson);
//                   dispatch({ type: RTIUPDATE_SUCCESS, data: responseJson });
//                   callback(true);
//               })
//               .catch(err => {
//                   console.log('rtiUpdate Err- ', err);
//                   dispatch({ type: RTIUPDATE_FAILD });
//                   callback(false);
//               });
//       };
//   }else{
//   const formData2 = new FormData();

//     formData2.append('rti_payment_file', data.rti_payment_file);
//     formData2.append('rti_id', data.rti_id);
//       return dispatch => {
//           dispatch({ type: RTIUPDATE});
//           fetch(URL + '/rti-request/update-status',{
//               method: 'POST',
//               headers: {
//                   'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
//                   "Accept": "application/json",
//                   "Content-Type": "application/json"
//               },
//               body: formData2,
//           })
//               .then(response => {
//                   console.log(response)
//                   if (!response.ok) {
//                       callback(false);
//                       throw new Error(response.status);
//                   }
//                   else {
//                       return response.json();
//                   }
//               })
//               .then(responseJson => {
//                   console.log('rtiUpdate - ', responseJson);
//                   dispatch({ type: RTIUPDATE_SUCCESS, data: responseJson });
//                   callback(true);
//               })
//               .catch(err => {
//                   console.log('rtiUpdate Err- ', err);
//                   dispatch({ type: RTIUPDATE_FAILD });
//                   callback(false);
//               });
//       };
//   }
// }







export function rtiUpdate(data, callback) {
    console.log("dimuuuu");
    console.log(data);
  if(data.asking == "AskingMoreYes"){
  const formData = new FormData();
    formData.append('asking', data.asking);
    formData.append('rti_id', data.rti_id);
      return dispatch => {
          dispatch({ type: RTIUPDATE});
          fetch(URL + '/rti-request/update-status',{
              method: 'POST',
              headers: {
                  'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                  "Accept": "application/json",
                  "Content-Type": "multipart/form-data"
              },
              body: formData,
          })
              .then(response => {
                  console.log(response)
                  if (!response.ok) {
                      callback(false);
                      throw new Error(response.status);
                  }
                  else {
                      return response.json();
                  }
              })
              .then(responseJson => {
                  console.log('rtiUpdate - ', responseJson);
                  dispatch({ type: RTIUPDATE_SUCCESS, data: responseJson });
                  callback(true);
              })
              .catch(err => {
                  console.log('rtiUpdate Err- ', err);
                  dispatch({ type: RTIUPDATE_FAILD });
                  callback(false);
              });





      };
  }else{
  const formData2 = new FormData();

    formData2.append('rti_payment_file', data.rti_payment_file);
    formData2.append('rti_id', data.rti_id);
      return dispatch => {
          dispatch({ type: RTIUPDATE});
          fetch(URL + '/rti-request/update-status',{
              method: 'POST',
              headers: {
                  'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                  "Accept": "application/json",
                  "Content-Type": "multipart/form-data"
              },
              body: formData2,
          })
              .then(response => {
                  console.log(response)
                  if (!response.ok) {
                      callback(false);
                      throw new Error(response.status);
                  }
                  else {
                      return response.json();
                  }
              })
              .then(responseJson => {
                  console.log('rtiUpdate - ', responseJson);
                  dispatch({ type: RTIUPDATE_SUCCESS, data: responseJson });
                  callback(true);
              })
              .catch(err => {
                  console.log('rtiUpdate Err- ', err);
                  dispatch({ type: RTIUPDATE_FAILD });
                  callback(false);
              });
      };
  }
}









// export function rtiPaymentFileUpload(data, callback) {
//   const formData = new FormData();
//   formData.append('fileName', data.fileName);
//   formData.append('status', data.status);
//   formData.append('rti_id', data.rti_id);
//     return dispatch => {
//         dispatch({ type: RTIUPDATE});
//         fetch(URL + '/rti-request/update-status',{
//             method: 'POST',
//             headers: {
//                 'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             },
//             body: formData,
//         })
//             .then(response => {
//                 console.log(response)
//                 if (!response.ok) {
//                     callback(false);
//                     throw new Error(response.status);
//                 }
//                 else {
//                     return response.json();
//                 }
//             })
//             .then(responseJson => {
//                 console.log('rtiUpdate - ', responseJson);
//                 dispatch({ type: RTIUPDATE_SUCCESS, data: responseJson });
//                 callback(true);
//             })
//             .catch(err => {
//                 console.log('rtiUpdate Err- ', err);
//                 dispatch({ type: RTIUPDATE_FAILD });
//                 callback(false);
//             });
//     };
// }


/**
 * get list of organization
 */
export function loadOrgList(callback) {
    return dispatch => {
        dispatch({ type: LOAD_ORG });
        fetch(URL + '/organization', {
            method: 'GET',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('loadOrgList - ', responseJson);
                dispatch({ type: LOAD_ORG_SUCCESS, data: responseJson });
                callback(true)
            })
            .catch(err => {
                console.log('loadOrgList Err- ', err);
                dispatch({ type: LOGIN_FAILD });
                callback(false);
            });
    };
}


/**
 * get count of requests
 */
export function loadCountRequestList(callback) {
    return dispatch => {
        dispatch({ type: LOAD_COUNT });
        fetch(URL + '/rti-request/get-count-by-status', {
            method: 'GET',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('loadCountList - ', responseJson);
                dispatch({ type: LOAD_COUNT_SUCCESS, data: responseJson });
                callback(true)
            })
            .catch(err => {
                console.log('loadCountList Err- ', err);
                dispatch({ type: LOAD_COUNT_FAILD });
                callback(false);
            });
    };
}

/**
 * get list of articals
 */
export function loadArticles(callback) {
    return dispatch => {
        dispatch({ type: LOAD_ARTICALS });
        fetch(URL + '/rti-request/articles', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('loadArticles - ', responseJson);
                dispatch({ type: LOAD_ARTICALS_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('loadArticles Err- ', err);
                dispatch({ type: LOAD_ARTICALS_FAILD });
                callback(false);
            });
    };
}

/**
 * get details of an artical
 */
export function loadArticleDetails(id, callback) {
    return dispatch => {
        dispatch({ type: LOAD_ARTICAL });
        fetch(URL + '/rti-request/articles', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'article_id': id }),
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('loadArticleDetails - ', responseJson);
                dispatch({ type: LOAD_ARTICAL_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('loadArticleDetails Err- ', err);
                dispatch({ type: LOAD_ARTICAL_FAILD });
                callback(false);
            });
    };
}

/**
 * get all requests feed
 */
export function allRequestFeed(callback) {
    const formData = new FormData();
    formData.append('status', 'Accepted');
    return dispatch => {
        dispatch({ type: LOAD_ACCEPTED });
        fetch(URL + '/rti-request/by-status?', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('allRequestFeed - ', responseJson);
                dispatch({ type: LOAD_ACCEPTED_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('allRequestFeed Err- ', err);
                dispatch({ type: LOAD_ACCEPTED_FAILD });
                callback(false);
            });
    };
}


/**
 * get all pending feed
 */
export function allPendingFeed(callback) {
    const formData = new FormData();
    formData.append('status', 'Pending');
    return dispatch => {
        dispatch({ type: LOAD_PENDING });
        fetch(URL + '/rti-request/by-status?', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('allPendingFeed - ', responseJson);
                dispatch({ type: LOAD_PENDING_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('allPendingFeed Err- ', err);
                dispatch({ type: LOAD_PENDING_FAILD });
                callback(false);
            });
    };
}


/**
 * get all Completed feed
 */
export function allCompletedFeed(callback) {
    const formData = new FormData();
    formData.append('status', 'Completed');
    return dispatch => {
        dispatch({ type: LOAD_COMPLETED });
        fetch(URL + '/rti-request/by-status?', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('allCompletedFeed - ', responseJson);
                dispatch({ type: LOAD_COMPLETED_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('allCompletedFeed Err- ', err);
                dispatch({ type: LOAD_COMPLETED_FAILD });
                callback(false);
            });
    };
}


/**
 * get all Completed feed
 */
export function allRejectedFeed(callback) {
    const formData = new FormData();
    formData.append('status', 'Rejected');
    return dispatch => {
        dispatch({ type: LOAD_REJECTED });
        fetch(URL + '/rti-request/by-status?', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('allRejectedFeed - ', responseJson);
                dispatch({ type: LOAD_REJECTED_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('allRejectedFeed Err- ', err);
                dispatch({ type: LOAD_REJECTED_FAILD });
                callback(false);
            });
    };
}



/**
 * get all artical feed
 */
export function allAritcalFeed(callback) {
    return dispatch => {
        dispatch({ type: LOAD_ALL_ARTICALS });
        fetch(URL + '/rti-request', {
            method: 'GET',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    callback(false)
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('allAritcalFeed - ', responseJson);
                dispatch({ type: LOAD_ALL_ARTICALS_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('allAritcalFeed Err- ', err);
                dispatch({ type: LOAD_ALL_ARTICALS_FAILD });
                callback(false);
            });
    };
}

/**
 * create a RTI request
 */
export function RTISubmit(data, callback) {
    console.log('RTISubmit - ', data);
    return dispatch => {
        dispatch({ type: CREATE_REQUEST });
        fetch(URL + '/rti-request', {
            method: 'POST',
            headers: {
                'Authorization': global.TOKEN_TYPE + ' ' + global.TOKEN,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
            .then(response => {
                if (!response.ok) {
                    callback(false);
                    throw new Error(response.status);
                }
                else {
                    return response.json();
                }
            })
            .then(responseJson => {
                console.log('RTISubmit - ', responseJson);
                dispatch({ type: CREATE_REQUEST_SUCCESS, data: responseJson });
                callback(true);
            })
            .catch(err => {
                console.log('RTISubmit Err- ', err);
                dispatch({ type: CREATE_REQUEST_FAILD });
                callback(false);
            });
    };
}
