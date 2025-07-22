import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Comparison from "./components/Comparison";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Work />
      <Comparison />
      <Services />
      <About />
      <FAQ />
      <Footer />
    </div>
  );
}