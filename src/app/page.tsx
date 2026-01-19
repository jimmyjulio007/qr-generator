import { QRGenerator } from "@/features/qr-generator/components/qr-generator";
import { Sparkles, ShieldCheck, Zap, Download, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground antialiased transition-colors duration-500">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative container mx-auto py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-32">
          <header className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-black tracking-[0.3em] uppercase text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles className="w-4 h-4" />
              Professional QR Design
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Precision <span className="text-muted-foreground italic font-light">Craft</span> For Modern Brands.
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
              Generate studio-grade, high-fidelity QR codes with mathematical precision.
              Designed for luxury brands, architects, and detail-oriented developers.
            </p>
          </header>

          <main className="animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <QRGenerator />
          </main>

          <section className="mt-60 space-y-40 border-t border-border pt-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
              <div className="space-y-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                  <Layers className="w-7 h-7" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tight italic">Vector Core</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium">Export in SVG or High-Res PDF. Every code is a mathematical construct, ready for large-scale billboard printing.</p>
                </div>
              </div>
              <div className="space-y-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                  <Zap className="w-7 h-7" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tight italic">Studio Tools</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium">Full control over dot geometry, eye shapes, and gradient rotations. Align your QR code perfectly with your brand identity.</p>
                </div>
              </div>
              <div className="space-y-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black tracking-tight italic">Zero Leak</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium">Local-first generation. Your sensitive endpoint data never touches a server, staying entirely within your browser's memory.</p>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto rounded-[3.5rem] bg-muted/40 border border-border p-16 md:p-32 space-y-16">
              <h2 className="text-5xl md:text-7xl font-black text-center tracking-tighter leading-tight italic">Detail is the <span className="text-muted-foreground">differentiation</span>.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-6">
                  <h4 className="text-2xl font-black tracking-tight">Static vs. Dynamic</h4>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">We specialize in permanent, high-integrity static codes. No subscriptions, no redirects, and zero latency—forever.</p>
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl font-black tracking-tight">Visual Integrity</h4>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed">Our algorithms maintain scanability even with custom gradients and logo overlays by managing contrast ratios automatically.</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="text-center pt-32 pb-20 flex flex-col items-center gap-12 border-t border-border">
            <div className="flex gap-6 opacity-30">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <div className="w-3 h-3 rounded-full bg-foreground" />
              <div className="w-3 h-3 rounded-full bg-foreground" />
            </div>
            <p className="text-[11px] font-black tracking-[0.5em] uppercase text-muted-foreground">
              © {new Date().getFullYear()} PRECISION QR — CRAFTED FOR EXCELLENCE
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
