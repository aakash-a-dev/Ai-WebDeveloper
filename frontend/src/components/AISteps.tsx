import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Code2 } from 'lucide-react';
import clsx from 'clsx';

export interface Step {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  details?: string;
}

interface AIStepsProps {
  steps: Step[];
  isCollapsed: boolean;
}

export const AISteps: React.FC<AIStepsProps> = ({ steps, isCollapsed }) => {
  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isCollapsed ? '50px' : '320px',
        opacity: isCollapsed ? 0.8 : 1
      }}
      className="h-full glass border-l border-gray-700/50 overflow-y-auto"
    >
      {!isCollapsed && (
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <Code2 className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-200">Generation Progress</h2>
          </div>
          <div className="space-y-4">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className={clsx(
                  "p-4 rounded-lg border transition-colors duration-200",
                  step.status === 'completed' ? 'border-green-500/20 bg-green-500/5' :
                  step.status === 'in-progress' ? 'border-blue-500/20 bg-blue-500/5' :
                  'border-gray-700/50 bg-gray-800/30'
                )}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-200">{step.title}</span>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : step.status === 'in-progress' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    ) : null}
                  </div>
                  {step.details && (
                    <p className="text-sm text-gray-400">{step.details}</p>
                  )}
                </div>
                {step.status !== 'pending' && (
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-blue-500 to-green-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};