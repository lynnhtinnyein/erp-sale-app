import { Paper, TableContainer, Typography, Table as MuiTable } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Table = ({
    children,
    isEmpty
}) => {
  return (
        <TableContainer
            component={Paper} 
            square
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