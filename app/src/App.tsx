import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Header } from './components';
import { PostList } from './components/PostList';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <PostList />
    </ThemeProvider>
  );
}

export default App;
