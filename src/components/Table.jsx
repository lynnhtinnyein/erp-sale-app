import { Paper, TableContainer, Typography, Table as MuiTable } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Table = ({
    children,
    isEmpty,
    ...props
}) => {
  return (
        <TableContainer 
            component={Paper} 
            square
            {...props}
        >
            <MuiTable
                stickyHeader 
                sx={{ minWidth: 1000 }}
            >
                { children }
            </MuiTable>

            { isEmpty ? (
                <Box
                    display="flex"
                    backgroundColor="white"
                    alignItems="center"
                    justifyContent="center"
                    height={100}
                >
                    <Typography color="lightgray">
                        No Records Found
                    </Typography>
                </Box>
            ) : ''}
        </TableContainer>
  )
}

export default Table