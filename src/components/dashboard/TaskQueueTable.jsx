'use client';

import React, { useState } from 'react';
import { Workflow, CheckCircle2, Clock, Loader2, Filter, PriorityHigh, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function TaskQueueTable({ tasks: initialTasks }) {
  const [filter, setFilter] = useState('ALL');
  const [tasks, setTasks] = useState(initialTasks);

  const filteredTasks = filter === 'ALL'
    ? tasks
    : tasks.filter(t => t.status.toUpperCase() === filter);

  return (
    <Card hover={false} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white font-mono">
            Async Asynchronous Task & Batch Queue
          </h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-[#090A0F] p-1 rounded-lg border border-zinc-800">
          {['ALL', 'PROCESSING', 'PENDING', 'COMPLETED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px] bg-[#090A0F]">
              <th className="py-3 px-4">Task ID & Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status & Progress</th>
              <th className="py-3 px-4">Submitter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {filteredTasks.map((task) => {
              const isProcessing = task.status === 'Processing';
              const isCompleted = task.status === 'Completed';
              const isPending = task.status === 'Pending';

              return (
                <tr key={task.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{task.name}</span>
                    <span className="text-[10px] text-zinc-400">{task.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-[10px]">
                      {task.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold ${
                      task.priority === 'CRITICAL' ? 'text-red-400' :
                      task.priority === 'HIGH' ? 'text-amber-400' : 'text-zinc-400'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {isProcessing && <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />}
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {isPending && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                      <span className={`font-semibold ${
                        isProcessing ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {task.status} ({task.progress}%)
                      </span>
                    </div>
                    {isProcessing && (
                      <div className="w-24 h-1 rounded-full bg-zinc-800 mt-1 overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${task.progress}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-zinc-400 text-[11px]">
                    {task.submittedBy}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
