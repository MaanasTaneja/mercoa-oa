import { Html, Head, Main, NextScript } from "next/document";

import BillPayHeader from './components/header.js';
import BillPayFooter from './components/footer.js';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="checkered-background min-h-screen flex flex-col">
        <BillPayHeader />
        <div className="flex-grow">
          <Main />
        </div>
        <BillPayFooter />
        <NextScript />
      </body>
    </Html>
  );
}
