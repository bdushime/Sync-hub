import { useState } from 'react';
import Card, { CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { GitPullRequest, Link, Send } from 'lucide-react';
import './PRSubmissionForm.css';

export default function PRSubmissionForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    onSubmit?.({ title, url });
    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setUrl('');
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

        <Button
          variant="secondary"
          size="lg"
          icon={<Send size={16} />}
          type="submit"
          disabled={!title.trim() || !url.trim()}
          className="pr-form__submit"
        >
          {submitted ? 'Submitted!' : 'Submit for Review'}
        </Button>
      </form>
    </Card>
  );
}
