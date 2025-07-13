import { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function useTasks(tree) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'bonsaiTasks'),
      where('tree', '==', tree)
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });
    return unsubscribe;
  }, [tree]);

  const addTask = async task => {
    await addDoc(collection(db, 'bonsaiTasks'), task);
  };

  const updateTask = async (id, updates) => {
    const ref = doc(db, 'bonsaiTasks', id);
    await updateDoc(ref, updates);
  };

  const removeTask = async id => {
    await deleteDoc(doc(db, 'bonsaiTasks', id));
  };

  return { tasks, addTask, updateTask, removeTask };
}