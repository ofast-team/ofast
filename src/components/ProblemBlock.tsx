import React from 'react'
import { Box } from '@mui/material'

import ProblemBody from '../components/ProblemBody'
import ProblemBlockCards from './ProblemBlockCards'

import { getProblem } from '../pages/MockProblemData'

export type Problem = {
  problemID: string
  title: string
  text: string
  problem: string
  input: string
  output: string
  sampleData: {
    input: string
    output: string
  }[]
  tags: string[]
  resources: {
    name: string
    url: string
  }[]
}

export default function ProblemBlock({ problemID }: { problemID: string }) {
  const problem: Problem | null = getProblem(problemID)

  if (problem === null) {
    return <Box pt={15}>Problem not found</Box>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box>
        <ProblemBody problem={problem} />
      </Box>

      <Box
        sx={{
          verticalAlign: 'top',
          pl: '30px',
          pt: '50px',
        }}
      >
        <ProblemBlockCards problem={problem} />
      </Box>
    </Box>
  )
}
