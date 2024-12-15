import React, { ReactElement, ReactNode } from 'react';
import { Tooltip } from '@mui/material';

interface FabWithTooltipProps {
  className?: string;   // Optional className for custom styling
  title: string;        // Tooltip text
  disabled?: boolean;
  ariaLabel?: string;    // Accessible label for the Fab
  onClick: () => void;  // Click handler
  children: ReactNode;  // Icon or content inside the Fab
}

const FabWithTooltip = ({
  className = '',
  title,
  disabled = false,
  ariaLabel,
  onClick,
  children
}: FabWithTooltipProps): ReactElement => {
  return (
    <Tooltip
      className={className}
      title={title}
      placement="top"
    >
      <div>
        <button
          disabled={disabled}
          aria-label={ariaLabel}
          onClick={onClick}
          onDoubleClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </button>
      </div>
    </Tooltip>
  );
};

export default FabWithTooltip;
