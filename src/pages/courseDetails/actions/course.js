import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    DELETE_COURSE_SUCCESS,
    REQUEST_ADD_COURSE,
    REQUEST_UPDATE_COURSE,
    SUCCESS_ADD_COURSE,
    SUCCESS_UPDATE_COURSE,
    ERROR_ADD_COURSE,
    ERROR_UPDATE_COURSE,
} from '../constants/actionTypes';
import { MOCK_COURSE_RESPONSE, MOCK_COURSES } from '../../mockCourses';

const fetchCoursesRequest = () => ({
    type: FETCH_COURSES_REQUEST,
});

const fetchCoursesSuccess = (courses) => ({
    payload: courses,
    type: FETCH_COURSES_SUCCESS,
});

const fetchCoursesFailure = (error) => ({
    payload: error,
    type: FETCH_COURSES_FAILURE,
});

const requestAddCourse = () => ({
    type: REQUEST_ADD_COURSE,
});

const successAddCourse = (course) => ({
    payload: course,
    type: SUCCESS_ADD_COURSE,
});

const errorAddCourse = (errors) => ({
    payload: errors,
    type: ERROR_ADD_COURSE,
});

const requestUpdateCourse = () => ({
    type: REQUEST_UPDATE_COURSE,
});

const successUpdateCourse = (course) => ({
    payload: course,
    type: SUCCESS_UPDATE_COURSE,
});

const errorUpdateCourse = (errors) => ({
    payload: errors,
    type: ERROR_UPDATE_COURSE,
});

export const fetchAllCourses = () => (dispatch) => {
    dispatch(fetchCoursesRequest());
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                courses: MOCK_COURSES,
                total: MOCK_COURSES.length,
            });
        }, 1000);
    })
        .then(({ courses, total }) => {
            dispatch(fetchCoursesSuccess({ courses, total }));
        })
        .catch((error) => dispatch(fetchCoursesFailure(error)));
};

export const addCourse = ({ name, code, description, credits, departments, instructor }) => (dispatch) => {
    dispatch(requestAddCourse());
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_COURSE_RESPONSE);
        }, 1000);
    })
        .then((course) => dispatch(successAddCourse(course)))
        .catch((errors) => dispatch(errorAddCourse(errors)));
};

export const updateCourse = ({ id, name, code, description, credits, departments, instructor }) => (dispatch) => {
    dispatch(requestUpdateCourse());
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name, code, description, credits, departments, instructor });
        }, 1000);
    })
        .then((course) => dispatch(successUpdateCourse(course)))
        .catch((errors) => dispatch(errorUpdateCourse(errors)));
};