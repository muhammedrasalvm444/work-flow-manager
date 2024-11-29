import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { loginSuccess, loginFailure } from "../features/AuthSlice";

// Real API call using Axios
const loginApi = async (credentials) => {
  // Replace with your real API URL
  const apiUrl = "'https://dummyjson.com/auth/login'";

  try {
    const response = await axios.post(apiUrl, credentials);
    return response.data; // Assuming the response has the shape { token, user }
  } catch (error) {
    throw error; // If the API call fails, throw an error
  }
};

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(loginApi, { email, password });
    yield put(loginSuccess(response)); // Dispatch success with the response data
  } catch (error) {
    // Handle errors (you can customize the error message based on error type)
    yield put(loginFailure("Invalid credentials"));
  }
}

// Watcher Saga
function* authSaga() {
  yield takeLatest("auth/loginRequest", loginSaga);
}

export default authSaga;
