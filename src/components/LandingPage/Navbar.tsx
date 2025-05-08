import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        {/* Left: Logo */}
        <a href="#" className="flex items-center space-x-2 z-10">
          <span className="font-bold text-xl">Autonance</span>
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          <a
            href="#features"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-foreground/80 hover:text-accent transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Right: Button and Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 z-10">
          <div className="hidden md:block">
            <Button variant="default" onClick={() => navigate("/home")}>
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md p-4 shadow-md animate-scale">
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-foreground/80 hover:text-accent transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button variant="default" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
