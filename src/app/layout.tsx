import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import StyledJsxRegistry from '@/lib/registry';
import VisualEditsMessenger from '@/visual-edits/VisualEditsMessenger';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="0c89d8fd-52ef-4284-9df1-c7298986b2ae"
        />
        <StyledJsxRegistry>
          {children}
        </StyledJsxRegistry>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
