import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Loading = () =>{
  return (
    <Box sx={{ 
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems: "center",
        textAlign:"center",
        minHeight: "100vh"
      }}>
    <Typography component="div">

      <Box sx={{ fontSize: 16, m: 1 }}>Please Wait</Box>
      <Box sx={{ fontSize: 'h6.fontSize', m: 1 }}>&#127828; &#127790; &#127789; &#127835; &#127837; &#127839;</Box>
      
    </Typography>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
