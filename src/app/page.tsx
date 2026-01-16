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

          <section className="mt-24 space-y-16 border-t border-zinc-200 dark:border-zinc-800 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">High Quality Exports</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Download your QR codes in PNG, SVG, or PDF formats. Perfect for both digital use and high-quality printing.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Fully Customizable</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Add logos, change colors, and adjust the styling to match your brand identity perfectly.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Local privacy</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Your data stays in your browser. We don't store your QR inputs on our servers, ensuring maximum privacy.</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Are these QR codes permanent?</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">Yes, the static QR codes generated are permanent and will never expire. They will work as long as the underlying link is active.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Can I add my logo to the QR code?</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">Absolutely! You can upload any image to the center of your QR code to make it look professional and branded.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Which format should I download?</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">Use PNG for web use and social media. Use SVG or PDF for professional printing, as they can be scaled to any size without losing quality.</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="text-center pt-20 pb-10">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} Pro QR Generator • The ultimate tool for professional QR codes.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
