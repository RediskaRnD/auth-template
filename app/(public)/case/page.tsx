import { Metadata } from 'next';
import { ReactElement } from 'react';

import ConvertCaseClient from '@/components/case/case-converter';

export const metadata: Metadata = {
  title: 'Case',
  description: 'Convert case'
};

const ConvertCasePage = (): ReactElement => {
  // const [language, setLanguage] = useState<string>('en');
  //
  // const handleLanguageChange = (code: string) => {
  //   setLanguage(code);
  //   // Add logic here to update the language in your app
  //   console.log(`Language changed to: ${code}`);
  // };
  //
  return (
    // <div dir="rtl" className="flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center h-screen max-w-screen-xl min-w-64">
        {/*<LanguageSelector onLanguageChange={handleLanguageChange}/>*/}
        {/*<div className="p-2 text-end w-full">Language</div>*/}
        <ConvertCaseClient/>
      </div>
    </div>
  );
};

export default ConvertCasePage;