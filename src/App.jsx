import Nav from './components/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Impact from './sections/Impact'
import Experience from './sections/Experience'
import Pipeline from './sections/Pipeline'
import Stack from './sections/Stack'
import Contact from './sections/Contact'

const TICKER = ['GST reconciliation', 'Payroll lifecycles', 'Ledger sync', 'Scraping pipelines', 'LLM classification', 'AppSec hardening', 'WebSockets', 'Docker orchestration']

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...TICKER, ...TICKER].map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>
        <Work />
        <Impact />
        <Experience />
        <Pipeline />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
