'use client';

import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import SaveIcon from '@mui/icons-material/Save';
import { Fab, Tooltip } from '@mui/material';
import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/lib/utils/copy-to-clipboard';
import {
  getTextStats,
  removeExcessiveSpaces,
  toCapitalizedCase,
  toSentenceCase,
  toTitleCase
} from '@/lib/utils/text-utils';

const ConvertCaseClient = (): ReactElement => {
  const [text, setText] = useState('test');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { symbols, words, sentences, lines } = getTextStats(text);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        const fileText = reader.result as string;
        setText(fileText);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleSentenceCase = () => setText(toSentenceCase(text));
  const handleUpperCase = () => setText(text.toUpperCase());
  const handleLowerCase = () => setText(text.toLowerCase());
  const handleCapitalizedCase = () => setText(toCapitalizedCase(text));
  const handleTitleCase = () => setText(toTitleCase(text));
  const handleTrimSpaces = () => setText(removeExcessiveSpaces(text));
  const handleClean = () => setText('');
  const handleCopy = () => copyToClipboard(text);
  const handleOpenFile = () => {
    // Simulate a click on the file input to open the file dialog
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSaveFile = () => {
    return;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      console.log('File selected:', file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const fileText = reader.result as string;
        setText(fileText);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center flex-col h-screen space-y-4">
        <div className="space-x-1">
          <Tooltip
            title="Clear"
            // followCursor
            placement="top"
          >
            <Fab
              aria-label="clear"
              size="small"
              color={'primary'}
              onClick={handleClean}
            >
              <ClearIcon/>
            </Fab>
          </Tooltip>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Tooltip
            title="Open File"
            // followCursor
            placement="top"
          >
            <Fab
              aria-label="open-file"
              size="small"
              color={'primary'}
              onClick={handleOpenFile}
            >
              <FileOpenIcon/>
            </Fab>
          </Tooltip>
          <Tooltip
            title="Save File"
            // followCursor
            placement="top"
          >
            <Fab
              aria-label="save-file"
              size="small"
              color={'primary'}
              onClick={handleSaveFile}
            >
              <SaveIcon/>
            </Fab>
          </Tooltip>
          <Tooltip
            title="Copy to Clipboard"
            // followCursor
            placement="top"
          >
            <Fab
              aria-label="copy"
              size="small"
              color={'primary'}
              onClick={handleCopy}
            >
              <ContentCopyIcon/>
            </Fab>
          </Tooltip>
        </div>
        <textarea
          placeholder={isDragOver ? 'Drop the file here' : 'Drag text file, type or paste your content here'}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          title={'asd'}
          value={text}
          onChange={event => setText(event.target.value)}
          className={`border rounded-md p-2 w-96 h-32 ${isDragOver ? 'border-blue-500' : 'border-gray-300'}`}
        />
        <span className="space-x-1">
          <Tooltip title="Convert text to Sentence case (e.g., 'Hello world!')">
            <Button onClick={handleSentenceCase}>Sentence case</Button>
          </Tooltip>
          <Tooltip title="Convert text to UPPER CASE">
            <Button onClick={handleUpperCase}>UPPER CASE</Button>
          </Tooltip>
          <Tooltip title="Convert text to lowercase">
            <Button onClick={handleLowerCase}>lower case</Button>
          </Tooltip>
          <Tooltip title="Convert text to Capitalized Case (e.g., 'Hello World')">
            <Button onClick={handleCapitalizedCase}>Capitalized Case</Button>
          </Tooltip>
          <Tooltip title="Convert text to Title Case (e.g., 'The Quick Brown Fox')">
            <Button onClick={handleTitleCase}>Title Case</Button>
          </Tooltip>
          <Tooltip title="Remove excessive spaces, new lines and trim the text">
            <Button onClick={handleTrimSpaces}>Trim Spaces</Button>
          </Tooltip>
        </span>
        <div className="mt-4 p-4 border rounded-md w-64 text-sm">
          <p><strong>Text Information:</strong></p>
          <p>Symbols: {symbols}</p>
          <p>Words: {words}</p>
          <p>Sentences: {sentences}</p>
          <p>Lines: {lines}</p>
        </div>
      </div>
    </div>
  );
};

export default ConvertCaseClient;
