import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { profile } from '@/data/profile';

export const metadata = {
  title: 'Kibret Mulugeta | AI Engineer & Medical Computer Vision Researcher',
  description: 'Official portfolio, research portal, and telemetry dashboard for Kibret Mulugeta (MSc Computer Engineering, Bahir Dar University). Specializing in U-Net Brain MRI segmentation and FastAPI OAuth2 + JWT architectures.',
  keywords: ['Kibret Mulugeta', 'AI Engineer', 'Computer Vision', 'Medical Imaging', 'U-Net', 'Brain MRI', 'FastAPI', 'OAuth2', 'Bahir Dar University', 'Debre Berhan University'],
  authors: [{ name: 'Kibret Mulugeta' }],
  openGraph: {
    title: 'Kibret Mulugeta | AI Engineer & Medical CV Researcher',
    description: 'Flagship personal identity website, medical AI research portal, and telemetry dashboard.',
    url: 'https://kibretmulugeta.com',
    siteName: 'Kibret Mulugeta Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090A0F] text-zinc-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
