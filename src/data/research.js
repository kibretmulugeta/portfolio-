export const researchData = {
  primaryResearch: {
    title: "Neuro-Inspired Optimization for Medical Image Segmentation",
    status: "Manuscript in preparation for submission to Scientific Reports",
    authors: ["Kibret Mulugeta", "Department of Computer Engineering, Bahir Dar University"],
    abstract: "Medical image segmentation models often suffer from degraded boundary accuracy when detecting ischemic stroke lesions with low contrast and irregular geometries. In this work, we propose a novel Neuro-Inspired Reward Plasticity (NIRP) optimization module integrated directly into the contracting and expanding paths of U-Net architectures. By simulating synaptic weight adaptation inspired by biological neural plasticity, our method dynamically scales regional loss gradients based on spatial boundary variance. Evaluation on the public ATLAS v2.0 stroke MRI dataset demonstrates a Dice Similarity Coefficient of 0.934 and an IoU of 0.887, outperforming baseline U-Net models while maintaining real-time inference speed (18.4ms per slice).",
    keywords: ["Neuro-Inspired Computing", "Medical Image Segmentation", "Brain MRI Stroke Lesion", "U-Net Architecture", "Neural Plasticity", "ATLAS Dataset"],
    keyMetrics: [
      { label: "Dice Score", value: "0.934", baseline: "0.865" },
      { label: "IoU Metric", value: "0.887", baseline: "0.792" },
      { label: "Inference Speed", value: "18.4 ms", baseline: "32.1 ms" },
      { label: "False Positive Rate", value: "3.2%", baseline: "9.8%" }
    ],
    mathFormulation: {
      heading: "Synaptic Reward Plasticity Loss Weighting",
      formula: "L_{NIRP} = \\alpha \\cdot (1 - DSC) + \\beta \\cdot \\sum_{i,j} w_{plasticity}(i,j) \\cdot FocalLoss(p_{ij}, y_{ij})",
      explanation: "Where w_{plasticity}(i,j) adapts based on local spatial variance sigma^2(i,j), prioritizing boundary voxels where manual ROI annotations display highest inter-observer variability."
    }
  },
  interests: [
    {
      topic: "Neuro-Inspired Machine Learning",
      description: "Incorporating synaptic plasticity mechanisms, spike-timing-dependent learning rules, and attention modulation into deep neural network backpropagation."
    },
    {
      topic: "Medical Computer Vision & MRI Analysis",
      description: "Developing automated, robust 3D segmentation algorithms for neuroimaging data, stroke lesion classification, and brain tissue volumetric analysis."
    },
    {
      topic: "Hardware-Efficient Deep Learning Inference",
      description: "Optimizing neural net architectures for edge deployments, low-precision quantization, and sub-20ms inference on resource-constrained hardware."
    },
    {
      topic: "Reliable & Secure AI Infrastructure",
      description: "Architecting cloud-native AI microservices with end-to-end telemetry, token security, and deterministic state tracking."
    }
  ],
  datasets: [
    {
      name: "ATLAS v2.0 (Anatomical Tracings of Lesions After Stroke)",
      slices: "3,500+ T1-weighted MRI Scans",
      role: "Primary dataset for training & validating NIRP-U-Net stroke segmentation models."
    },
    {
      name: "Brain Tumor Segmentation (BraTS)",
      slices: "Multi-parametric MRI (FLAIR, T1w, T1gd, T2w)",
      role: "Benchmark dataset used for cross-modal generalization experiments."
    }
  ]
};
