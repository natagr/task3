import CourseListPage from 'pages/courseList';
import React from 'react';

import PageContainer from './components/PageContainer';

const CourseList = (props) => {
    return (
        <PageContainer>
            <CourseListPage {...props} />
        </PageContainer>
    );
};

export default CourseList;
