import { useState } from 'react';
import { REVIEW_SCHEDULE } from '../../data/mockData';
import Card, { CardHeader } from '../../components/shared/Card';
import { Calendar, Clock, Plus, X } from 'lucide-react';
import './ScrumCalendar.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function ScrumCalendar({ readOnly = false }) {
  const [slots, setSlots] = useState(REVIEW_SCHEDULE);
  const [showForm, setShowForm] = useState(false);
  const [formDay, setFormDay] = useState('Monday');
  const [formLabel, setFormLabel] = useState('');
  const [formStart, setFormStart] = useState('09:00');
  const [formEnd, setFormEnd] = useState('11:00');

  const addSlot = () => {
    if (!formLabel.trim()) return;
    setSlots(prev => [...prev, {
      id: `sched-${Date.now()}`,
      day: formDay,
      startTime: formStart,
      endTime: formEnd,
      label: formLabel.trim(),
    }]);
    setFormLabel('');
    setShowForm(false);
  };

  const removeSlot = (id) => {
    setSlots(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Card className="scrum-calendar">
      <CardHeader>
        <h3>
          <Calendar size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
          Review Schedule
        </h3>
        {!readOnly && (
          <button className="scrum-calendar__add-btn" onClick={() => setShowForm(!showForm)}>
            <Plus size={16} />
            Add Block
          </button>
        )}
      </CardHeader>

      {showForm && !readOnly && (
        <div className="scrum-calendar__form">
          <div className="scrum-calendar__form-row">
            <select value={formDay} onChange={e => setFormDay(e.target.value)} className="scrum-calendar__select">
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input
              type="text"
              placeholder="Block name"
              value={formLabel}
              onChange={e => setFormLabel(e.target.value)}
              className="scrum-calendar__input"
            />
          </div>
          <div className="scrum-calendar__form-row">
            <input type="time" value={formStart} onChange={e => setFormStart(e.target.value)} className="scrum-calendar__select" />
            <span className="scrum-calendar__form-sep">to</span>
            <input type="time" value={formEnd} onChange={e => setFormEnd(e.target.value)} className="scrum-calendar__select" />
            <button className="scrum-calendar__form-submit" onClick={addSlot} disabled={!formLabel.trim()}>Add</button>
          </div>
        </div>
      )}

      <div className="scrum-calendar__slots">
        {slots.length === 0 && (
          <p className="scrum-calendar__empty">No review blocks scheduled</p>
        )}
        {slots.map((slot) => (
          <div key={slot.id} className="scrum-calendar__slot">
            <div className="scrum-calendar__slot-content">
              <div className="scrum-calendar__slot-header">
                <span className="scrum-calendar__day">{slot.day}</span>
                <span className="scrum-calendar__label">{slot.label}</span>
              </div>
              <div className="scrum-calendar__time">
                <Clock size={13} />
                <span>{slot.startTime} — {slot.endTime}</span>
              </div>
            </div>
            {!readOnly && (
              <button className="scrum-calendar__remove" onClick={() => removeSlot(slot.id)}>
                <X size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
