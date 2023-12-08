import * as Auth from "./features/auth.feature";
import messageSlice from "./features/message.slice";
import userSlice from "./features/user.feature";
const reducers = {
  login: Auth.default.loginReducer,
  message: messageSlice,
  user: userSlice,
};

export default reducers;
