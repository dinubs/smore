export const SET_USER = 'SET_USER';
import get from '../utils/get_user';

export function set(user) {
  return {
    type: SET_USER,
    user: user
  };
}

export function getFromMedium() {
  return dispatch => {
    get((user) => {
      dispatch(set(user));
    });
  }
}

