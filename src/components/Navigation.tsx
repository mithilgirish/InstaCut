import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, UserPlus, Moon, Sun } from "lucide-react";
import { 
  SignedIn, 
  SignedOut, 
  UserButton, 
  useUser,
  SignInButton,
  SignUpButton
} from "@clerk/clerk-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user } = useUser();
  
  useEffect(() => {
    // Check for user's preferred theme on initial load
    const savedTheme = localStorage.getItem("theme") || 
                       (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const scrollToUploader = () => {
    const uploaderElement = document.getElementById('image-uploader');
    if (uploaderElement) {
      uploaderElement.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-background/80 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
         <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="InstaCut Logo" 
            className="hidden md:block w-8 h-8 rounded-md"
          />
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-pink"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            InstaCut
          </motion.h1>
        </a>
          </motion.div>

        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="rounded-full"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          
          <div className="flex gap-4 items-center">
            <SignedIn>
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/80">
                  {user?.firstName || user?.username}
                </span>
                <UserButton />
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                  >
                    <LogIn size={16} />
                    <span className="hidden sm:inline">Sign in</span>
                  </Button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 border-primary/30 text-primary"
                  >
                    <UserPlus size={16} />
                    <span className="hidden sm:inline">Sign up</span>
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
            
            <Button 
              size="sm"
              onClick={scrollToUploader}
              className="bg-gradient-to-r from-neon-purple to-neon-pink text-white shadow-sm shadow-primary/20"
            >
              Start Now
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="rounded-full mr-1"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonBox: "h-8 w-8",
                  userButtonTrigger: "h-8 w-8 border-2 border-primary/40 hover:border-primary/80 rounded-full transition-colors"
                }
              }}
            />
          </SignedIn>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto py-4 px-6">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="w-full flex justify-center items-center gap-2"
                  >
                    {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                  </Button>
                </li>
                
                <SignedOut>
                  <li className="pt-4 mt-2 border-t">
                    <SignInButton mode="modal">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center justify-center gap-2 border-primary/30"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn size={16} />
                        Sign in
                      </Button>
                    </SignInButton>
                  </li>
                  <li>
                    <SignUpButton mode="modal">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center justify-center gap-2 border-primary/30"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserPlus size={16} />
                        Sign up
                      </Button>
                    </SignUpButton>
                  </li>
                </SignedOut>
                
                <li className="pt-4 mt-2 border-t">
                  <Button 
                    onClick={scrollToUploader}
                    className="w-full bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                  >
                    Start Now
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;