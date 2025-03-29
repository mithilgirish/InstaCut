import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const creators = [
  {
    name: "Mithil Girish",
    role: "Full Stack Developer",
    description: "Passionate about blending creativity with technology to build seamless digital experiences.",
    initials: "MG"
  },
  {
    name: "Hariprasaadh",
    role: "AI Enthusiast",
    description: "Loves optimizing backend performance, ensuring scalability, and exploring AI-driven solutions.",
    initials: "HP"
  },
  {
    name: "Pranav",
    role: "AI Enthusiast",
    description: "Strives to create intuitive and visually appealing designs while integrating AI for enhanced user experience.",
    initials: "P"
  }
];

const MeetTheCreators = () => {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Meet the Creators</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The minds behind this project, dedicated to delivering innovation and excellence.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full glass-card border-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {creator.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <blockquote className="text-foreground/90 mb-4 flex-grow">
                    "{creator.description}"
                  </blockquote>
                  <footer className="mt-auto">
                    <div className="font-medium">{creator.name}</div>
                    <div className="text-sm text-muted-foreground">{creator.role}</div>
                  </footer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheCreators;
