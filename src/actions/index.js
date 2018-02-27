export function attemptLogIn(authIsCorrect) {
  return {
    type: 'SET_LOGGED_TO',
    data: authIsCorrect
  };
}

export function logOut() {
  return {
    type: 'LOG_OUT',
    data: false
  };
}
