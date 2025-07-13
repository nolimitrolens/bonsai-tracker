import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';

const initialForm = {
  tree: 'Bloodgood',
  title: '',
  dueDate: '',
  recurrence: { freq: 'weekly', interval: 1 },
  notes: ''
};

export default function TaskDashboard() {
  const [form, setForm] = useState(initialForm);
  const { tasks, addTask, updateTask, removeTask } = useTasks(form.tree);

  const handleSubmit = async e => {
    e.preventDefault();
    const due = new Date(form.dueDate);
    await addTask({ ...form, dueDate: due, createdAt: new Date() });
    setForm(initialForm);
    alert('Task added 🚨');
  };

  return (
    <div className="bg-darkAccent rounded-2xl p-4">
      <h2 className="text-2xl mb-4">Task Scheduler</h2>
      <form className="space-y-2 mb-4" onSubmit={handleSubmit}>
        <select
          value={form.tree}
          onChange={e => setForm({ ...form, tree: e.target.value })}
          className="p-2 rounded bg-darkest"
        >
          <option>Bloodgood</option>
          <option>Japanese Black Pine</option>
        </select>
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="p-2 rounded w-full bg-darkest"
        />
        <input
          type="datetime-local"
          value={form.dueDate}
          onChange={e => setForm({ ...form, dueDate: e.target.value })}
          className="p-2 rounded w-full bg-darkest"
        />
        <div className="flex gap-2">
          <select
            value={form.recurrence.freq}
            onChange={e => setForm({ ...form, recurrence: { ...form.recurrence, freq: e.target.value } })}
            className="p-2 rounded bg-darkest"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            type="number"
            min="1"
            value={form.recurrence.interval}
            onChange={e => setForm({ ...form, recurrence: { ...form.recurrence, interval: parseInt(e.target.value) } })}
            className="p-2 rounded w-16 bg-darkest"
          />
        </div>
        <textarea
          placeholder="Notes (e.g., feed 3-1-2 organic)"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
          className="p-2 rounded w-full bg-darkest"
        />
        <button type="submit" className="px-4 py-2 rounded bg-medAccent text-darkest">
          Add Task
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="bg-darkest p-2 rounded flex justify-between items-center">
            <div>
              <strong>{t.title}</strong> <br />
              <small>{new Date(t.dueDate.seconds * 1000).toLocaleString()}</small>
            </div>
            <button onClick={() => removeTask(t.id)} className="px-2 py-1 rounded bg-alertRed">
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}