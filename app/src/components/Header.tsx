import { Box, Button, Container } from '@mui/material';
import './styles.css';

export const Header = () => {
  return (
    <header>
      <Container>
        <Box className="nav-container">
          <span className="title">LegalJob</span>
          <Button
            variant="contained"
            className="create-button"
            onClick={() => {}}
          >
            Create Post
          </Button>
        </Box>
      </Container>
    </header>
  );
};
