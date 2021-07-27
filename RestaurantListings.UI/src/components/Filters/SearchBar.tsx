import React from "react"
import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon
  } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
const SeachBar =()=>(
<Box sx={{ mt: 1 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 800 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search Resturant"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
)
export default SeachBar;