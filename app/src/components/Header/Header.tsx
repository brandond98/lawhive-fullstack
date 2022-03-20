import { Box, Button, Container } from '@mui/material';
import { useState } from 'react';
import './styles.css';
import { PostForm } from '../../Forms/PostForm';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <PostForm open={open} handleClose={handleClose} />
      <header>
        <Container>
          <Box className="nav-container">
            <span className="title">LegalJob</span>
            <Button
              variant="contained"
              className="create-button"
              onClick={handleOpen}
            >
              Create Post
            </Button>
          </Box>
        </Container>
      </header>
    </>
  );
};
