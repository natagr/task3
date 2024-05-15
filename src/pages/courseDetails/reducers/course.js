import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    DELETE_COURSE_SUCCESS,
    REQUEST_ADD_COURSE,
    SUCCESS_ADD_COURSE,
    ERROR_ADD_COURSE,
    REQUEST_UPDATE_COURSE,
    SUCCESS_UPDATE_COURSE,
    ERROR_UPDATE_COURSE,
} from '../constants/actionTypes';

const initialState = {
    courses: [],
    totalCourses: 0,
    errors: [],
    isFetchingCourses: false,
    isFetchingAddCourse: false,
    isFetchingUpdateCourse: false,
    isFailedAddCourse: false,
    isFailedUpdateCourse: false,
};

const convertErrors = errors => errors.map(error => ({
    code: error.code,
    description: error.description,
}));

export default function courseReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COURSES_REQUEST: {
            return {
                ...state,
                isFetchingCourses: true,
                errors: [],
            };
        }

        case FETCH_COURSES_SUCCESS: {
            return {
                ...state,
                courses: action.payload.courses,
                totalCourses: action.payload.total,
                isFetchingCourses: false,
            };
        }

        case FETCH_COURSES_FAILURE: {
            return {
                ...state,
                errors: convertErrors(action.payload),
                isFetchingCourses: false,
            };
        }

        case DELETE_COURSE_SUCCESS: {
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload),
            };
        }

        case REQUEST_ADD_COURSE: {
            return {
                ...state,
                isFetchingAddCourse: true,
                isFailedAddCourse: false,
                errors: [],
            };
        }

        case SUCCESS_ADD_COURSE: {
            return {
                ...state,
                courses: [...state.courses, action.payload],
                isFetchingAddCourse: false,
            };
        }

        case ERROR_ADD_COURSE: {
            return {
                ...state,
                errors: convertErrors(action.payload),
                isFailedAddCourse: true,
                isFetchingAddCourse: false,
            };
        }

        case REQUEST_UPDATE_COURSE: {
            return {
                ...state,
                isFetchingUpdateCourse: true,
                isFailedUpdateCourse: false,
                errors: [],
            };
        }

        case SUCCESS_UPDATE_COURSE: {
            return {
                ...state,
                courses: state.courses.map(course =>
                    course.id === action.payload.id ? action.payload : course
                ),
                isFetchingUpdateCourse: false,
            };
        }

        case ERROR_UPDATE_COURSE: {
            return {
                ...state,
                errors: convertErrors(action.payload),
                isFailedUpdateCourse: true,
                isFetchingUpdateCourse: false,
            };
        }

        default: {
            return state;
        }
    }
}
