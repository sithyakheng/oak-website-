import './globals.css';
import type { Metadata } from 'next';
import { Inter, Syncopate, Noto_Sans_Khmer } from 'next/font/google';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const syn = Syncopate({ subsets: ['latin'], weight: '700', variable: '--font-syncopate' });
const khmer = Noto_Sans_Khmer({ subsets: ['khmer'], variable: '--font-khmer' });

export const metadata: Metadata = {
  title: 'OAK Hair Clay and Texture Powder',
  description: 'Matte hair clay and texture powder, delivered across Cambodia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <body className={`${inter.variable} ${syn.variable} ${khmer.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
