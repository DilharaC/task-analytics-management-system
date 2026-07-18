import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import type { TaskFilters as TaskFiltersType } from '../hooks/useTasks';

import { TaskList } from '../components/tasks/TaskList';
import { TaskFilters } from '../components/tasks/TaskFilters';
import { TaskForm } from '../components/tasks/TaskForm';
import type { Task } from '../types/task.types';
import { Header } from '../components/layout/Header';

export function TasksPage() {
  const [filters, setFilters] = useState<TaskFiltersType>({ page: 1, limit: 12 });
  const { tasks, total, loading, error, createTask, updateTask, deleteTask } = useTasks(filters);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  function openCreate() {
    setEditingTask(undefined);
    setShowForm(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setShowForm(true);
  }

  async function handleSubmit(input: any) {
    if (editingTask) {
      await updateTask(editingTask.id, input);
    } else {
      await createTask(input);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this task?')) {
      await deleteTask(id);
    }
  }

  const totalPages = Math.ceil(total / (filters.limit ?? 12));

  return (
    <>
      <Header title="Tasks" subtitle="Manage and track all your tasks" />

      <main className="p-8 flex flex-col gap-5 bg-[#F5F6F8] h-full overflow-y-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-[#12151C]">All Tasks</h1>
            <p className="text-xs text-[#6B7280] mt-0.5 font-mono tabular-nums">{total} total</p>
          </div>
          <button
            onClick={openCreate}
            className="text-sm font-medium text-white px-4 py-2 rounded-md bg-[#2454A6] hover:bg-[#1d4483] transition-colors"
          >
            + New Task
          </button>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        {error && (
          <p className="text-sm text-[#B5482E] bg-[#B5482E]/5 border border-[#B5482E]/20 px-3 py-2 rounded-md">
            {error}
          </p>
        )}

        {loading ? (
          <div className="rounded-md border border-[#E2E4E9] bg-white p-20 flex flex-col items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2454A6] animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#6B7280]">Loading tasks…</p>
          </div>
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onEdit={openEdit}
              onDelete={handleDelete}
              onStatusChange={(id, status) => updateTask(id, { status: status as any })}
            />
            {totalPages > 1 && (
              <div className="flex justify-center gap-1.5 mt-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilters({ ...filters, page: p })}
                    className={`w-8 h-8 rounded-md text-xs font-mono font-medium tabular-nums transition-colors ${
                      filters.page === p
                        ? 'bg-[#2454A6] text-white'
                        : 'bg-white text-[#12151C] border border-[#E2E4E9] hover:bg-[#F5F6F8]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {showForm && (
          <TaskForm initialTask={editingTask} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        )}
      </main>
    </>
  );
}