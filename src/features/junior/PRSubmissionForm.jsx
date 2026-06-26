import { useState } from 'react';
import { useRole } from '../../context/RoleContext';
import { usePRs } from '../../context/PRContext';
import Card, { CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { GitPullRequest, Link } from 'lucide-react';
import './PRSubmissionForm.css';

export default function PRSubmissionForm() {
  const { currentUser } = useRole();
  const { seniors, addPR } = usePRs();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [reviewerId, setReviewerId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableSeniors = seniors.filter(s =>
    s.status === 'available' && s.id !== currentUser?.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !reviewerId) return;
    const reviewer = seniors.find(s => s.id === reviewerId);
    addPR(title.trim(), url.trim(), currentUser, reviewer);
    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setUrl('');
      setReviewerId('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <Card className="pr-form">
      <CardHeader>
        <h3>
          <GitPullRequest size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: '-2px' }} />
          Submit PR for Review
        </h3>
      </CardHeader>

      <form className="pr-form__body" onSubmit={handleSubmit}>
        <div className="pr-form__field">
          <label className="pr-form__label">PR Title</label>
          <div className="pr-form__input-wrap">
            <GitPullRequest size={16} className="pr-form__input-icon" />
            <input
              type="text"
              className="pr-form__input"
              placeholder="Fix authentication token refresh logic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="pr-form__field">
          <label className="pr-form__label">PR URL</label>
          <div className="pr-form__input-wrap">
            <Link size={16} className="pr-form__input-icon" />
            <input
              type="url"
              className="pr-form__input"
              placeholder="https://github.com/org/repo/pull/123"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="pr-form__field">
          <label className="pr-form__label">Assign Reviewer</label>
          <select
            className="pr-form__input pr-form__select"
            value={reviewerId}
            onChange={(e) => setReviewerId(e.target.value)}
          >
            <option value="">Select a reviewer...</option>
            {availableSeniors.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
            {availableSeniors.length === 0 && (
              <option disabled>No reviewers available</option>
            )}
          </select>
        </div>

        <Button
          variant="secondary"
          size="lg"
          type="submit"
          disabled={!title.trim() || !url.trim() || !reviewerId}
          className="pr-form__submit"
        >
          {submitted ? 'Submitted!' : 'Submit for Review'}
        </Button>
      </form>
    </Card>
  );
}
