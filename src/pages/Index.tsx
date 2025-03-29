
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

import Navigation from "@/components/Navigation";
import ImageUploader from "@/components/ImageUploader";
import ImageProcessor from "@/components/ImageProcessor";
import ThreeBackground from "@/components/ThreeBackground";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/CreatorsSection";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setIsProcessing(true);
    
    // This state will be managed by the ImageProcessor component
    // but we set it here as well for UX in the uploader
    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  const handleReset = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 overflow-x-hidden">
      <ThreeBackground />
      <Navigation />
      
      <main className="flex-1">
        {!selectedImage ? (
          <>
            <HeroSection />
            
            <div id="image-uploader" className="container mx-auto px-4 py-8 max-w-5xl">
              <ImageUploader onImageSelect={handleImageSelect} isProcessing={isProcessing} />
            </div>
            
            <FeaturesSection />
            <TestimonialsSection />
          </>
        ) : (
          <div className="container mx-auto px-4 py-16">
            <ImageProcessor originalImage={selectedImage} onReset={handleReset} />
          </div>
        )}
      </main>
      
      <footer className="py-8 border-t mt-16 backdrop-blur-md bg-background/70">
       
          
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 InstaCut. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default Index;
