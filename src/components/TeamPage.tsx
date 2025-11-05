import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeamPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const team = [
    {
      name: 'Alex Chen',
      role: 'Cryptography Lead',
      bio: 'Ph.D. in Applied Cryptography. 10+ years building secure systems. Passionate about making encryption accessible.',
      icon: '👨‍💻',
      color: 'var(--neon-cyan)',
    },
    {
      name: 'Sarah Martinez',
      role: 'Visual Designer',
      bio: 'Award-winning designer specializing in data visualization and interactive experiences for complex algorithms.',
      icon: '👩‍🎨',
      color: 'var(--neon-purple)',
    },
    {
      name: 'James Park',
      role: 'Frontend Engineer',
      bio: 'Expert in React and 3D graphics. Built the immersive visualizations that bring ChaCha20 to life.',
      icon: '👨‍💼',
      color: 'var(--neon-green)',
    },
    {
      name: 'Maya Patel',
      role: 'Security Researcher',
      bio: 'Penetration tester and security auditor. Ensures our implementation follows best practices.',
      icon: '👩‍🔬',
      color: 'var(--neon-red)',
    },
    {
      name: 'David Kim',
      role: 'Algorithm Specialist',
      bio: 'Mathematical optimization expert. Optimized ChaCha20 simulations for real-time performance.',
      icon: '👨‍🔧',
      color: 'var(--neon-blue)',
    },
    {
      name: 'Emma Johnson',
      role: 'Education Coordinator',
      bio: 'Former CS professor turned interactive learning designer. Makes cryptography fun and accessible.',
      icon: '👩‍🏫',
      color: 'var(--neon-cyan)',
    },
  ];

  return (
    <div className="container">
      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-display font-black mb-4 text-[var(--neon-cyan)]">
            Meet the Team
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            A diverse group of cryptography experts, designers, and engineers dedicated to
            making secure encryption accessible to everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <AnimatePresence>
            {team.map((member, index) => {
              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isOtherHovered ? 0.3 : 1,
                    scale: isHovered ? 1.1 : 1,
                    zIndex: isHovered ? 10 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className="panel cursor-pointer overflow-visible"
                    style={{
                      borderColor: isHovered ? member.color : 'var(--border)',
                      boxShadow: isHovered ? `0 0 40px ${member.color}` : undefined,
                    }}
                  >
                    {/* Profile Image/Icon */}
                    <motion.div
                      className="text-8xl mb-4 text-center"
                      animate={{
                        rotate: isHovered ? [0, 10, -10, 0] : 0,
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {member.icon}
                    </motion.div>

                    {/* Name */}
                    <motion.h3
                      className="text-2xl font-display font-bold text-center mb-2"
                      style={{ color: isHovered ? member.color : 'var(--text-primary)' }}
                    >
                      {member.name}
                    </motion.h3>

                    {/* Role */}
                    <p className="text-sm font-code text-center mb-4" style={{ color: member.color }}>
                      {member.role}
                    </p>

                    {/* Bio - Shows on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mt-4 p-4 rounded-lg border"
                            style={{
                              borderColor: member.color,
                              background: 'var(--bg-secondary)',
                            }}
                          >
                            <p className="text-sm text-[var(--muted)] leading-relaxed">
                              {member.bio}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover Indicator */}
                    {!isHovered && (
                      <motion.div
                        className="mt-4 text-center text-xs text-[var(--muted)] font-code"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Hover to learn more →
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Particle Effects on Hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: member.color,
                            boxShadow: `0 0 10px ${member.color}`,
                          }}
                          initial={{
                            x: '50%',
                            y: '50%',
                            scale: 0,
                          }}
                          animate={{
                            x: `${50 + Math.cos((i * Math.PI * 2) / 8) * 100}%`,
                            y: `${50 + Math.sin((i * Math.PI * 2) / 8) * 100}%`,
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 panel text-center scanlines"
        >
          <h2 className="text-3xl font-display font-bold mb-4 text-[var(--neon-purple)]">
            Want to Join Us?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who love cryptography, design, and
            making complex topics accessible. Reach out if you'd like to contribute!
          </p>
          <button className="btn btn-primary">
            Get in Touch →
          </button>
        </motion.div>
      </section>
    </div>
  );
}