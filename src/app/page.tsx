import { LandingNavbar } from "@/components/landing-navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Lock, Zap, PieChart, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section - Centered Layout */}
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-muted/20 border-b">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-10">
            <div className="animate-in slide-in-from-bottom-5 duration-500 space-y-6 max-w-4xl flex flex-col items-center">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors border-primary/20 bg-primary/10 text-primary">
                The #1 Finance App in Sri Lanka
              </div>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                Master your <span className="text-primary block sm:inline">Money.</span>
              </h1>
              <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed leading-relaxed">
                Join 10,000+ Sri Lankans who track expenses, budget smarter, and grow their wealth with Wallet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in slide-in-from-bottom-10 duration-700 delay-100">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-xl shadow-primary/20 rounded-full">
                  Get Started Service <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                  View Interactive Demo
                </Button>
              </Link>
            </div>

            {/* Centered Hero Image */}
            <div className="relative w-full max-w-5xl mt-12 animate-in slide-in-from-bottom-10 duration-1000 delay-200">
              <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-muted">
                <Image
                  src="/landing/hero.png"
                  alt="Wallet App Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating Metrics - Centered Bottom */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border flex gap-8 items-center max-w-sm w-full justify-between">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Total Balance</div>
                  <div className="text-2xl font-bold">LKR 145,200</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div>
                  <div className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +12%
                  </div>
                  <div className="text-xs text-muted-foreground">vs last month</div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Features Grid - Centered */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerfully Simple</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Everything you need to manage your personal finances, built for the modern Sri Lankan economy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: BarChart3,
                  title: "Analytics",
                  desc: "Visualize your spending habits with beautiful charts.",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10"
                },
                {
                  icon: PieChart,
                  title: "Budgeting",
                  desc: "Set smart budgets for Food, Travel, and Shopping.",
                  color: "text-orange-500",
                  bg: "bg-orange-500/10"
                },
                {
                  icon: Lock,
                  title: "Security",
                  desc: "Bank-grade encryption keeps your data safe.",
                  color: "text-green-500",
                  bg: "bg-green-500/10"
                },
                {
                  icon: Zap,
                  title: "Fast Sync",
                  desc: "Updates instantly across all your devices.",
                  color: "text-yellow-500",
                  bg: "bg-yellow-500/10"
                },
                {
                  icon: TrendingUp,
                  title: "Goals",
                  desc: "Track your savings goals for big purchases.",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10"
                }
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 bg-background rounded-3xl border shadow-sm hover:shadow-md transition-all group">
                  <div className={`p-4 rounded-2xl mb-6 ${f.bg} ${f.color} group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}

              {/* Last Card is CTA */}
              <div className="flex flex-col items-center text-center p-8 bg-primary text-primary-foreground rounded-3xl shadow-lg justify-center">
                <h3 className="text-xl font-bold mb-3">And much more...</h3>
                <p className="text-primary-foreground/80 mb-6">Explore all features today.</p>
                <Link href="/sign-up">
                  <Button variant="secondary" className="rounded-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Big CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto bg-zinc-900 text-white rounded-[3rem] p-12 md:p-24 relative overflow-hidden">
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  Stop stressing about money.
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                  Join the financial revolution. Completely free to start. No credit card required.
                </p>
                <Link href="/sign-up" className="inline-block">
                  <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-white text-black hover:bg-white/90">
                    Create Free Account
                  </Button>
                </Link>
              </div>

              {/* Abstract blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full" />
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 border-t text-center">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-2xl font-bold tracking-tight">Wallet</div>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Features</Link>
            <Link href="#" className="hover:text-foreground">Pricing</Link>
            <Link href="#" className="hover:text-foreground">About</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 Wallet Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
