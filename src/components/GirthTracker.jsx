import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function GirthTracker() {
  const [girth, setGirth] = useState(0);

  useEffect(() => {
    async function fetchGirth() {
      const docRef = doc(db, 'bonsai', 'girth');
      const snap = await getDoc(docRef);
      if (snap.exists()) setGirth(snap.data().value);
    }
    fetchGirth();
  }, []);

  const save = async () => {
    await setDoc(doc(db, 'bonsai', 'girth'), { value: girth });
    alert('Girth saved!');
  };

  return (
    <div className="bg-darkAccent rounded-2xl p-4">
      <h2 className="text-2xl mb-2">Trunk Girth: {girth.toFixed(1)} in</h2>
      <div className="flex gap-2">
        <input
          type="number"
          step="0.1"
          value={girth}
          onChange={e => setGirth(parseFloat(e.target.value))}
          className="p-2 rounded bg-darkest"
        />
        <button onClick={save} className="px-4 py-2 rounded bg-medAccent text-darkest">
          Save
        </button>
      </div>
    </div>
  );
}