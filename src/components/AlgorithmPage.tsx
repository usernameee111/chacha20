import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChaChaVisualizer from './ChaChaVisualizer';

export default function AlgorithmPage() {
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Step 1: Initialization',
      description: 'The state matrix (16 words, 64 bytes) is set up with constants, key, nonce, and counter.',
      details: 'Words 0-3: Constants ("expand 32-byte k")\nWords 4-11: 256-bit Key\nWord 12: Counter\nWords 13-15: 96-bit Nonce',
      color: 'var(--neon-blue)',
    },
    {
      title: 'Step 2: Quarter-Round Operations',
      description: 'Each round applies quarter-round operations on columns and diagonals.',
      details: 'Operations: ADD, XOR, ROTATE\nColumns: (0,4,8,12), (1,5,9,13), (2,6,10,14), (3,7,11,15)\nDiagonals: (0,5,10,15), (1,6,11,12), (2,7,8,13), (3,4,9,14)',
      color: 'var(--neon-cyan)',
    },
    {
      title: 'Step 3: 20 Rounds',
      description: 'The algorithm performs 20 rounds (10 double-rounds) to thoroughly mix the state.',
      details: 'Each double-round:\n1. Column quarter-rounds (4 operations)\n2. Diagonal quarter-rounds (4 operations)\nTotal: 160 quarter-round operations',
      color: 'var(--neon-purple)',
    },
    {
      title: 'Step 4: Add Original State',
      description: 'After 20 rounds, add the original state to prevent reversibility.',
      details: 'For each word i: final[i] = working[i] + original[i]\nPrevents attacks by ensuring non-linearity',
      color: 'var(--neon-green)',
    },
    {
      title: 'Step 5: Generate Keystream',
      description: 'The final state becomes a 512-bit keystream block for encryption.',
      details: 'Output: 64 bytes of pseudo-random keystream\nUsed for XORing with plaintext\nIncrement counter for next block',
      color: 'var(--neon-red)',
    },
  ];

  return (
    <div className="container">
      <section className="section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-display font-black mb-4 text-[var(--neon-cyan)]">
            How ChaCha20 Works
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            Dive deep into the algorithm with step-by-step visualizations and interactive simulations.
          </p>
        </motion.div>

        {!showVisualizer ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Step-by-Step Cards */}
            <div className="space-y-6 mb-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="panel cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-display font-black"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}, rgba(0,0,0,0.5))`,
                        boxShadow: `0 0 20px ${step.color}`,
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      {index + 1}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold mb-2" style={{ color: step.color }}>
                        {step.title}
                      </h3>
                      <p className="text-[var(--muted)] mb-3">{step.description}</p>
                      <pre className="text-sm font-code text-[var(--text-primary)] bg-[var(--bg)] p-4 rounded-lg whitespace-pre-wrap">
                        {step.details}
                      </pre>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Demo CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="panel text-center scanlines"
            >
              <h3 className="text-3xl font-display font-bold mb-4 text-[var(--neon-purple)]">
                Ready for the Interactive Experience?
              </h3>
              <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
                Launch the 3D visualizer to see ChaCha20 in action. Watch the state matrix transform
                through each round with real-time animations and detailed logging.
              </p>
              <motion.button
                className="btn btn-primary text-lg px-8 py-4"
                onClick={() => setShowVisualizer(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Launch 3D Visualizer
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <button
                className="btn btn-secondary"
                onClick={() => setShowVisualizer(false)}
              >
                ← Back to Steps
              </button>
            </div>
            <ChaChaVisualizer />
          </motion.div>
        )}
      </section>
    </div>
  );
}