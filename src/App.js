import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from './components/AppBar';
import AssociatedCard from './components/AssociatedCard';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0063AF',
    },
    secondary: {
      main: '#ff0000',
    },
  },
});

var idInterval = null;

function App() {
  const [data, setData] = React.useState([]);

  const getAssociateds = async (params) => {
    console.log('loading');
    // ?name_contains=Carlos&type_associated.id=1
    const result = await axios.get('https://strapi-s0zw.onrender.com/associateds', {
      params: {
        _limit: 500,
        _sort: 'name:ASC',
        ...params,
      },
    });

    console.log('finish loading');

    if (result.status === 200) {
      // console.log(result.data);
      setData(result.data);
    } else {
      console.log('error', result);
    }
  };

  const searchByTerm = (event) => {
    const term = event.target.value;

    clearInterval(idInterval);

    idInterval = setInterval(() => {
      getAssociateds({
        name_contains: term,
      });

      clearInterval(idInterval);
    }, 500);
  };

  React.useEffect(() => {
    getAssociateds();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar onSearchByTerm={searchByTerm} />
        {data.map((item, index) => (
          <AssociatedCard key={index} {...item} />
        ))}
      </ThemeProvider>
    </>
  );
}

export default App;
