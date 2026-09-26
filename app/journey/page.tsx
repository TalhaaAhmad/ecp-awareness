'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { DesignArtwork } from '@/components/awareness/design-artwork';
import styles from './journey.module.css';

type JourneyStep = {
  title: string;
  crop: readonly [number, number, number, number];
  question: string;
  summary: string;
  options: readonly string[];
  color: string;
  tint: string;
};

const steps: readonly JourneyStep[] = [
  {
    title: 'Leaving home', crop: [25, 379, 238, 167],
    question: 'Before going to vote, what should\nyou make sure you have?',
    summary: 'Bring your CNIC and voter information.',
    options: ['CNIC and voter information', 'Your driving license', 'Your school certificate'],
    color: '#006B49', tint: '#E8F6EE',
  },
  {
    title: 'Find polling station', crop: [305, 383, 236, 165],
    question: 'Where should you go to cast\nyour vote?',
    summary: 'Go to your assigned polling station.',
    options: ['Your assigned polling station', 'Government office', 'Police station'],
    color: '#1165B5', tint: '#EAF4FC',
  },
  {
    title: 'Identification', crop: [584, 380, 234, 171],
    question: 'Which document is used for\nvoter identification?',
    summary: 'Have your identity checked using your CNIC.',
    options: ['CNIC', 'Driving license', 'School ID card'],
    color: '#7134A5', tint: '#F3EDF9',
  },
  {
    title: 'Ballot paper', crop: [857, 365, 248, 191],
    question: 'What should you do after receiving\nthe ballot paper?',
    summary: 'Mark your choice correctly and privately.',
    options: ['Mark your choice correctly', 'Show it to others', 'Keep it with you'],
    color: '#CA611C', tint: '#FFF0E3',
  },
  {
    title: 'Casting your vote', crop: [25, 875, 237, 199],
    question: 'Mark your choice and place the\nballot paper in the ballot box.',
    summary: 'Place your marked ballot in the ballot box.',
    options: ['True', 'False'], color: '#B83E47', tint: '#FAECEF',
  },
  {
    title: 'Vote cast', crop: [307, 875, 233, 198],
    question: 'What matters after casting\nyour vote?',
    summary: 'Be proud of participating and stay informed.',
    options: ['Be proud and informed', 'Leave without checking', 'Tell others who you voted for'],
    color: '#007C84', tint: '#E3F3F3',
  },
  {
    title: 'The complete journey', crop: [585, 882, 230, 394],
    question: 'See how every step connects\non your way to a better tomorrow.',
    summary: 'From home to a better tomorrow.', options: [],
    color: '#4C5EAA', tint: '#EEF0FC',
  },
  {
    title: 'Congratulations!', crop: [855, 867, 250, 212],
    question: 'You have completed your\nvoting journey.',
    summary: 'An informed voter strengthens democracy.', options: [],
    color: '#7134A5', tint: '#F3EDF9',
  },
];

const stepStyle = (step: JourneyStep) => ({
  '--step-color': step.color, '--step-tint': step.tint,
}) as CSSProperties;

