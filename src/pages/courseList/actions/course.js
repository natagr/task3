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
import {MOCK_COURSE_RESPONSE, MOCK_COURSES} from "../../mockCourses";



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

const deleteCourseSuccess = (id) => ({
    payload: id,
    type: DELETE_COURSE_SUCCESS,
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


// actions/course.js
// actions/course.js
export const fetchCourses = (filter) => (dispatch) => {
    dispatch(fetchCoursesRequest());
    return new Promise((resolve) => {

        setTimeout(() => {

            let filteredCourses = MOCK_COURSES;

            if (filter.name) {
                filteredCourses = filteredCourses.filter(course => course.name.toLowerCase().includes(filter.name.toLowerCase()));
            }
            if (filter.department) {
                filteredCourses = filteredCourses.filter(course => course.departments.includes(filter.department));
            }

            const startIndex = (filter.page - 1) * filter.pageSize;
            const paginatedCourses = filteredCourses.slice(startIndex, startIndex + filter.pageSize);

            resolve({
                courses: paginatedCourses,
                total: filteredCourses.length,
            });
        }, 1000);
    })
        .then(({ courses, total }) => {
            dispatch(fetchCoursesSuccess({ courses, total }));
        })
        .catch((error) => dispatch(fetchCoursesFailure(error)));
};


export const deleteCourse = (id) => (dispatch) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 500);
    })
        .then(() => dispatch(deleteCourseSuccess(id)))
        .catch((error) => console.error("Failed to delete course", error));
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

const exportFunctions = {
    fetchCourses,
    deleteCourse,
    addCourse,
    updateCourse,
};

export default exportFunctions;
