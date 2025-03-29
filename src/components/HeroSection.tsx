import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Scissors, ChevronDown, Sparkles } from 'lucide-react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    camera.position.z = 30;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Create positions and colors
    for(let i = 0; i < particlesCount * 3; i++) {
      // Position (spread in a sphere shape)
      posArray[i] = (Math.random() - 0.5) * 50;
      
      // Color (create gradient from purple to pink)
      if(i % 3 === 0) {
        colorArray[i] = 0.5 + Math.random() * 0.3; // R (purple to pink)
        colorArray[i+1] = 0.1 + Math.random() * 0.2; // G
        colorArray[i+2] = 0.6 + Math.random() * 0.4; // B
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material with custom shader
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Create floating circles
    const circlesGroup = new THREE.Group();
    scene.add(circlesGroup);
    
    for(let i = 0; i < 8; i++) {
      const geometry = new THREE.RingGeometry(2 + Math.random() * 5, 2.1 + Math.random() * 5.1, 32);
      const material = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color(0.6 + Math.random() * 0.4, 0.2, 0.8),
        transparent: true,
        opacity: 0.1 + Math.random() * 0.15,
        side: THREE.DoubleSide
      });
      
      const circle = new THREE.Mesh(geometry, material);
      circle.position.set(
        (Math.random() - 0.5) * 30, 
        (Math.random() - 0.5) * 20, 
        (Math.random() - 0.5) * 10
      );
      circle.rotation.x = Math.random() * Math.PI;
      circle.rotation.y = Math.random() * Math.PI;
      
      // Store initial position for animation
      circle.userData = {
        floatSpeed: 0.002 + Math.random() * 0.003,
        rotateSpeed: 0.001 + Math.random() * 0.002,
        initialY: circle.position.y
      };
      
      circlesGroup.add(circle);
    }
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    const mousePosition = { x: 0, y: 0 };
    
    const handleMouseMove = (event) => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;
      
      // Rotate particle system
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0008;
      
      // Move particles gently based on mouse position
      particlesMesh.rotation.y += mousePosition.x * 0.0005;
      particlesMesh.rotation.x += mousePosition.y * 0.0003;
      
      // Animate floating circles
      circlesGroup.children.forEach(circle => {
        const { floatSpeed, rotateSpeed, initialY } = circle.userData;
        
        // Floating movement
        circle.position.y = initialY + Math.sin(frame * floatSpeed * 10) * 2;
        
        // Rotation
        circle.rotation.x += rotateSpeed;
        circle.rotation.y += rotateSpeed * 0.7;
        
        // Pulse size
        const pulseScale = 1 + Math.sin(frame * floatSpeed * 5) * 0.05;
        circle.scale.set(pulseScale, pulseScale, pulseScale);
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      
      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      circlesGroup.children.forEach(circle => {
      });
    };
  }, []);
  
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const scrollToUploader = () => {
    const uploaderElement = document.getElementById('image-uploader');
    if (uploaderElement) {
      uploaderElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-32 px-4 relative overflow-hidden bg-background/95 backdrop-blur-sm">
      {/* Three.js Background */}
      <ThreeJSBackground />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background/90 backdrop-blur-[2px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-10 rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-md flex items-center justify-center border border-primary/20 shadow-lg relative"
            whileHover={{ rotate: 20, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            {/* Glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary/30"
              animate={{ 
                boxShadow: isHovering 
                  ? '0 0 30px 10px rgba(168, 85, 247, 0.4)' 
                  : '0 0 20px 5px rgba(168, 85, 247, 0.2)'
              }}
              transition={{ duration: 0.4 }}
            />
            
            <motion.div
              animate={{ 
                rotate: [0, 360], 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/80 to-purple-600/80 relative"
            >
              <Scissors className="h-10 w-10 text-white drop-shadow-md" />
              
              {/* Animated dots around circle */}
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-white"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: 'center'
                  }}
                  animate={{
                    x: Math.cos(i * (Math.PI / 4)) * 35,
                    y: Math.sin(i * (Math.PI / 4)) * 35,
                    scale: [1, 0.8, 1],
                    opacity: [0.8, 0.4, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-500 drop-shadow-sm">
              InstaCut
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-light text-foreground/90 max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            Remove image backgrounds instantly with our 
            <span className="relative inline-block mx-1 font-normal">
              AI-powered
              <motion.span 
                className="absolute -top-1 -right-1"
                animate={{ 
                  rotate: [0, 20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </motion.span>
            </span> 
          </motion.p>
          
          <motion.div
            className="flex flex-col md:flex-row gap-5 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              onClick={scrollToUploader}
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white font-medium rounded-full px-12 py-7 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span className="relative z-10 mr-2">Start Removing Backgrounds</span>
              <motion.span
                className="relative z-10"
                animate={{ 
                  y: [0, 5, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.span>
              
              {/* Button shine effect */}
              <motion.div 
                className="absolute top-0 -left-[100%] h-full w-[80%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:animate-shine"
                initial={{ left: '-100%' }}
                whileHover={{ left: '100%' }}
                transition={{ duration: 0.8 }}
              />
            </Button>
            
            
          </motion.div>

          <motion.div 
            className="mt-28 opacity-80"
            variants={itemVariants}
          >
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="flex flex-col items-center cursor-pointer"
              onClick={scrollToUploader}
            >
              <span className="text-sm text-muted-foreground mb-2">Scroll to Upload</span>
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;