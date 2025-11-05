import React from 'react';
import { motion } from 'framer-motion';
import TryPanel from './TryPanel';

export default function TryItPage() {
  return (
    <div className="container">
      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-display font-black mb-4 text-[var(--neon-cyan)]">
            Try ChaCha20 Encryption
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto mb-8">
            Experiment with real-time encryption and decryption. Watch the algorithm transform your
            data with visual feedback at every step.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {[
              { icon: '⚡', label: 'Real-time Processing' },
              { icon: '🔍', label: 'Step-by-Step Visualization' },
              { icon: '🎨', label: 'Interactive Parameters' },
              { icon: '🔐', label: 'Client-side Security' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="px-4 py-2 rounded-full border border-[var(--neon-cyan)] bg-[var(--panel)] text-sm font-code"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.05, boxShadow: 'var(--glow-cyan)' }}
              >
                {feature.icon} {feature.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TryPanel />
        </motion.div>

        {/* Instructions Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Enter Your Data',
              description: 'Type any text you want to encrypt. The system will process it in real-time.',
              icon: '📝',
            },
            {
              title: 'Customize Parameters',
              description: 'Adjust the key and nonce (or use defaults). See how different values affect output.',
              icon: '⚙️',
            },
            {
              title: 'Watch the Magic',
              description: 'Observe the encryption process with live visualizations and hexadecimal output.',
              icon: '✨',
            },
          ].map((instruction, i) => (
            <motion.div
              key={i}
              className="panel text-center"
              whileHover={{ y: -5, borderColor: 'var(--neon-cyan)' }}
            >
              <div className="text-5xl mb-4">{instruction.icon}</div>
              <h3 className="text-xl font-display font-bold mb-2 text-[var(--neon-green)]">
                {instruction.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">{instruction.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}