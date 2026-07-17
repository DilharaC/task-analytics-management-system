import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Task, TaskPriority } from '../../types/task.types';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (input: any) => Promise<void>;
  onCancel: () => void;
}

const fieldLabel = 'text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-[#6B7280]';
const fieldInput =
  'px-3 py-2 rounded-md border border-[#E2E4E9] bg-white text-sm text-[#12151C] focus:outline-none focus:border-[#2454A6] transition-colors';

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [dueDate, setDueDate] = useState(initialTask?.due_date?.slice(0, 10) ?? '');
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'medium');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({ title, description, due_date: dueDate || undefined, priority });
      onCancel();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save task');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-[#12151C]/40 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md border border-[#E2E4E9] p-6 w-full max-w-md flex flex-col gap-4"
      >
        <div className="border-b border-[#E2E4E9] pb-3">
          <h2 className="text-lg font-bold text-[#12151C]">{initialTask ? 'Edit Task' : 'New Task'}</h2>
        </div>

        {error && (
          <p className="text-sm text-[#B5482E] bg-[#B5482E]/5 border border-[#B5482E]/20 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <label className={fieldLabel}>Title</label>
          <input className={fieldInput} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={fieldLabel}>Description</label>
          <textarea
            className={fieldInput}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={fieldLabel}>Due Date</label>
          <input
            type="date"
            className={`${fieldInput} font-mono tabular-nums`}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={fieldLabel}>Priority</label>
          <select className={fieldInput} value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-2 justify-end mt-2 pt-3 border-t border-[#E2E4E9]">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-[#12151C] px-4 py-2 rounded-md border border-[#E2E4E9] hover:bg-[#F5F6F8] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="text-sm font-medium text-white px-4 py-2 rounded-md bg-[#2454A6] hover:bg-[#1d4483] disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}