import CourseDetailsPage from 'pages/courseDetails';
import React from 'react';

import PageContainer from './components/PageContainer';

const CourseDetails = (props) => {
    return (
        <PageContainer>
            <CourseDetailsPage {...props} />
        </PageContainer>
    );
};

export default CourseDetails;
