import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ReactElement } from 'react';

type FormMessage = {
  message: string | undefined;
};

export const SuccessMessage = ({ message }: FormMessage): ReactElement | null => {
  return message ?
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4"/>
      <p>{message}</p>
    </div> : null;
};

export const ErrorMessage = ({ message }: FormMessage): ReactElement | null => {
  return message ?
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4"/>
      <p>{message}</p>
    </div> : null;
};