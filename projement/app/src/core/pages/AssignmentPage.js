import React from 'react';
import ReactMarkdown from 'react-markdown';

import readme from '../../../../../README.md';

/**
 * A more convenient way to look at the assignment.
 */
const AssignmentPage = () => (
    <>
        <div className="assignment-content">
            <ReactMarkdown source={readme} />
        </div>
        <hr />
        <p className="text-right">&copy; Thorgate</p>
    </>
);

export default AssignmentPage;
