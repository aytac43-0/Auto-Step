import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">Auto Step</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={`${isActive('/') ? 'text-primary' : 'text-muted-foreground'} hover:text-foreground`}
              >
                Home
              </Button>
            </Link>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Services
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              About
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Contact
            </Button>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground">
                Login
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Home
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              Services
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              About
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              Contact
            </Button>
            <div className="pt-3 space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
