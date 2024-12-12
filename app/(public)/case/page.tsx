import { Metadata } from 'next';
import { ReactElement } from 'react';

import ConvertCaseClient from '@/components/case/case-converter';

export const metadata: Metadata = {
  title: 'Case',
  description: 'Convert case'
};

const ConvertCasePage = (): ReactElement => {
  return <ConvertCaseClient/>;
};

export default ConvertCasePage;