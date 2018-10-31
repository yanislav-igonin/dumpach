import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const IndexPageContainer = styled.div`
  text-align: center;
`;
const SectionsListContainer = styled.div`
  margin-top: 20px;
`;
const SectionContainer = styled.div`
  margin-top: 20px;
`;

// TODO: think about design
const IndexPage = ({ boards }) => (
  <IndexPageContainer>
    <Typography variant="display1" color="primary">
      this is dumpach
    </Typography>
    <Typography variant="display1" color="primary">
      anonymous imageboard
    </Typography>
    <Typography variant="display1" color="primary">
      post any shit
    </Typography>
    <Typography variant="display1" color="primary">
      discuss any shit
    </Typography>
    <Typography variant="display1" color="primary">
      feel free
    </Typography>

    <SectionsListContainer>
      {boards.map(section => (
        <SectionContainer>
          <Typography variant="display1" color="primary">
            {section.title}
          </Typography>
          {section.boards.map(board => (
            <Link to={board.id}>
              <Typography variant="body" color="primary">
                {`${board.id} - ${board.title}`}
              </Typography>
            </Link>
          ))}
        </SectionContainer>
      ))}
    </SectionsListContainer>
  </IndexPageContainer>
);

export default IndexPage;
