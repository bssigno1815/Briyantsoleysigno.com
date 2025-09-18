import Link from "next/link";

export default function NavBar() {
  return (
    <header className="nav">
      <Link href="/" className="logo">briyantsoleysigno<span>.com</span></Link>
      <nav className="navlinks">
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#contact" className="btn small">Contact</a>
      </nav>
    </header>
  );
}
