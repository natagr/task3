import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, deleteCourse } from '../actions/course';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Typography from "../../../components/Typography";
import CardContent from "../../../components/CardContent";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Grid from "../../../components/Grid";
import DialogTitle from "../../../components/DialogTitle";
import DialogActions from "../../../components/DialogActions";
import TextField from "../../../components/TextField";
import IconButton from "../../../components/IconButton";
import Container from "../../../components/Container";
import DialogContent from "../../../components/DialogContent";
import Dialog from "../../../components/Dialog";
import DialogContentText from "../../../components/DialogContentText";
import Snackbar from "../../../components/Snackbar";
import Box from "../../../components/Box";
import DeleteIcon from "../../../components/DeleteIcon";
import Pagination from "../../../components/Pagination";
import MuiAlert from "../../../components/MuiAlert";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const CourseList = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);
    const loading = useSelector(state => state.isFetchingCourses);
    const error = useSelector(state => state.errors);
    const totalCourses = useSelector(state => state.totalCourses);
    const navigate = useNavigate();
    const query = useQuery();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
    const [hoveredCourse, setHoveredCourse] = useState(null);
    const [filter, setFilter] = useState({
        name: query.get('name') || '',
        department: query.get('department') || '',
        page: parseInt(query.get('page')) || 1,
        pageSize: 10,
    });
    const { formatMessage } = useIntl();

    useEffect(() => {
        dispatch(fetchCourses(filter));
    }, [dispatch, filter]);

    const handleDeleteClick = (course) => {
        setSelectedCourse(course);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedCourse(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            await dispatch(deleteCourse(selectedCourse.id));
            setNotification({ open: true, message: formatMessage({ id: 'courseDeleted' }), severity: 'success' });
            setOpenDialog(false);
        } catch (err) {
            setNotification({ open: true, message: formatMessage({ id: 'courseDeleteError' }), severity: 'error' });
        }
    };

    const handleNotificationClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    const handleCardClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({ ...prevFilter, [name]: value, page: 1 }));
    };

    const handlePageChange = (event, newPage) => {
        setFilter(prevFilter => ({ ...prevFilter, page: newPage }));
    };

    const applyFilter = () => {
        navigate(`?name=${filter.name}&department=${filter.department}&page=${filter.page}`);
        dispatch(fetchCourses(filter));
    };

    useEffect(() => {
        const params = new URLSearchParams(filter);
        navigate(`?${params.toString()}`);
        dispatch(fetchCourses(filter));
    }, [filter, navigate, dispatch]);

    if (loading) return <p>{formatMessage({ id: 'loading' })}</p>;

    if (error && error.length > 0) {
        return (
            <div>
                {error.map((err, index) => (
                    <p key={index}>{formatMessage({ id: 'error' })}: {err.description}</p>
                ))}
            </div>
        );
    }

    if (courses.length === 0) {
        return <p>{formatMessage({ id: 'noCoursesFound' })}</p>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{formatMessage({ id: 'title' })}</Typography>

            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <TextField
                        label={formatMessage({ id: 'name' })}
                        name="name"
                        value={filter.name}
                        onChange={handleFilterChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label={formatMessage({ id: 'department' })}
                        name="department"
                        value={filter.department}
                        onChange={handleFilterChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={applyFilter} sx={{ ml: 2, mt: 1 }}>{formatMessage({ id: 'applyFilter' })}</Button>
                </Box>
                <Button variant="contained" component={Link} onClick={() => navigate('/course/new')}>{formatMessage({ id: 'addCourse' })}</Button>
            </Box>

            <Box mt={4}>
                <Grid container spacing={3} justifyContent="center">
                    {courses.map(course => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <div
                                style={{ position: 'relative', cursor: 'pointer' }}
                                onMouseEnter={() => setHoveredCourse(course.id)}
                                onMouseLeave={() => setHoveredCourse(null)}
                                onClick={() => handleCardClick(course.id)}
                            >
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">{course.name}</Typography>
                                        <Typography variant="body2">{formatMessage({ id: 'departments' })}: {course.departments.join(', ')}</Typography>
                                        <Typography variant="body2">{formatMessage({ id: 'instructor' })}: {course.instructor.name}</Typography>
                                    </CardContent>
                                </Card>
                                {hoveredCourse === course.id && (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(course);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box mt={3} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(totalCourses / filter.pageSize)}
                    page={filter.page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{formatMessage({ id: 'confirmDelete' })}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: 'confirmDeleteMessage' }, { name: selectedCourse?.name })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        {formatMessage({ id: 'cancel' })}
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        {formatMessage({ id: 'confirm' })}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
            >
                <MuiAlert onClose={handleNotificationClose} severity={notification.severity}>
                    {notification.message}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default CourseList;
