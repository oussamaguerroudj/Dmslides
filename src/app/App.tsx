import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  MessageSquare, 
  Play, 
  BarChart3, 
  Users, 
  FileSearch, 
  BrainCircuit, 
  Zap, 
  Database, 
  Trophy,
  AlertCircle,
  LayoutDashboard,
  CheckCircle2,
  Settings,
  Presentation
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell as ReCell
} from 'recharts';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// --- Data & Constants ---

const COLORS = {
  primary: '#1F3FA3',
  secondary: '#2349C6',
  accent: '#F5C400',
  white: '#FFFFFF',
  text: '#1A1A1A',
  gray: '#F3F4F6',
  chart: ['#1F3FA3', '#2349C6', '#F5C400', '#E5E7EB', '#6B7280']
};

const DECISION_DATA = [
  { name: 'Entretien (Interview)', value: 1115, color: '#1F3FA3' },
  { name: 'Retenu (Selected)', value: 1084, color: '#F5C400' },
  { name: 'Rejeté (Rejected)', value: 801, color: '#E5E7EB' },
];

const ALGO_DATA = [
  { name: 'Logistic Reg.', accuracy: 37.0, f1: 30.88 },
  { name: 'Random Forest', accuracy: 33.5, f1: 33.11 },
  { name: 'Grad. Boosting', accuracy: 34.5, f1: 32.51 },
  { name: 'SVM', accuracy: 37.83, f1: 31.97 },
];

const FEATURE_IMPORTANCE = [
  { name: 'Wilaya_Encoded', value: 26.8 },
  { name: 'Experience_Mois', value: 17.9 },
  { name: 'Age', value: 16.4 },
  { name: 'Skills_Count', value: 12.0 },
  { name: 'Education_Level', value: 6.4 },
];

// --- Components ---

const SlideWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={`w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100 ${className}`}
  >
    {children}
  </motion.div>
);

const WaveBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-10">
    <svg viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full h-auto">
      <path fill={COLORS.primary} fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
    <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto rotate-180">
      <path fill={COLORS.accent} fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
    </svg>
  </div>
);