export default function JourneyPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [notice, setNotice] = useState('');
  const mobileCard = useRef<HTMLElement>(null);
  const desktopCards = useRef<(HTMLElement | null)[]>([]);
  const active = steps[activeStep];
  const correctCount = steps.slice(0, 6).filter((_, index) => checked[index] && answers[index] === 0).length;
  const allCorrect = correctCount === 6;

  function scrollToStage(index: number, mobile: boolean) {
    requestAnimationFrame(() => {
      const target = mobile ? mobileCard.current : desktopCards.current[index];
      target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
      target?.focus({ preventScroll: true });
    });
  }

  function resetJourney(mobile: boolean) {
    setAnswers({});
    setChecked({});
    setActiveStep(0);
    setStarted(true);
    setComplete(false);
    setNotice('');
    scrollToStage(0, mobile);
  }

  function chooseAnswer(index: number, answer: number, mobile: boolean) {
    setStarted(true);
    setComplete(false);
    setNotice('');
    setAnswers(previous => ({ ...previous, [index]: answer }));
    setChecked(previous => ({ ...previous, [index]: !mobile }));
  }

  function goToStep(index: number) {
    setActiveStep(index);
    setNotice('');
    scrollToStage(index, true);
  }

  function reviewJourney(mobile: boolean) {
    if (allCorrect) {
      setComplete(true);
      setActiveStep(7);
      setNotice('Journey complete! You answered all six learning questions correctly.');
      scrollToStage(7, mobile);
    } else {
      const next = steps.slice(0, 6).findIndex((_, index) => !checked[index] || answers[index] !== 0);
      setStarted(true);
      setActiveStep(next);
      setNotice('Follow each step and answer the six learning questions to complete your journey.');
      scrollToStage(next, mobile);
    }
  }

  function checkMobileAnswer() {
    if (activeStep >= 6) {
      if (complete) resetJourney(true);
      else reviewJourney(true);
      return;
    }
    if (checked[activeStep] && answers[activeStep] === 0) {
      goToStep(activeStep + 1);
      return;
    }
    if (answers[activeStep] === undefined) {
      setNotice('Choose an answer before continuing.');
      return;
    }
    setChecked(previous => ({ ...previous, [activeStep]: true }));
    setNotice('');
  }

  function renderOptions(index: number, mobile: boolean) {
    const step = steps[index];
    return (
      <fieldset className={mobile ? styles.mobileOptions : styles.options}>
        <legend className={styles.srOnly}>{step.question.replace('\n', ' ')}</legend>
        {step.options.map((option, optionIndex) => {
          const selected = answers[index] === optionIndex;
          const wrong = selected && checked[index] && optionIndex !== 0;
          return (
            <label key={option} className={`${styles.option} ${selected ? styles.selected : ''} ${wrong ? styles.wrong : ''}`}>
              <input
                type="radio"
                name={`${mobile ? 'mobile' : 'desktop'}-journey-step-${index + 1}`}
                value={optionIndex}
                checked={selected}
                onChange={() => chooseAnswer(index, optionIndex, mobile)}
              />
              <span className={styles.letter} aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
              <span className={styles.radio} aria-hidden="true" />
              <span>{option}</span>
            </label>
          );
        })}
      </fieldset>
    );
  }

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.desktop}>
        <DesignArtwork
          source="game" crop={[0, 0, 1125, 280]}
          alt="Your Vote, Your Journey. A voting awareness game. Learn, play, make a difference. Every vote counts!"
          className={styles.banner} priority
        />
        <section className={styles.introduction} aria-labelledby="journey-title">
          <div>
            <h1 id="journey-title">Your voting journey</h1>
            <p>Learn by playing. Follow eight steps, from your front door to the ballot box.</p>
          </div>
          <button type="button" className={styles.primaryButton} onClick={() => resetJourney(false)}>
            {started ? 'Restart journey' : 'Start journey'}
            {started ? <RotateCcw size={17} aria-hidden="true" /> : <ArrowRight size={17} aria-hidden="true" />}
          </button>
        </section>

        <section className={styles.grid} aria-label="Eight steps of your voting journey">
          {steps.map((step, index) => (
            <article
              key={step.title} style={stepStyle(step)} className={styles.card}
              ref={element => { desktopCards.current[index] = element; }}
              tabIndex={-1} aria-labelledby={`desktop-step-${index + 1}`}
            >
              <DesignArtwork source="game" crop={step.crop} alt={step.title} className={styles.cardArtwork} />
              <span className={styles.number}>{index + 1}</span>
              <h2 id={`desktop-step-${index + 1}`} className={styles.cardTitle}>{step.title}</h2>
              {index < 6 ? (
                <>
                  <p className={styles.question}>{step.question}</p>
                  {renderOptions(index, false)}
                  <p className={`${styles.cardFeedback} ${answers[index] !== 0 ? styles.errorText : ''}`} aria-live="polite">
                    {checked[index] ? (answers[index] === 0 ? 'Correct! You’re ready for this step.' : 'Not quite. Try another answer.') : ''}
                  </p>
                </>
              ) : index === 6 ? (
                <>
                  <p className={styles.reviewDescription}>{step.question}</p>
                  <button type="button" className={styles.reviewButton} onClick={() => reviewJourney(false)}>
                    {allCorrect ? 'Complete the journey' : 'Explore the journey'}
                  </button>
                </>
              ) : (
                <>
                  <p className={styles.completionDescription}>
                    {complete ? <>You have completed your<br />voting journey.</> : <>Complete every step of<br />your voting journey.</>}
                  </p>
                  <div className={styles.empowerment}>An informed voter<br />strengthens democracy.</div>
                </>
              )}
            </article>
          ))}
        </section>
        <p className={styles.desktopNotice} role="status">{notice}</p>
      </div>

      <div className={styles.mobile}>
        <section className={styles.mobileHero} aria-labelledby="mobile-journey-title">
          <span className={styles.eyebrow}>A VOTING AWARENESS GAME</span>
          <h1 id="mobile-journey-title">Your vote.<br />Your journey.</h1>
          <p>Learn. Play. Make a difference.</p>
          <span className={styles.heroCaption}>8 STEPS TO A MORE INFORMED YOU</span>
        </section>

        <div className={styles.progress}>
          <p>Step {activeStep + 1} of 8</p>
          <div className={styles.progressTrack} role="progressbar" aria-label="Current journey step" aria-valuemin={0} aria-valuemax={8} aria-valuenow={activeStep + 1}>
            <span style={{ width: `${(activeStep + 1) / 8 * 100}%` }} />
          </div>
        </div>

        <article ref={mobileCard} tabIndex={-1} style={stepStyle(active)} className={styles.activeCard} aria-labelledby="active-step-title">
          <DesignArtwork source="game" crop={active.crop} alt={active.title} className={styles.activeArtwork} priority />
          <span className={styles.stepTag}>STEP {String(activeStep + 1).padStart(2, '0')}</span>
          <h2 id="active-step-title">{activeStep === 7 && !complete ? 'Your journey awaits' : active.title}</h2>
          <p className={styles.activeQuestion}>
            {activeStep === 7 && !complete ? 'Complete the learning steps to finish your voting journey.' : active.question}
          </p>
          {activeStep < 6 ? renderOptions(activeStep, true) : (
            <div className={styles.mobileSummary}>
              {activeStep === 6 ? (
                <>
                  <strong>{correctCount} of 6 learning steps complete</strong>
                  <p>Bring your CNIC. Find your polling station. Verify your identity. Mark and cast your ballot. Stay informed.</p>
                </>
              ) : <strong>An informed voter<br />strengthens democracy.</strong>}
            </div>
          )}
        </article>

        <div className={styles.mobileActions}>
          <button type="button" className={styles.primaryButton} onClick={checkMobileAnswer}>
            {activeStep >= 6 ? (complete ? 'Play again' : allCorrect ? 'Finish journey' : 'Continue learning') : checked[activeStep] && answers[activeStep] === 0 ? 'Next step' : 'Check answer'}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
          {(notice || (activeStep < 6 && checked[activeStep])) && (
            <p className={`${styles.mobileFeedback} ${checked[activeStep] && answers[activeStep] !== 0 ? styles.errorText : ''}`} role="status">
              {notice || (answers[activeStep] === 0 ? `Correct! ${active.summary}` : `Not quite. ${active.summary} Try again.`)}
            </p>
          )}
        </div>

        <section className={styles.journeyMap} aria-labelledby="journey-map-title">
          <h2 id="journey-map-title">Your journey</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={step.title}>
                <button
                  type="button" style={stepStyle(step)}
                  className={`${styles.mapStep} ${index === activeStep ? styles.currentStep : ''}`}
                  aria-current={index === activeStep ? 'step' : undefined}
                  onClick={() => goToStep(index)}
                >
                  <DesignArtwork source="game" crop={step.crop} className={styles.mapArtwork} />
                  <span className={styles.mapNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.mapTitle}>{step.title}</span>
                  <span className={styles.mapStatus}>
                    {index === activeStep ? 'Current step' : checked[index] && answers[index] === 0 ? 'Completed' : index === 7 ? (complete ? 'Journey complete' : 'Your destination') : 'Up next'}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
