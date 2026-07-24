'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, Zap, Layers, ChevronRight, CheckCircle2, Play, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const pipelineNodes = [
  {
    id: 'input',
    title: 'Brain MRI Input',
    subtitle: 'T1w / ATLAS Volume (256x256x32)',
    type: 'preprocessing',
    details: 'Applies N4 bias field correction, 3D Coiflet wavelet denoising, and automated Otsu skull-stripping.',
    metrics: { resolution: '256x256', channels: '1 (Grayscale)', status: 'Preprocessed' }
  },
  {
    id: 'encoder',
    title: 'Contracting Path (Encoders)',
    subtitle: 'Feature Extraction & Dilated Convs',
    type: 'network',
    details: '4-stage residual encoder blocks reducing spatial dimension while extracting high-level lesion semantics.',
    metrics: { featureMaps: '64 -> 512', stride: '2x Downsample', receptiveField: 'Large' }
  },
  {
    id: 'plasticity',
    title: 'NIRP Bottleneck',
    subtitle: 'Neuro-Inspired Plasticity Layer',
    type: 'core_innovation',
    details: 'Dynamically adapts boundary gradient loss during backpropagation based on regional spatial variance Hebbian rules.',
    metrics: { rewardWeighting: 'Hebbian Spatial', focalAlpha: '0.70', lossMode: 'Reward-Weighted Dice' }
  },
  {
    id: 'decoder',
    title: 'Expanding Path (Decoders)',
    subtitle: 'Feature Reconstruction + Skips',
    type: 'network',
    details: 'Upsampling blocks combined with skip connection attention gates to preserve sharp anatomical spatial boundaries.',
    metrics: { skipGates: 'Attention Routed', upsample: 'Transposed Conv', features: '512 -> 64' }
  },
  {
    id: 'output',
    title: 'Lesion Mask Output',
    subtitle: 'Stroke Lesion ROI (Dice: 0.934)',
    type: 'output',
    details: 'Final binary segmentation mask demarcating ischemic stroke lesion ROI with high boundary precision.',
    metrics: { diceScore: '0.934', iouMetric: '0.887', latency: '18.4 ms' }
  }
];

export function UNetVisualizer() {
  const [selectedNode, setSelectedNode] = useState(pipelineNodes[2]); // Default to NIRP Bottleneck
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedSlice, setSimulatedSlice] = useState(1);

  const runSimulation = () => {
    setIsSimulating(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setSimulatedSlice((prev) => (prev % 32) + 1);
      if (count > 8) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 200);
  };

  return (
    <div className="w-full bg-[#0D0F17] rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">Interactive Neural Pipeline</Badge>
            <span className="text-xs font-mono text-zinc-400">Slice #{simulatedSlice} / 32</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Neuro-Inspired U-Net Segmentation Visualizer
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Simulating Forward Pass...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                <span>Run Inference Pass</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pipeline Node Flowchart */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 my-8 relative">
        {pipelineNodes.map((node, index) => {
          const isSelected = selectedNode.id === node.id;
          const isCore = node.type === 'core_innovation';

          return (
            <div key={node.id} className="relative flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedNode(node)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer relative z-10 ${
                  isSelected
                    ? isCore
                      ? 'bg-indigo-950/80 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                      : 'bg-cyan-950/80 border-cyan-500 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {isCore && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 text-[9px] font-mono uppercase bg-indigo-500 text-white rounded font-bold shadow">
                    Primary Innovation
                  </span>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    isCore ? 'bg-indigo-500/20 text-indigo-400' : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {node.id === 'input' && <Layers className="w-4 h-4" />}
                    {node.id === 'encoder' && <Cpu className="w-4 h-4" />}
                    {node.id === 'plasticity' && <Zap className="w-4 h-4" />}
                    {node.id === 'decoder' && <Activity className="w-4 h-4" />}
                    {node.id === 'output' && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Step 0{index + 1}</span>
                </div>
                <h4 className="text-sm font-semibold text-white leading-snug">{node.title}</h4>
                <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{node.subtitle}</p>

                {/* Animated pulse indicator when simulating */}
                {isSimulating && (
                  <motion.div
                    className="absolute inset-0 border-2 border-cyan-400 rounded-xl pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.95, 1.02, 0.95] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.15 }}
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={selectedNode.type === 'core_innovation' ? 'indigo' : 'cyan'}>
                {selectedNode.type.toUpperCase()}
              </Badge>
              <h4 className="text-lg font-bold text-white">{selectedNode.title}</h4>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">{selectedNode.details}</p>
          </div>

          <div className="bg-[#090A0F] p-4 rounded-lg border border-zinc-800 font-mono text-xs space-y-2">
            <span className="text-zinc-300 font-semibold block uppercase tracking-wider text-[10px]">
              Stage Metrics & Parameters
            </span>
            <div className="space-y-1.5 pt-1">
              {Object.entries(selectedNode.metrics).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-zinc-400">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-cyan-400 font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
