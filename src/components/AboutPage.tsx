import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const timeline = [
    { year: '2008', event: 'ChaCha20 designed by Daniel J. Bernstein', icon: '🎯' },
    { year: '2014', event: 'Google adopts ChaCha20 for mobile TLS', icon: '📱' },
    { year: '2015', event: 'RFC 7539 standardizes ChaCha20-Poly1305', icon: '📜' },
    { year: '2016', event: 'OpenSSH integrates ChaCha20', icon: '🔒' },
    { year: '2020+', event: 'Widespread adoption across platforms', icon: '🌍' },
  ];

  const features = [
    {
      title: 'Lightning Fast',
      description: 'Optimized for speed on modern CPUs without hardware acceleration.',
      icon: '⚡',
      color: 'var(--neon-cyan)',
    },
    {
      title: 'Provably Secure',
      description: '256-bit security with resistance to timing attacks and side-channels.',
      icon: '🛡️',
      color: 'var(--neon-green)',
    },
    {
      title: 'Simple Design',
      description: 'Based on ARX operations (Add, Rotate, XOR) - easy to implement and audit.',
      icon: '🧩',
      color: 'var(--neon-purple)',
    },
    {
      title: 'Mobile-Optimized',
      description: 'Performs exceptionally well on ARM processors and mobile devices.',
      icon: '📱',
      color: 'var(--neon-blue)',
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
            About ChaCha20
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-4xl mx-auto">
            This interactive platform demystifies the ChaCha20 encryption algorithm, empowering
            users to understand and experiment with modern cryptography in a secure, engaging way.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="panel"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03, borderColor: feature.color }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="text-5xl"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                >
                  {feature.icon}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2" style={{ color: feature.color }}>
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted)]">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-[var(--neon-purple)]">
            Evolution Timeline
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-green)]" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="relative mb-12"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + 0.1 * i }}
              >
                <div className={`flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      className="panel inline-block"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-2xl font-display font-bold text-[var(--neon-cyan)] mb-1">
                        {item.year}
                      </div>
                      <p className="text-[var(--muted)]">{item.event}</p>
                    </motion.div>
                  </div>
                  <motion.div
                    className="w-2/12 flex justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-4"
                      style={{
                        borderColor: 'var(--neon-cyan)',
                        boxShadow: 'var(--glow-cyan)',
                        background: 'var(--bg)',
                      }}
                    />
                  </motion.div>
                  <div className="w-5/12" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="panel"
        >
          <h2 className="text-3xl font-display font-bold mb-8 text-center text-[var(--neon-green)]">
            ChaCha20 vs Other Ciphers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full font-code text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-3 text-[var(--neon-cyan)]">Feature</th>
                  <th className="text-left p-3 text-[var(--neon-cyan)]">ChaCha20</th>
                  <th className="text-left p-3 text-[var(--muted)]">AES-128</th>
                  <th className="text-left p-3 text-[var(--muted)]">Salsa20</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Key Size', '256 bits', '128 bits', '256 bits'],
                  ['Speed (Software)', 'Very Fast', 'Fast', 'Very Fast'],
                  ['Security', 'Excellent', 'Excellent', 'Good'],
                  ['Mobile Performance', 'Excellent', 'Good', 'Excellent'],
                  ['Adoption', 'Growing', 'Widespread', 'Limited'],
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    className="border-b border-[var(--border)] hover:bg-[var(--panel-hover)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + 0.1 * i }}
                  >
                    <td className="p-3 font-bold">{row[0]}</td>
                    <td className="p-3 text-[var(--neon-green)]">{row[1]}</td>
                    <td className="p-3">{row[2]}</td>
                    <td className="p-3">{row[3]}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}