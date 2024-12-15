'use client';

import { useTranslate } from '@ayub-begimkulov/i18n';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import { Tooltip } from '@mui/material';
import React, { ChangeEvent, DragEvent, Fragment, ReactElement, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import FabWithTooltip from '@/components/ui/fab-with-tooltip';
import { copyToClipboard } from '@/lib/utils/copy-to-clipboard';
import {
  getTextStats,
  removeEmptyLines,
  removeExcessiveSpaces,
  TextStats,
  toCapitalizedCase,
  toLowerCase,
  toSentenceCase,
  toTitleCase,
  toUpperCase
} from '@/lib/utils/text-utils';
import { formatDateForFile } from '@/lib/utils/time-formater';

type HistoryEntry = {
  key: string;
  value: string;
};

const ConvertCaseClient = (): ReactElement => {
  const t = useTranslate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [selected, setSelected] = useState<string[]>(['', '', '']);
  const [placeholder, setPlaceholder] = useState<string>(t('case.text.placeholder'));
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [stats, setStats] = useState<TextStats>({ symbols: 0, words: 0, sentences: 0, lines: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const defaultPlaceholder = isDragOver ? t('case.text.placeholder.dragover') : t('case.text.placeholder');

  useEffect(() => {
    setPlaceholder(defaultPlaceholder);
    console.log('redraw');
  }, [isDragOver, t]);

  useEffect(() => {
    setStats(getTextStats(text));

    history.forEach((entry, index) => {
      console.log(`Entry ${index}: ${entry.key} - ${entry.value}`);
    });
  }, [text]);

  const addToHistory = (newOne: HistoryEntry) => {
    const historyCopy = history.slice(0, historyIndex + 1);
    const last = historyCopy.pop();
    if (last) {
      if ((last.key === newOne.key && last.key === 'edit') || (last.value === newOne.value)) {
        setHistory([...historyCopy, newOne]);
      } else {
        setHistory([...historyCopy, last, newOne]);
        setHistoryIndex(historyIndex + 1);
      }
    } else {
      setHistory([newOne]);
    }
  };

  const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    addToHistory({ key: 'edit', value: newText });
  };

  const handleMouseUp = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    setSelected([
      text.slice(0, textarea.selectionStart),
      text.slice(textarea.selectionStart, textarea.selectionEnd),
      text.slice(textarea.selectionEnd)
    ]);
  };

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        const newText = reader.result as string;
        setText(newText);
        setSelected(['', newText, '']);
        addToHistory({ key: 'drop', value: newText });
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleAction = (func: (input: string) => string) => {
    const newText = selected[1] ? selected[0] + func(selected[1]) + selected[2] : func(text);
    setText(newText);
    setSelected(['', newText, '']);
    if (!newText) {
      setPlaceholder(defaultPlaceholder.toUpperCase());
    }
    addToHistory({ key: func.name, value: newText });
    console.log(newText);
  };

  const handleClean = () => {
    const newText = '';
    setText(newText);
    setPlaceholder(defaultPlaceholder);
    addToHistory({ key: 'case.clear', value: newText });
  };

  const handleCopy = () => copyToClipboard(text);

  const handleUndo = () => {
    const index = Math.max(0, historyIndex - 1);
    setHistoryIndex(index);
    const newText = history[index]?.value ?? '';
    setText(newText);
    console.log('Undo');
    console.log({ newText });
    console.log({ index });
  };

  const handleRedo = () => {
    const index = Math.min(Math.max(0, history.length - 1), historyIndex + 1);
    setHistoryIndex(index);
    const newText = history[index]?.value ?? '';
    setText(newText);
    console.log('Redo');
    console.log({ newText });
    console.log({ index });
  };

  const handleOpenFile = () => fileInputRef.current?.click();

  const handleSaveFile = () => {
    if (text) {
      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      const timestamp = formatDateForFile(new Date())
        .replace(/\//g, '-')
        .replace(/:/g, '-')
        .replace('T', '__');
      link.download = `formated-text_${timestamp}.txt`;

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      link.href = url;
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the Blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
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

  const fabColor = text ? 'inherit' : 'disabled';
  const undoDisabled = historyIndex <= 0;
  const redoDisabled = historyIndex >= history.length - 1;

  console.log({ historyIndex });

  return (
    <div>
      <div className="flex flex-col h-screen space-y-1 max-w-screen-xl">
        <div>
          <div className="fabs flex flex-row-reverse gap-1">
            <FabWithTooltip
              title={t('case.clear')}
              disabled={!text}
              ariaLabel="clear"
              onClick={handleClean}
            >
              <ClearIcon color={fabColor}/>
            </FabWithTooltip>
            <FabWithTooltip
              title={t('case.open')}
              ariaLabel="open-file"
              onClick={handleOpenFile}>
              <FileOpenIcon color="inherit"/>
            </FabWithTooltip>
            <FabWithTooltip
              title={t('case.save')}
              disabled={!text}
              ariaLabel="save-file"
              onClick={handleSaveFile}
            >
              <SaveIcon color={fabColor}/>
            </FabWithTooltip>
            <FabWithTooltip
              title={t('case.copy')}
              disabled={!text}
              ariaLabel="copy"
              onClick={handleCopy}
            >
              <ContentCopyIcon color={fabColor}/>
            </FabWithTooltip>
            <FabWithTooltip
              title={t('case.redo')}
              disabled={redoDisabled}
              ariaLabel="redo"
              onClick={handleRedo}
            >
              <RedoOutlinedIcon color={redoDisabled ? 'disabled' : 'inherit'}/>
            </FabWithTooltip>
            <FabWithTooltip
              title={t('case.undo')}
              disabled={undoDisabled}
              ariaLabel="undo"
              onClick={handleUndo}
            >
              <UndoOutlinedIcon color={undoDisabled ? 'disabled' : 'inherit'}/>
            </FabWithTooltip>
          </div>
          <textarea
            className={`border rounded-md ps-1.5 h-64 resize-y w-full ${isDragOver ? 'border-blue-500' : 'border-gray-300'}`}
            ref={textareaRef}
            value={text}
            placeholder={placeholder}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onChange={handleChangeText}
            onMouseUp={handleMouseUp}
          />
          <div className="flex text-start flex-wrap gap-1 text-gray-500">
            {[
              { label: t('case.symbols'), value: stats.symbols },
              { label: t('case.words'), value: stats.words },
              { label: t('case.sentences'), value: stats.sentences },
              { label: t('case.lines'), value: stats.lines }
            ].map((stat, index) => (
              <Fragment key={stat.label}>
                <p>{stat.label}: {stat.value}</p>
                {index < 3 && <p className="text-gray-300">|</p>}
              </Fragment>
            ))}
          </div>
        </div>
        <span className="flex flex-wrap gap-1">
          <Tooltip title={t('case.sentence.tip')} unselectable={'on'}>
            <Button onClick={() => handleAction(toSentenceCase)}>{t('case.sentence')}</Button>
          </Tooltip>
          <Tooltip title={t('case.upper.tip')}>
            <Button onClick={() => handleAction(toUpperCase)}>{t('case.upper')}</Button>
          </Tooltip>
          <Tooltip title={t('case.lower.tip')}>
            <Button onClick={() => handleAction(toLowerCase)}>{t('case.lower')}</Button>
          </Tooltip>
          <Tooltip title={t('case.capitalized.tip')}>
            <Button onClick={() => handleAction(toCapitalizedCase)}>{t('case.capitalized')}</Button>
          </Tooltip>
          <Tooltip title={t('case.title.tip')}>
            <Button onClick={() => handleAction(toTitleCase)}>{t('case.title')}</Button>
          </Tooltip>
          <Tooltip title={t('case.trim.spaces.tip')}>
            <Button onClick={() => handleAction(removeExcessiveSpaces)}>{t('case.trim.spaces')}</Button>
          </Tooltip>
          <Tooltip title={t('case.remove.empty.lines.tip')}>
            <Button onClick={() => handleAction(removeEmptyLines)}>{t('case.remove.empty.lines')}</Button>
          </Tooltip>
        </span>
      </div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ConvertCaseClient;
