import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  indexPageContainer: {
    textAlign: 'center'
  },
  sectionsListContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
});

// TODO: think about design
const IndexPage = ({ boards, classes }) => (
  <div className={classes.indexPageContainer}>
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

    <div className={classes.sectionsListContainer}>
      {boards.map(section => (
        <div>
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
        </div>
      ))}
    </div>
  </div>
);

export default withStyles(styles)(IndexPage);
