'use client'
import './page.css'
import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Button, TextField, Box, Typography, Stack } from '@mui/material';

export default function Home() {
  // Text to be displayed in center box
  const [textArray, setTextArray] = useState<string[]>([]);
  // Name of file displayed
  const [fileName, setFileName] = useState<string>('');
  // Save highlighted words and indices
  const [highlightedText, setHighlightedText] = useState<string | null>();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  // Highlight mode selection (aka words or partial)
  const [highlightFullWords, setHighlightFullWords] = useState<boolean>(true)


  // const handleTextSelect = (index: number) => {
  //   if (!highlightFullWords) {
  //     const selected = window.getSelection()
  //     if (selected && selected.rangeCount > 0) {
  //       console.log(selected.toString())
  //       console.log(selected.getRangeAt(0).endOffset)
  //       setHighlightedText(window.getSelection()?.toString())
  //       const range = selected?.getRangeAt(0).getBoundingClientRect()
  //       console.log(range)
  //     }
  //   }
  //   else {
  //       setHighlightedText(textArray[index])
  //     console.log(textArray[index])
  //   }

  // }

  // Update highlighted "words" for each new index selected
  useEffect(() => {
    const currentSelected: any = []
    selectedIndices.forEach((index) => currentSelected.push(textArray[index]))
    setHighlightedText(currentSelected.join(" "))
  }, [selectedIndices])

  const handleMouseDown = (index: number) => {
    setIsMouseDown(true);
    if (!selectedIndices.includes(index)) {
      setSelectedIndices([index]); //Begin recording selected indices
    }
  };

  const handleMouseEnter = (index: number) => {
    if (isMouseDown) {
      setSelectedIndices(prev => {
        if (!prev.includes(index)) {
          return [...prev, index]; // Add index to the selection
        }
        return prev.sort();
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // Finalize the selection
    console.log("Selected word indices:", selectedIndices);
  };

  // Function to convert file upload into array of strings for DB storage
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          // Here I assume the line break is formatted like this for now
          const replacement = result.replaceAll("\r\n\r\n", " \r\n\r\n "); 
          const wordsList = replacement.split(' ');
          setTextArray(wordsList);
          console.log(wordsList);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
    <Stack direction={'row'} gap={3}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={e => {
              // Set file name and display in center box
              const file: string = e.target.value;
              setFileName(file.slice(-(file.lastIndexOf("\\") - 1)));
              handleFileUpload(e);
            }}
          />
        </Button>
        <Typography>{fileName != '' ? "File displayed: " + fileName : ""}</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="top"
          height="90vh"
          width="50vw"
          textAlign="left"
          border={1}
        >
          <Typography className='prevent-select' variant="body1" 
          component="p" 
          display={"inline"} 
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            width: '100%',
            margin: 0
          }}>
            {textArray.map((word, index) => (
              <span key={index} 
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseUp={handleMouseUp}
              style={{
                backgroundColor: selectedIndices.includes(index) ? 'yellow' : 'transparent',
                cursor: 'pointer',
                padding: '0 2px',
              }}>
                {word.includes("\n")? word : word + " " }
              </span>
            ))}
          </Typography>
        </Box>
      </Box>
      <Typography>Word selected: {highlightedText}</Typography>
      </Stack>
    </Container>
  );
}
