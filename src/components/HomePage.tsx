import React from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const pioneers = [
    {
      name: 'Daniel J. Bernstein',
      role: 'Creator of ChaCha20',
      bio: 'Cryptographic genius behind ChaCha20, designed for speed and unbreakable security. Pioneer of modern stream cipher design.',
      image: '🔐',
    },
    {
      name: 'The Cryptography Community',
      role: 'Validators & Implementers',
      bio: 'Worldwide security experts who tested, validated, and implemented ChaCha20 across platforms, ensuring its reliability.',
      image: '🌐',
    },
  ];

  return (
    <div className="container">
      <section className="section">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="logo-badge mx-auto mb-8"
            style={{ width: 150, height: 150, fontSize: '4rem' }}
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Ch20
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-display font-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span
              className="glitch"
              data-text="ChaCha20"
              style={{
                background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-green))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ChaCha20
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[var(--muted)] max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A lightning-fast stream cipher revolutionizing secure data encryption.
            <br />
            <span className="text-[var(--neon-cyan)] font-code text-lg">
              Fast. Streamlined. Unbreakable.
            </span>
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button className="btn btn-primary">
              Explore the Algorithm →
            </button>
            <button className="btn btn-secondary">
              Try Encryption
            </button>
          </motion.div>
        </motion.div>

        {/* Pioneers Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-[var(--neon-cyan)]">
            The Pioneers
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {pioneers.map((pioneer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className="panel scanlines"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-6">
                  <motion.div
                    className="text-8xl"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {pioneer.image}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold mb-2 text-[var(--neon-green)]">
                      {pioneer.name}
                    </h3>
                    <p className="text-sm text-[var(--neon-purple)] mb-3 font-code">
                      {pioneer.role}
                    </p>
                    <p className="text-[var(--muted)] leading-relaxed">
                      {pioneer.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { label: 'Encryption Rounds', value: '20', icon: '🔄' },
            { label: 'Key Size (bits)', value: '256', icon: '🔑' },
            { label: 'Nonce Size (bits)', value: '96', icon: '🎲' },
            { label: 'Security Level', value: 'Max', icon: '🛡️' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="panel text-center"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-display font-bold text-[var(--neon-cyan)] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}