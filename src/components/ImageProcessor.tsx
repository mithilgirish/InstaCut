
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";

interface ImageProcessorProps {
  originalImage: File | null;
  onReset: () => void;
}

const ImageProcessor = ({ originalImage, onReset }: ImageProcessorProps) => {
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (originalImage) {
      const objectUrl = URL.createObjectURL(originalImage);
      setOriginalImageUrl(objectUrl);
      processImage(originalImage);
      
      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }
  }, [originalImage]);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    try {
      // Simulated progress for better UX
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      
      // Actual image processing
      const img = await loadImage(file);
      const processedBlob = await removeBackground(img);
      
      clearInterval(progressInterval);
      setProcessingProgress(100);
      
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImageUrl(processedUrl);
      
      toast({
        title: "Success!",
        description: "Background removed successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Processing failed",
        description: "There was an issue removing the background. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImageUrl) {
      const link = document.createElement("a");
      link.href = processedImageUrl;
      link.download = `instacut-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Image downloaded",
        description: "Your transparent image has been downloaded",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {isProcessing ? (
        <div className="text-center py-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <RefreshCw className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
            <h3 className="text-xl font-semibold">Processing your image...</h3>
            <p className="text-muted-foreground mt-2">This might take a few seconds</p>
          </motion.div>
          
          <div className="relative h-3 w-64 mx-auto bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${processingProgress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{processingProgress}%</p>
        </div>
      ) : (
        <>
          {processedImageUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                <div className="w-full md:w-1/2">
                  <div className="aspect-square overflow-hidden rounded-xl border bg-background">
                    {originalImageUrl && (
                      <img 
                        src={originalImageUrl} 
                        alt="Original" 
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <p className="text-center mt-2 font-medium">Original</p>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="aspect-square overflow-hidden rounded-xl border bg-[url('/placeholder.svg')] bg-repeat">
                    <img 
                      src={processedImageUrl} 
                      alt="Processed" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-center mt-2 font-medium">Background Removed</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8 gap-4">
                <Button
                  onClick={handleDownload}
                  className="gap-2 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={onReset} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  New Image
                </Button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ImageProcessor;
