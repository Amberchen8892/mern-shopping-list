import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../actions/types";
import { returnErrors } from "../actions/errorActions";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Register User
export const register = ({ name, email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // request body
  const body = JSON.stringify({ name, email, password });
  console.log("check data sent to backend", body);
  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "REGISTER FAIL"
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
// login user
export const login = ({ email, password }) => (dispatch) => {
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // request body
  const body = JSON.stringify({ email, password });
  console.log("check data sent to backend", body);
  axios
    .post("/api/auth", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// logout user
export const logout = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};

export const tokenConfig = (getState) => {
  //get token from localstorage
  const token = getState().auth.token;
  //header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  // if token, add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
