import { QRGenerator } from "@/features/qr-generator/components/qr-generator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-500">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <header className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              Professional <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">QR Generator</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
              Create high-quality, customizable QR codes for URLs, Wi-Fi, WhatsApp, and more.
              Built with precision for professional use.
            </p>
          </header>

          <main>
            <QRGenerator />
          </main>

          <footer className="text-center pt-20 pb-10">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © 2024 QR Generator Pro • Powered by shadcn/ui
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
