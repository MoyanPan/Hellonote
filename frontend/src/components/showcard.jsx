import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
    palette: {
      background: {
        paper: '#FFFFFF',
      },
      text: {
        primary: '#173A5E',
        secondary: '#46505A',
      },
      action: {
        active: '#001E3C',
      },
      success: {
        dark: '#009688',
      },
    },
  });

const Showcard =({month, year, notenum, sign, title })=>{

   return (
        <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 10,
            p: 2,
            width: '200px',
            height: '200px',
            mt:"70px",
            border: 2,
            borderColor:"#5470FF",
            
          }}
        >
          <Box sx={{ color: 'text.secondary', mt:"4%",ml:"5%", fontWeight: '900' }}>{month}, {year}</Box>
          
          <Box sx={{ fontSize: 34, fontWeight: '900',mt:"45%" }}>
           {notenum}
           <Box
            sx={{
              display : "span",
              color: sign === "+" ? 'red' : "green",
              display: 'inline',
              fontWeight: '900',
              mx: 0.5,
              fontSize: 30,
            }}
          >
            {sign}
          </Box>
          </Box>
          
          <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
            {title}
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  export default Showcard;