import React, { useEffect, useState, useRef } from 'react'
import { Box, Container, Typography } from '@mui/material'

import './LessonPage.css'
import '../components/ReadingBlock.css'

import MDX from '../components/MDXRenderer'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function SideNavigatorItem({ selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className="fadeColor"
      style={{
        marginTop: 10,
        height: selected ? 100 : 40,
        backgroundColor: selected ? '#04364a' : '#6DB6C3',
        borderRadius: 50,
        cursor: 'pointer',
      }}
    />
  )
}

interface LessonBlockWrapperProps {
  block: React.ReactNode
  id: number
  blockRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  windowDimensions: {
    width: number
    height: number
  }
}

function LessonBlockWrapper({
  block,
  id,
  blockRefs,
  windowDimensions,
}: LessonBlockWrapperProps) {
  const [height, setHeight] = useState<number | undefined | null>(null)

  let adjustedHeight = height

  if (height && windowDimensions && height < windowDimensions.height) {
    adjustedHeight = windowDimensions.height
  }

  return (
    <Container
      key={id}
      sx={{
        scrollSnapAlign: 'start',
        height: adjustedHeight ? adjustedHeight : 'auto',
        overflowY: 'auto',
        pt: 15,
      }}
      ref={(element) => {
        blockRefs.current[id] = element
        setHeight(element?.offsetHeight)
      }}
    >
      {block}
    </Container>
  )
}

export default function LessonPage() {
  const blocks = [
    <MDX path="/lessons/dynamic_programming/TestLesson.mdx" />,
    <MDX path="/lessons/dynamic_programming/Fitb1.mdx"/>,
    <MDX path="/lessons/dynamic_programming/Mcq1.mdx" />,
    <MDX path="/lessons/dynamic_programming/OverlappingSubproblems.mdx" />,
    <MDX path="/lessons/dynamic_programming/BuildingARecursiveFunction.mdx" />,
  ]
  const blockRefs = useRef(new Array(blocks.length))
  const [offsetY, setOffsetY] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  const currentIndex = () => {
    if (!blockRefs.current[0]) {
      return 0
    }

    let sum = 0
    let i = 0

    while (
      i + 1 < blockRefs.current.length &&
      sum + blockRefs.current[i].offsetHeight <= offsetY
    ) {
      sum += blockRefs.current[i].offsetHeight
      i++
    }

    return i
  }

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Typography
          className="markdown"
          gutterBottom
          color="primary"
          component={'span'}
        >
          {blocks.map((block, id) => (
            <LessonBlockWrapper
              key={id}
              block={block}
              id={id}
              blockRefs={blockRefs}
              windowDimensions={windowDimensions}
            />
          ))}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 20,
          transform: 'translateY(-50%)',
          position: 'fixed',
          top: '50%',
          left: '20px',
        }}
      >
        {blocks.map((_item, id) => {
          return (
            <SideNavigatorItem
              key={id}
              selected={currentIndex() === id}
              onClick={() =>
                blockRefs.current[id].scrollIntoView({ behavior: 'smooth' })
              }
            />
          )
        })}
      </Box>
    </Box>
  )
}
