import * as React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  TableRow,
  Box,
  Chip,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import InlineSpacing from '../components/InlineSpacing'
import {
  getProblemMetaDataFromRange,
  getNumProblems,
} from '../pages/MockProblemData'

interface Column {
  id: 'status' | 'title' | 'tags'
  label: string
  width?: number
  align?: 'right'
}

const columns: readonly Column[] = [
  {
    id: 'status',
    label: 'Status',
    width: 50,
  },
  {
    id: 'title',
    label: 'Title',
    width: 170,
  },
  {
    id: 'tags',
    label: 'Tags',
    width: 120,
    align: 'right',
  },
]

export type ProblemMetaData = {
  problemID: string
  status: string
  title: string
  tags: string[]
}

const getTableValue = (columnID: string, problemMetaData: ProblemMetaData) => {
  if (columnID === 'tags') {
    return problemMetaData[columnID].map((tag, i) => {
      return (
        <span key={i}>
          <Chip label={tag} />
          <InlineSpacing spacing={8} />
        </span>
      )
    })
  }

  if (columnID === 'status') {
    const statusToColor = {
      solved: 'green',
      wrong: 'red',
      unsolved: 'grey',
    }

    return (
      <div
        style={{
          height: 20,
          width: 20,
          backgroundColor: statusToColor[problemMetaData.status],
          borderRadius: '50%',
        }}
      />
    )
  }

  if (columnID === 'title') {
    return (
      <Typography
        variant="body1"
        gutterBottom
        color="primary"
        component="span"
        sx={{ cursor: 'pointer' }}
      >
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={'/problem/' + problemMetaData.problemID}
        >
          {problemMetaData[columnID]}
        </Link>
      </Typography>
    )
  }

  return <></>
}

export default function StickyHeadTable() {
  const [pageNumber, setPageNumber] = React.useState(1)
  const rowsPerPage = 10

  const handleChangePage = (event: unknown, newPageNumber: number) => {
    setPageNumber(newPageNumber)
  }

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        zIndex: 0,
        position: 'relative',
      }}
    >
      <TableContainer sx={{ height: 770 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  <Typography variant="h5" gutterBottom color="primary">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getProblemMetaDataFromRange(
              (pageNumber - 1) * rowsPerPage,
              pageNumber * rowsPerPage,
            ).map((row: ProblemMetaData) => {
              return (
                <TableRow hover key={row.title}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ overflow: 'hidden ' }}
                      >
                        {getTableValue(column.id, row)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box m={2}>
        <Pagination
          color="primary"
          onChange={handleChangePage}
          page={pageNumber}
          count={Math.ceil(getNumProblems() / rowsPerPage)}
        />
      </Box>
    </Paper>
  )
}
