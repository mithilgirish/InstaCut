
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Upload, Camera, Image, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader = ({ onImageSelect, isProcessing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }
    
    onImageSelect(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        className={`relative h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 transition-all ${
          isDragging 
            ? "border-primary bg-primary/10" 
            : "border-gray-300 hover:border-primary"
        } glass-card`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isProcessing}
        />
        
        <motion.div 
          className="text-center"
          animate={{ y: isDragging ? -10 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? "Drop your image here" : "Upload your image"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drop your image here, or click to browse
          </p>
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={handleButtonClick} 
              disabled={isProcessing}
              className="neon-glow"
            >
              Choose File
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="text-center mt-3 text-sm text-muted-foreground">
        Supports: JPG, PNG, WEBP • Max size: 10MB
      </div>
    </motion.div>
  );
};

export default ImageUploader;
