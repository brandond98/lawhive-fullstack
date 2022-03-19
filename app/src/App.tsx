import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Header } from './components';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
