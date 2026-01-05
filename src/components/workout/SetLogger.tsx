import { useState } from 'react';
import { Button } from '../ui/Button';
import { SetLog } from '../../types';
import { Plus, Minus } from 'lucide-react';
import './SetLogger.css';

interface SetLoggerProps {
  setNumber: number;
  previousSet?: SetLog;
  onLogSet: (weight: number, reps: number) => void;
}

export function SetLogger({ setNumber, previousSet, onLogSet }: SetLoggerProps) {
  const [weight, setWeight] = useState(previousSet?.weight || 0);
  const [reps, setReps] = useState(previousSet?.reps || 0);

  const handleSubmit = () => {
    if (weight > 0 && reps > 0) {
      onLogSet(weight, reps);
      // Keep the same values for next set
    }
  };

  const adjustWeight = (amount: number) => {
    setWeight(Math.max(0, weight + amount));
  };

  const adjustReps = (amount: number) => {
    setReps(Math.max(0, reps + amount));
  };

  return (
    <div className="set-logger">
      <div className="set-logger__title">
        Log Set {setNumber}
      </div>

      <div className="set-logger__inputs">
        {/* Weight Input */}
        <div className="set-logger__input-group">
          <label className="set-logger__label">
            Weight (lbs)
          </label>
          <div className="set-logger__controls">
            <button
              onClick={() => adjustWeight(-5)}
              className="set-logger__button"
              aria-label="Decrease weight"
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || 0)}
              className="set-logger__input"
              aria-label="Weight"
            />
            <button
              onClick={() => adjustWeight(5)}
              className="set-logger__button"
              aria-label="Increase weight"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Reps Input */}
        <div className="set-logger__input-group">
          <label className="set-logger__label">
            Reps
          </label>
          <div className="set-logger__controls">
            <button
              onClick={() => adjustReps(-1)}
              className="set-logger__button"
              aria-label="Decrease reps"
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value) || 0)}
              className="set-logger__input"
              aria-label="Reps"
            />
            <button
              onClick={() => adjustReps(1)}
              className="set-logger__button"
              aria-label="Increase reps"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={weight === 0 || reps === 0} size="lg" style={{ width: '100%' }}>
        Complete Set
      </Button>

      {previousSet && (
        <div className="set-logger__previous">
          Previous: {previousSet.weight} lbs × {previousSet.reps} reps
        </div>
      )}
    </div>
  );
}
