import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Header } from './components';
import { PostList } from './components/PostList';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Header />
      <PostList />
    </ThemeProvider>
  );
}

export default App;
