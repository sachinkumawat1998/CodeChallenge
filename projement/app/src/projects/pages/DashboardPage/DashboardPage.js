import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
 
import { Spinner } from 'core';
import {
   fetchProjects,
   getProjects,
   getIsLoading,
} from 'projects/ducks/projects';
import { projectType } from 'projects/propTypes';
 
const DashboardPage = ({ fetchProjects, projects, isLoading }) => {
  const [limit, SetLimit] = useState(10);
  const [offset, SetOffset] = useState(1);

  useEffect(() => {
    fetchProjects(limit, offset);
  }, [fetchProjects]);

  if (isLoading) {
    return <Spinner />;
  }

  const apiCall = async (limit, offset) => {
    if (limit <= 0) {
      limit = 1;
    }
    try {
      response = await fetchProjects(limit, offset);
    } catch (errors) {}
  };
  const privious = () => {
    debugger
      apiCall( limit,offset - limit);
      SetOffset(offset - limit, limit);
  };

  const next = () => {
    apiCall(limit,offset + limit );
    SetOffset(offset + limit, limit);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project</th>
            <th>Tags</th>
            <th>Company</th>
            <th>Estimated</th>
            <th>Actual</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => (
            <tr key={project.id}>
              <td data-testid={`project-title-${i}`}>
                <Link to={`/projects/${project.id}`}>
                  {project.has_ended ? <s>{project.title}</s> : project.title}
                </Link>
                {project.is_over_budget && (
                  <Badge
                    color="danger"
                    className="ml-2"
                    data-testid="over-budget-badge"
                  >
                    <FontAwesomeIcon icon={faClock} />
                  </Badge>
                )}
              </td>
              <td data-testid={`project-tags-${i}`}>
                {project.tags.map((tag) => (
                  <Badge key={tag.id} color={tag.color} className="mr-2">
                    {tag.name}
                  </Badge>
                ))}
              </td>
              <td data-testid={`project-company-name-${i}`}>
                {project.company.name}
              </td>
              <td data-testid={`project-estimated-hours-${i}`}>
                {project.total_estimated_hours}
              </td>
              <td data-testid={`project-actual-hours-${i}`}>
                {project.total_actual_hours}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {offset == 1 ? null : (
        <button onClick={() => privious()}>PreviousPage</button>
      )}
      {projects.length < limit ? null : (
        <button style={{ float: "right" }} onClick={() => next()}>
          NextPage
        </button>
      )}
    </div>
  );
};

DashboardPage.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(projectType).isRequired,
};

const mapStateToProps = (state) => ({
  projects: getProjects(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: (limit,offset) => dispatch(fetchProjects(limit,offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
