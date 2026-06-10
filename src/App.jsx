'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const KubecostUnifiedView = () => {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowChart(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const bars = [
    { label: "CPU", value: 85, color: "bg-emerald-500" },
    { label: "GPU", value: 30, color: "bg-emerald-400" },
    { label: "RAM", value: 60, color: "bg-emerald-500" },
    { label: "PV", value: 42, color: "bg-emerald-400" },
    { label: "Network", value: 50, color: "bg-emerald-500" },
    { label: "Cloud", value: 20, color: "bg-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-2 shadow-md">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">K</div>
            <span className="text-2xl md:text-4xl font-bold text-emerald-900 tracking-tight">KubeCost</span>
          </div>
          <p className="mt-4 text-emerald-700 text-base md:text-lg px-4">
            Unified Cost Visibility Across All Environments
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="relative w-full aspect-[16/13] md:aspect-[16/11] lg:aspect-[16/10] max-h-[680px] 
                      border-2 border-dashed border-emerald-300/70 rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl overflow-hidden">

          {/* Dotted connecting lines - Responsive SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1200 680"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
              d="M 220 180 Q 480 160 520 280"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="10 8"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              d="M 980 180 Q 720 160 680 280"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="10 8"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              d="M 220 500 Q 480 520 520 400"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="10 8"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              d="M 980 500 Q 720 520 680 400"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="10 8"
            />
          </svg>

          {/* Cloud Nodes - Responsive Positioning */}
          <div className="absolute inset-0">
            {/* AWS - Top Left */}
            <Node label="AWS" icon="☁️" className="top-[12%] left-[6%] md:top-[14%] md:left-[8%]" delay={0.2} />

            {/* Azure - Top Right */}
            <Node label="Azure" icon="🔷" className="top-[12%] right-[6%] md:top-[14%] md:right-[8%]" delay={0.4} />

            {/* Google Cloud - Bottom Left */}
            <Node label="Google Cloud" icon="🌥️" className="bottom-[12%] left-[6%] md:bottom-[14%] md:left-[8%]" delay={0.6} />

            {/* On-Premise - Bottom Right */}
            <Node label="On-Premise" icon="🏠" className="bottom-[12%] right-[6%] md:bottom-[14%] md:right-[8%]" delay={0.8} />
          </div>

          {/* Central Chart Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[92%] max-w-[460px] md:w-[420px] lg:w-[460px] bg-white rounded-2xl shadow-xl border border-emerald-200 p-5 md:p-8 z-30"
          >
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 text-xs md:text-sm font-medium rounded-full mb-2">
                Total Infrastructure Cost
              </div>
              <div className="text-emerald-900 font-semibold text-sm md:text-base">Last 30 Days</div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-3 md:gap-6 px-2 md:px-4">
              {bars.map((bar, idx) => (
                <AnimatedBar
                  key={idx}
                  label={bar.label}
                  value={bar.value}
                  color={bar.color}
                  delay={0.3 + idx * 0.3}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 md:mt-10 pt-6 border-t border-dashed border-emerald-200 flex justify-between items-center text-xs md:text-sm">
              <div className="flex items-center gap-2 text-emerald-600">
                <div className="w-3 h-3 bg-emerald-500 rounded" />
                <span>In-cluster</span>
              </div>
              <div className="text-emerald-800 font-semibold">$8,472.19</div>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center mt-6 md:mt-8 text-emerald-600/80 text-sm md:text-base px-4"
        >
          Comprehensive view • Real-time • Multi-cloud + On-prem
        </motion.p>
      </div>
    </div>
  );
};

// Reusable Node Component
const Node = ({ label, icon, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className={`absolute flex flex-col items-center z-20 ${className}`}
  >
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[40%] rotate-12 flex items-center justify-center border-4 border-white shadow-xl">
        <div className="text-4xl md:text-5xl -rotate-12">{icon}</div>
      </div>
      <div className="absolute top-3 right-3 w-5 h-5 md:w-6 md:h-6 bg-white/90 rounded-[30%] rotate-12 flex items-center justify-center text-[10px] md:text-xs font-bold text-emerald-700 shadow">
        K8s
      </div>
    </div>
    <div className="mt-2 md:mt-3 text-emerald-800 font-semibold text-xs md:text-sm tracking-wide bg-white/90 px-4 py-1 rounded-full border border-emerald-200 shadow text-center">
      {label}
    </div>
  </motion.div>
);

// Animated Bar Component
const AnimatedBar = ({ label, value, color, delay }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setHeight(value), delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex flex-col items-center gap-1.5 md:gap-2 flex-1 min-w-0">
      <div className="relative h-40 sm:h-48 md:h-52 w-full max-w-[38px] flex items-end justify-center">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay }}
          className={`w-full rounded-t ${color} shadow-md relative`}
          style={{ minHeight: '18px' }}
        >
          <div className="absolute top-1.5 left-0.5 right-0.5 h-0.5 bg-white/40 rounded" />
        </motion.div>
      </div>
      <div className="text-[10px] sm:text-xs font-medium text-emerald-700 text-center leading-tight">
        {label}
      </div>
    </div>
  );
};

export default KubecostUnifiedView;