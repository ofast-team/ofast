import { TipsAndUpdates, RestartAlt } from '@mui/icons-material'
import { Box, Typography, IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { ShowAnswerBtn } from './MCQBlock'

interface HeaderProps {
  title: string
  setShowHint: Dispatch<SetStateAction<boolean>>
  showAnswers: () => void
  handleReset: () => void
  result: number
}

export default function Header({
  title,
  setShowHint,
  showAnswers,
  handleReset,
  result,
}: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6DB6C3',
        color: '#000',
        p: 2,
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
        <IconButton onClick={() => setShowHint(true)} disabled={result === 1}>
          <TipsAndUpdates sx={{ color: '#04364a', fontSize: '2rem', m: 0 }} />
        </IconButton>
        <IconButton>
          <RestartAlt
            sx={{ color: '#04364a', fontSize: '2rem', m: 0 }}
            onClick={handleReset}
          />
        </IconButton>
      </Box>
    </Box>
  )
}
