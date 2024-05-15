import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { addCourse, updateCourse, fetchAllCourses } from '../actions/course';
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import Typography from "../../../components/Typography";
import { useIntl } from 'react-intl';

const CourseDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { filterSettings, paginationSettings } = location.state || {};
    const courses = useSelector(state => state.courses);
    const isFetchingCourses = useSelector(state => state.isFetchingCourses);
    const { formatMessage } = useIntl();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(!id);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        name: '',
        code: '',
        description: '',
        credits: '',
        departments: '',
        instructor: { id: '', name: '' }
    });
    const [initialCourse, setInitialCourse] = useState({});

    useEffect(() => {
        if (!courses.length) {
            setLoading(true);
            dispatch(fetchAllCourses()).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, courses.length]);

    useEffect(() => {
        if (id && courses.length) {
            const selectedCourse = courses.find(course => course.id === parseInt(id));
            if (selectedCourse) {
                const courseData = {
                    ...selectedCourse,
                    departments: selectedCourse.departments.join(', ')
                };
                setCourse(courseData);
                setInitialCourse(courseData);
            }
        }
    }, [id, courses]);

    const handleNameChange = (e) => {
        setCourse({ ...course, name: e.target.value });
    };

    const handleCodeChange = (e) => {
        setCourse({ ...course, code: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setCourse({ ...course, description: e.target.value });
    };

    const handleCreditsChange = (e) => {
        setCourse({ ...course, credits: e.target.value });
    };

    const handleDepartmentsChange = (e) => {
        setCourse({ ...course, departments: e.target.value });
    };

    const handleInstructorNameChange = (e) => {
        setCourse({
            ...course,
            instructor: { ...course.instructor, name: e.target.value }
        });
    };

    const validate = () => {
        const newErrors = {};
        if (course.name.length < 2 || course.name.length > 30) {
            newErrors.name = formatMessage({ id: 'nameError' });
        }
        if (!course.code) {
            newErrors.code = formatMessage({ id: 'codeError' });
        }
        if (course.credits > 100) {
            newErrors.credits = formatMessage({ id: 'creditsError' });
        }
        if (!course.departments) {
            newErrors.departments = formatMessage({ id: 'departmentsError' });
        }
        if (!course.instructor.name) {
            newErrors.instructor = formatMessage({ id: 'instructorError' });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const courseData = { ...course, departments: course.departments.split(',').map(dep => dep.trim()) };
        setLoading(true);
        if (id) {
            dispatch(updateCourse({ ...courseData, id }))
                .then(() => {
                    setLoading(false);
                    setMessage(formatMessage({ id: 'courseUpdated' }));
                    setEditMode(false);
                    setTimeout(() => setMessage(''), 3000);
                })
                .catch(() => {
                    setLoading(false);
                    setMessage(formatMessage({ id: 'courseUpdateFailed' }));
                    setTimeout(() => setMessage(''), 3000);
                });
        } else {
            dispatch(addCourse(courseData))
                .then(() => {
                    setLoading(false);
                    setMessage(formatMessage({ id: 'courseAdded' }));
                    setTimeout(() => setMessage(''), 3000);
                    navigate('/');
                })
                .catch(() => {
                    setLoading(false);
                    setMessage(formatMessage({ id: 'courseAddFailed' }));
                    setTimeout(() => setMessage(''), 3000);
                });
        }
    };

    const handleCancel = () => {
        if (id) {
            setCourse(initialCourse);
            setEditMode(false);
        } else {
            navigate('/');
        }
    };

    const handleBack = () => {
        navigate('/course', {
            state: { filterSettings, paginationSettings }
        });
    };

    if (loading || isFetchingCourses) {
        return <div>{formatMessage({ id: 'loading' })}</div>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>{id ? formatMessage({ id: 'courseDetailsTitle' }) : formatMessage({ id: 'addCourseTitle' })}</Typography>
            {message && <Typography variant="body1" color="error">{message}</Typography>}
            <Button onClick={handleBack}>{formatMessage({ id: 'backButton' })}</Button>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            margin="dense"
                            label={formatMessage({ id: 'nameLabel' })}
                            type="text"
                            fullWidth
                            name="name"
                            value={course.name}
                            onChange={handleNameChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </div>
                    <div>
                        <TextField
                            margin="dense"
                            label={formatMessage({ id: 'codeLabel' })}
                            type="text"
                            fullWidth
                            name="code"
                            value={course.code}
                            onChange={handleCodeChange}
                            error={!!errors.code}
                            helperText={errors.code}
                        />
                    </div>
                    <div>
                        <TextField
                            margin="dense"
                            label={formatMessage({ id: 'descriptionLabel' })}
                            type="text"
                            fullWidth
                            name="description"
                            value={course.description}
                            onChange={handleDescriptionChange}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </div>
                    <div>
                        <TextField
                            margin="dense"
                            label={formatMessage({ id: 'creditsLabel' })}
                            type="number"
                            fullWidth
                            name="credits"
                            value={course.credits}
                            onChange={handleCreditsChange}
                            error={!!errors.credits}
                            helperText={errors.credits}
                        />
                    </div>
                    <div>
                        <TextField
                            margin="dense"
                            label={formatMessage({ id: 'departmentsLabel' })}
                            type="text"
                            fullWidth
                            name="departments"
                            value={course.departments}
                            onChange={handleDepartmentsChange}
                            error={!!errors.departments}
                            helperText={errors.departments}
                        />
                    </div>
                    <div>
                        <TextField
                            margin="dense"
                            label={formatMessage({ id: 'instructorLabel' })}
                            type="text"
                            fullWidth
                            name="instructor.name"
                            value={course.instructor.name}
                            onChange={handleInstructorNameChange}
                            error={!!errors.instructor}
                            helperText={errors.instructor}
                        />
                    </div>
                    <div>
                        <Button onClick={handleCancel}>{formatMessage({ id: 'cancelButton' })}</Button>
                        <Button type="submit" color="primary">{id ? formatMessage({ id: 'saveButton' }) : formatMessage({ id: 'createButton' })}</Button>
                    </div>
                </form>
            ) : (
                <div>
                    <Typography variant="body1"><strong>{formatMessage({ id: 'nameLabel' })}:</strong> {course.name}</Typography>
                    <Typography variant="body1"><strong>{formatMessage({ id: 'codeLabel' })}:</strong> {course.code}</Typography>
                    <Typography variant="body1"><strong>{formatMessage({ id: 'descriptionLabel' })}:</strong> {course.description}</Typography>
                    <Typography variant="body1"><strong>{formatMessage({ id: 'creditsLabel' })}:</strong> {course.credits}</Typography>
                    <Typography variant="body1"><strong>{formatMessage({ id: 'departmentsLabel' })}:</strong> {course.departments}</Typography>
                    <Typography variant="body1"><strong>{formatMessage({ id: 'instructorLabel' })}:</strong> {course.instructor.name}</Typography>
                    <Button onClick={() => setEditMode(true)}>{formatMessage({ id: 'editButton' })}</Button>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
