import { combineReducers } from 'redux';

import user from './user';
import courseList from "../../pages/courseList/reducers/course";

export default combineReducers({
  user,
  courseList
});