const ProgressBar = ({ current, total }: { current: number, total: number }) => (
  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
    <motion.div 
      className="h-full bg-blue-600"
      initial={{ width: 0 }}
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

// --- Slide Components ---

const Slide1 = () => (
  <SlideWrapper className="justify-center items-center text-center overflow-hidden">
    <WaveBackground />
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="mb-8"
    >
      <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
        <Presentation className="w-12 h-12 text-white" />
      </div>
    </motion.div>
    <motion.h1 
      className="text-5xl md:text-6xl font-bold mb-6 text-blue-900 tracking-tight"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      Predictive HR Analytics <br />
      <span className="text-blue-600">for Algeria Poste Recruitment</span>
    </motion.h1>
    <motion.div 
      className="h-1 w-24 bg-yellow-400 mx-auto mb-8"
      initial={{ width: 0 }}
      animate={{ width: 96 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    />
    <motion.p 
      className="text-xl text-gray-600 mb-12 max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Data Mining Project Demo: Enhancing recruitment efficiency with AI
    </motion.p>
    <motion.div 
      className="flex flex-col md:flex-row gap-8 text-sm font-medium text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex flex-col">
        <span className="text-gray-400 uppercase tracking-widest text-xs mb-1">Presented by</span>
        <span className="text-gray-900">Data Analytics Team</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 uppercase tracking-widest text-xs mb-1">Date</span>
        <span className="text-gray-900">February 4, 2026</span>
      </div>
    </motion.div>
  </SlideWrapper>
);

const Slide2 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <LayoutDashboard className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Project Overview & Business Problem</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full pb-8">
      <motion.div 
        className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 rounded-lg"><AlertCircle className="w-5 h-5 text-red-600" /></div>
          <h3 className="text-xl font-bold text-gray-800">The Challenge</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="font-bold text-red-600">•</span>
            <p><span className="font-semibold">Problem:</span> HR manually screens 3000+ candidates</p>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-red-600">•</span>
            <p><span className="font-semibold">Pain point:</span> Time-consuming, subjective, inconsistent</p>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-red-600">•</span>
            <p><span className="font-semibold">Goal:</span> Build predictive model to assist decision-making</p>
          </li>
        </ul>
      </motion.div>
      <motion.div 
        className="bg-blue-900 p-8 rounded-3xl text-white flex flex-col"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-800 rounded-lg"><Zap className="w-5 h-5 text-yellow-400" /></div>
          <h3 className="text-xl font-bold">Our Solution</h3>
        </div>
        <ul className="space-y-4 opacity-90">
          <li className="flex gap-3">
            <span className="font-bold text-yellow-400">•</span>
            <p><span className="font-semibold">Objective:</span> Predict decisions (Selected/Interview/Rejected)</p>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-yellow-400">•</span>
            <p><span className="font-semibold">Dataset:</span> 3000 candidates across Algerian wilayas</p>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-yellow-400">•</span>
            <p><span className="font-semibold">Value:</span> Reduce screening time by 50%</p>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-yellow-400">•</span>
            <p><span className="font-semibold">Approach:</span> Data mining with explainable AI</p>
          </li>
        </ul>
      </motion.div>
    </div>
  </SlideWrapper>
);

const Slide3 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <BarChart3 className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Dataset Exploration Insights</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { label: 'Total Candidates', value: '3,000', sub: 'Across 10 Wilayas' },
        { label: 'Features Extracted', value: '28', sub: 'Including engineered data' },
        { label: 'Avg. Experience', value: '8 Months', sub: 'Range: 1-20 months' },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">{stat.label}</p>
          <p className="text-3xl font-bold text-blue-900">{stat.value}</p>
          <p className="text-gray-400 text-sm">{stat.sub}</p>
        </motion.div>
      ))}
    </div>
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          Decision Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DECISION_DATA}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1500}
              >
                {DECISION_DATA.map((entry, index) => (
                  <ReCell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col bg-gray-50 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Candidate Profile Key Findings</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
            <p className="text-gray-700 text-sm"><span className="font-bold">Education:</span> Most candidates hold M2 (809), followed by L3 (704) and M1 (693).</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
            <p className="text-gray-700 text-sm"><span className="font-bold">Top Skills:</span> Soft skills like Teamwork and Leadership dominate (801 candidates).</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
            <p className="text-gray-700 text-sm"><span className="font-bold">Balanced Decisions:</span> Entretien (37.17%) and Retenu (36.13%) are nearly equal.</p>
          </li>
        </ul>
      </div>
    </div>
  </SlideWrapper>
);

const Slide4 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <FileSearch className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Data Quality Issues & Cleaning</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold text-red-600 mb-6">Problems We Found</h3>
        <div className="space-y-4">
          {[
            { label: 'Date format inconsistencies', icon: '⚠️' },
            { label: 'Skill separator variations (comma, semicolon, slash)', icon: '⚠️' },
            { label: 'Missing education levels (26.47%)', icon: '⚠️' },
            { label: 'Wilaya name standardization needed', icon: '⚠️' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
            >
              <span className="text-xl">{item.icon}</span>
              <p className="text-gray-800 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold text-blue-600 mb-6">Our Cleaning Process</h3>
        <div className="space-y-4">
          {[
            { label: 'Standardized Education Levels', detail: 'Consolidated to L3, M1, M2' },
            { label: 'Normalized Wilaya Names', detail: 'Reduced 66 variations to 10 standard units' },
            { label: 'Unified Skill Separators', detail: 'All converted to standard comma-separated' },
            { label: 'Intelligent Missing Values', detail: 'Imputed based on peer group analysis' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100"
            >
              <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-gray-900 font-bold">{item.label}</p>
                <p className="text-gray-600 text-sm">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

const Slide5 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <BrainCircuit className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Feature Engineering</h2>
    </div>
    <div className="flex flex-col items-center mb-10">
      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase font-bold mb-1">Original</p>
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-3xl font-bold text-gray-400"><Counter value={10} /></span>
          </div>
        </div>
        <ChevronRight className="w-8 h-8 text-blue-200" />
        <div className="text-center">
          <p className="text-blue-600 text-xs uppercase font-bold mb-1">Engineered</p>
          <div className="w-40 h-40 bg-blue-900 rounded-full flex items-center justify-center border-4 border-blue-100 shadow-2xl relative">
            <span className="text-4xl font-bold text-white"><Counter value={28} /></span>
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-black px-2 py-1 rounded-full">+18 New</div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: 'Age Categories', desc: 'Extracted from birth dates' },
        { title: 'Education Score', desc: 'Combined level + field impact' },
        { title: 'Experience Levels', desc: 'Débutant, Junior, Expérimenté' },
        { title: 'Skill Categories', desc: 'Prog, Web, DB, Data Science, etc.' },
        { title: 'Geo Encoding', desc: 'Wilaya transformed for modeling' },
        { title: 'Skill Diversity', desc: 'Total count of technical assets' },
      ].map((feat, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3">
            <Settings className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-gray-900 mb-1">{feat.title}</h4>
          <p className="text-sm text-gray-500">{feat.desc}</p>
        </div>
      ))}
    </div>
  </SlideWrapper>
);

const Slide6 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <Zap className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Algorithms Tested - Comparative Analysis</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ALGO_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="accuracy" name="Accuracy (%)" fill="#1F3FA3" radius={[4, 4, 0, 0]} />
            <Bar dataKey="f1" name="F1-Score (%)" fill="#F5C400" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase font-bold text-xs">
            <tr>
              <th className="px-4 py-3">Algorithm</th>
              <th className="px-4 py-3">Pros</th>
              <th className="px-4 py-3">Cons</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 font-bold">Logistic Reg.</td>
              <td className="px-4 py-3 text-gray-600">Interpretable, fast</td>
              <td className="px-4 py-3 text-red-500">Linear assumptions</td>
            </tr>
            <tr className="bg-blue-50/50">
              <td className="px-4 py-3 font-bold text-blue-900">Random Forest</td>
              <td className="px-4 py-3 text-gray-600">Handles complexity</td>
              <td className="px-4 py-3 text-red-500">Black box nature</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-bold">Gradient Boosting</td>
              <td className="px-4 py-3 text-gray-600">High power</td>
              <td className="px-4 py-3 text-red-500">Slow training</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-bold">SVM</td>
              <td className="px-4 py-3 text-gray-600">High dim. spaces</td>
              <td className="px-4 py-3 text-red-500">Poor scalability</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </SlideWrapper>
);

const Slide7 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <Trophy className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Why Random Forest? (Selection Rationale)</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {[
        { 
          title: 'Performance Balance', 
          desc: 'Best F1-score (33.11%) and stable cross-validation results. Crucial for multi-class prediction.',
          icon: <BarChart3 className="text-blue-600" />
        },
        { 
          title: 'Explainability', 
          desc: 'Feature importance scores provide "Explainable AI" that HR can trust and understand.',
          icon: <MessageSquare className="text-blue-600" />
        },
        { 
          title: 'Data Robustness', 
          desc: 'Handles mixed data types (categorical/numerical) and is robust to outliers/missing data.',
          icon: <Database className="text-blue-600" />
        },
        { 
          title: 'Business Alignment', 
          desc: 'Fast predictions for real-time screening and provides confidence scores for review.',
          icon: <Zap className="text-blue-600" />
        },
      ].map((card, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col gap-4"
        >
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
            {card.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
          <p className="text-gray-600 leading-relaxed">{card.desc}</p>
        </motion.div>
      ))}
    </div>
  </SlideWrapper>
);

const Slide8 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <LayoutDashboard className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Feature Importance - Key Insights for HR</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center h-full">
      <div className="lg:col-span-2 h-full flex flex-col">
        <h3 className="text-lg font-semibold mb-6">Top Predictive Factors Ranking</h3>
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={FEATURE_IMPORTANCE} margin={{ left: 40, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#1F3FA3" radius={[0, 4, 4, 0]}>
                {FEATURE_IMPORTANCE.map((entry, index) => (
                  <ReCell key={`cell-${index}`} fill={index === 0 ? '#F5C400' : '#1F3FA3'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 bg-blue-900 rounded-3xl text-white shadow-lg">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Actionable Insights
          </h4>
          <p className="text-sm opacity-90 leading-relaxed">
            Wilaya is the strongest predictor (27%). This suggests a geographic pattern that HR should audit for potential bias.
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
          <h4 className="font-bold mb-2 text-gray-900">Skill Diversity</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            The total number of skills matters more than specific deep specialization for the initial screening stage.
          </p>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Slide9 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <CheckCircle2 className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Model Performance & Business Application</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-500 uppercase tracking-widest text-xs">Overall Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Accuracy', value: '33.50%', trend: '+0.2%' },
              { label: 'Precision', value: '33.37%', trend: 'Stable' },
              { label: 'Recall', value: '33.50%', trend: 'Stable' },
              { label: 'F1-Score', value: '33.11%', trend: 'Optimal' },
            ].map((m, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-xs mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-blue-900">{m.value}</p>
                <p className="text-[10px] text-green-600 font-bold">{m.trend}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
          <p className="text-sm text-yellow-800 font-medium italic">
            "Performance is slightly better than random (33.3%), indicating significant room for improvement with better feature data."
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-6">How HR Can Use This System</h3>
        <div className="space-y-4">
          {[
            { title: 'First-Pass Filter', desc: 'Automatically process clear cases to reduce initial load.' },
            { title: 'Focus Manual Review', desc: 'Flag low-confidence predictions for human experts.' },
            { title: 'Bias Detection', desc: 'Monitor geographic patterns to ensure fair recruitment.' },
            { title: 'Strategic Insights', desc: 'Guide job definitions based on successful candidate profiles.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs shrink-0">{i + 1}</div>
              <div>
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Slide10 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <AlertCircle className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Limitations & Next Steps</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-gray-50 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-8 bg-red-400 rounded-full" />
          Current Limitations
        </h3>
        <ul className="space-y-6">
          <li className="flex gap-4">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Data Quality Constraints</p>
              <p className="text-sm text-gray-600">33.5% accuracy is limited by available raw data features.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
            <div>
              <p className="font-bold text-gray-800">Missing Critical Context</p>
              <p className="text-sm text-gray-600">No interview performance or technical assessment scores in current set.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
            <div>
              <p className="font-bold text-gray-800">No Post-Hire Data</p>
              <p className="text-sm text-gray-600">Cannot yet track actual job success vs. recruitment prediction.</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-2 h-8 bg-blue-600 rounded-full" />
          Recommendations
        </h3>
        <div className="space-y-4">
          <div className="p-5 border border-blue-100 rounded-2xl bg-blue-50/50">
            <p className="font-bold text-blue-900 mb-1">Immediate: Data Collection</p>
            <p className="text-sm text-gray-600">Start quantifying interview results and standardizing skill reporting.</p>
          </div>
          <div className="p-5 border border-blue-100 rounded-2xl bg-blue-50/50">
            <p className="font-bold text-blue-900 mb-1">Strategic: Success Tracking</p>
            <p className="text-sm text-gray-600">Link candidate success in role back to recruitment data.</p>
          </div>
          <div className="p-5 border border-blue-100 rounded-2xl bg-blue-50/50">
            <p className="font-bold text-blue-900 mb-1">Technical: Model Retraining</p>
            <p className="text-sm text-gray-600">Implement quarterly retraining cycles with A/B testing.</p>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Slide11 = () => (
  <SlideWrapper>
    <div className="flex items-center gap-3 mb-8">
      <Settings className="text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Technical Implementation Highlights</h2>
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 -z-10" />
        <div className="flex justify-between items-center px-4">
          {[
            { label: 'Collection', icon: <Database /> },
            { label: 'Cleaning', icon: <FileSearch /> },
            { label: 'Features', icon: <BrainCircuit /> },
            { label: 'Training', icon: <Zap /> },
            { label: 'Deployment', icon: <Rocket /> },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-white border-2 border-blue-600 rounded-2xl flex items-center justify-center text-blue-600 shadow-md">
                {step.icon || <CheckCircle2 />}
              </div>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-2xl text-white font-mono text-sm">
          <p className="text-blue-400 mb-4">// Generated Files</p>
          <ul className="space-y-2 opacity-80">
            <li>• /data/processed/candidats_features.csv</li>
            <li>• /ml/models/random_forest_model.pkl</li>
            <li>• /reports/figures/feature_importance.png</li>
            <li>• /reports/01_exploration_summary.txt</li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium">Automated visualizations saved to Drive</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium">Confidence scores for every prediction</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium">Fully reproducible Jupyter pipeline</p>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

const Rocket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.49 1.26-1.11 1.62-1.83l.71-1.42a1 1 0 0 0-.11-1.12c-.52-.64-1.28-1.56-2.08-2.36-.8-.8-1.72-1.56-2.36-2.08a1 1 0 0 0-1.12-.11l-1.42.71c-.72.36-1.34.91-1.83 1.62z"/><path d="m9 15 3-3"/><path d="M12 9a1 1 0 0 1-1-1 1 1 0 0 1 1-1"/><path d="M13 3c4 0 7 3 7 7 0 2-1 3-1 3l-6 6c-2 0-3-1-3-1s-1-1-1-3l6-6c0 0 1-1 3-1z"/><path d="M16 8a1 1 0 1 0 2 0 1 1 0 1 0-2 0Z"/><path d="M17 21v-2"/><path d="M21 17h-2"/></svg>
);

const Slide12 = () => (
  <SlideWrapper className="justify-center items-center text-center overflow-hidden">
    <WaveBackground />
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="mb-8"
    >
      <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white">
        <CheckCircle2 className="w-10 h-10 text-blue-900" />
      </div>
    </motion.div>
    <h2 className="text-4xl font-bold text-blue-900 mb-8">Conclusion & Q&A</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
      {[
        { title: 'Geographic Bias exists', desc: 'Wilaya predicts 27% of decisions.' },
        { title: 'Skill Diversity Wins', desc: 'Versatility over specialization.' },
        { title: 'AI as Assistant', desc: 'Augmentation, not replacement.' },
        { title: 'Ready Foundation', desc: 'Framework for data-driven hiring.' },
      ].map((item, i) => (
        <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 text-left">
          <p className="font-bold text-blue-900 mb-1">{item.title}</p>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
      <p className="text-gray-500">Any questions or discussion points?</p>
    </div>
  </SlideWrapper>
);

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const totalSlides = 12;

  const notes = [
    "Hello everyone. Today I'll present our data mining project analyzing recruitment data for Algeria Poste. We built predictive models to assist HR decision-making.",
    "Algeria Poste receives thousands of applications. Manual screening is time-consuming. Our goal was to build a model that predicts HR decisions, helping focus human review on borderline cases.",
    "Our data showed fairly balanced decisions. Most candidates had 8 months experience, and soft skills like teamwork were most common— surprisingly more than technical skills.",
    "Real-world data is messy! We found four different date formats and skills separated by commas, semicolons, and slashes. Cleaning this was crucial for accurate modeling.",
    "We didn't just use raw data—we created smarter features. For example, we combined education level and field into a single 'Education Score' that better predicts success.",
    "We tested four algorithms. While SVM had slightly higher accuracy, Random Forest had the best F1-score—crucial for balanced prediction across all three decision classes.",
    "We chose Random Forest not just for accuracy, but because it tells us WHY it makes decisions—via feature importance scores HR can understand and act upon.",
    "Here's our most actionable insight: Location matters most! HR should check for geographic bias. Also, skill diversity beats deep expertise in specific areas.",
    "The model isn't meant to replace HR—it's an assistant. It handles clear cases quickly so humans can focus their expertise on borderline candidates.",
    "With more data—especially interview scores—we could build a much stronger model. This is a foundation to build upon, not a final solution.",
    "We built a complete, reusable pipeline. New candidates can be scored automatically, with confidence levels to guide HR review priority.",
    "In conclusion, we've built a working predictive system that reveals important hiring patterns and provides a tool to make Algeria Poste's recruitment more efficient and potentially fairer. Thank you. Any questions?"
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevSlide();
      if (e.key === 'n') setShowNotes(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slides = [
    <Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, 
    <Slide6 />, <Slide7 />, <Slide8 />, <Slide9 />, <Slide10 />, 
    <Slide11 />, <Slide12 />
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 font-['Inter'] selection:bg-blue-100">
      <div className="w-full max-w-6xl aspect-[16/10] relative flex flex-col group">
        
        {/* Navigation Overlays */}
        <div className="absolute inset-y-0 -left-16 hidden lg:flex items-center">
          <button 
            onClick={prevSlide}
            className="p-3 bg-white shadow-lg rounded-full hover:bg-blue-50 text-blue-600 transition-all active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 -right-16 hidden lg:flex items-center">
          <button 
            onClick={nextSlide}
            className="p-3 bg-white shadow-lg rounded-full hover:bg-blue-50 text-blue-600 transition-all active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Display */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Bar */}
        <div className="mt-6 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
              {String(currentSlide + 1).padStart(2, '0')} / {totalSlides}
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={prevSlide}
                className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                showNotes ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-100 hover:bg-gray-50'
              }`}
            >
              <MessageSquare size={16} />
              Notes
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-600 shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">
              <Maximize size={16} />
              Full
            </button>
          </div>
        </div>

        {/* Progress bar at the bottom of the slide area */}
        <div className="absolute top-[calc(100%-4px)] left-0 w-full px-8 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-blue-600"
               animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
             />
           </div>
        </div>

        {/* Notes Drawer */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="bg-blue-900 text-blue-100 p-6 rounded-3xl shadow-xl">
                <div className="flex items-center gap-2 mb-2 text-yellow-400">
                  <MessageSquare size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Speaker Notes</span>
                </div>
                <p className="text-lg leading-relaxed italic">
                  "{notes[currentSlide]}"
                </p>
                <div className="mt-4 flex gap-4 text-[10px] text-blue-400 font-medium uppercase tracking-widest">
                  <span>Press 'n' to toggle</span>
                  <span>Press Space/Arrows to navigate</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
