import { motion } from 'framer-motion';
import { Scissors, Wand2, ImageIcon, Download, Zap, Coffee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'AI-Powered Removal',
    description: 'Advanced machine learning algorithms that accurately detect and remove backgrounds.',
    icon: Wand2,
    color: 'text-neon-purple'
  },
  {
    title: 'Instant Processing',
    description: 'Get results in seconds with our optimized processing engine.',
    icon: Zap,
    color: 'text-neon-pink'
  },
  {
    title: 'High Quality Results',
    description: 'Maintain edge quality and fine details in your output images.',
    icon: ImageIcon,
    color: 'text-neon-orange'
  },
  {
    title: 'Easy Download',
    description: 'Download your transparent PNG images in one click.',
    icon: Download,
    color: 'text-neon-blue'
  },
  {
    title: 'Drag & Drop',
    description: 'Simple drag and drop interface for quick uploads.',
    icon: Scissors,
    color: 'text-neon-purple'
  },
  {
    title: 'Free to Use',
    description: 'No account required, just upload and go.',
    icon: Coffee,
    color: 'text-neon-pink'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Cutting-Edge Features</h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          InstaCut combines powerful technology with a simple interface to deliver professional results.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full glass-card overflow-hidden border-white/10">
              <CardHeader className="pb-2">
                <div className={`${feature.color} w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base text-foreground/80">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
