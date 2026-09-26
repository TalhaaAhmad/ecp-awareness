'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { DesignArtwork } from '@/components/awareness/design-artwork';
import styles from './quiz.module.css';

const QUESTIONS = [
  {
    title: 'Who can vote?',
    crop: [76, 575, 158, 72],
    illustration: 'Registered voters',
    options: ['Only government\nemployees', 'All registered citizens\n(18 years and above)', 'Only people with\na driving license'],
    correctAnswer: 1,
    explanation: 'Registered citizens aged 18 years and above can vote.',
    color: '#006B49',
    tint: '#E8F6EE',
  },
  {
    title: 'What documents are required?',
    crop: [72, 705, 177, 132],
    illustration: 'Computerized National Identity Card',
    options: ['CNIC (Computerized\nNational Identity Card)', 'Passport only', 'Student ID card only'],
    correctAnswer: 0,
    explanation: 'Bring your original CNIC (Computerized National Identity Card) to the polling station.',
    color: '#1165B5',
    tint: '#EAF4FC',
  },
  {
    title: 'Where do you cast your vote?',
    crop: [72, 881, 176, 123],
    illustration: 'Polling station',
    options: ['At your assigned\npolling station', 'At your school\nonly', 'At your district\nheadquarters'],
    correctAnswer: 0,
    explanation: 'Cast your vote at the polling station assigned to you.',
    color: '#7134A5',
    tint: '#F3EDF9',
  },
  {
    title: 'What happens at the polling station?',
    crop: [71, 1052, 179, 130],
    illustration: 'A voter being assisted at the polling station',
    options: ['You just show your ID\nand leave', 'You receive a ballot,\nmark it, and cast your vote', 'You fill out a form\nand go home'],
    correctAnswer: 1,
    explanation: 'After identification, receive your ballot paper, mark your choice in private, and place it in the ballot box.',
    color: '#1165B5',
    tint: '#EAF4FC',
  },
  {
    title: 'What is the purpose of the ballot paper?',
    crop: [73, 1225, 178, 123],
    illustration: 'A marked ballot paper',
    options: ['To register your name', 'To mark your preferred\ncandidate or party', 'To get a voter ID card'],
    correctAnswer: 1,
    explanation: 'Use the ballot paper to mark your preferred candidate or party.',
    color: '#7134A5',
    tint: '#F3EDF9',
  },
] as const;

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const questionElements = useRef<(HTMLElement | null)[]>([]);
  const resultElement = useRef<HTMLDivElement>(null);
  const answeredCount = Object.keys(answers).length;
  const score = QUESTIONS.reduce((total, question, index) => total + Number(answers[index] === question.correctAnswer), 0);

  function goToQuestion(index: number, focusAnswer = false) {
    setActiveQuestion(index);
    requestAnimationFrame(() => {
      const question = questionElements.current[index];
      const target = focusAnswer ? question?.querySelector<HTMLInputElement>('input') : question?.querySelector<HTMLHeadingElement>('h2');
      target?.focus({ preventScroll: true });
      question?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  function checkAnswers() {
    const missingQuestion = QUESTIONS.findIndex((_, index) => answers[index] === undefined);
    if (missingQuestion !== -1) {
      setMessage('Please answer all five questions before checking your answers.');
      goToQuestion(missingQuestion, true);
      return;
    }
    setMessage('');
    setSubmitted(true);
    requestAnimationFrame(() => resultElement.current?.focus());
  }

  function nextQuestion() {
    if (submitted) {
      goToQuestion((activeQuestion + 1) % QUESTIONS.length);
      return;
    }
    if (answers[activeQuestion] === undefined) {
      setMessage('Choose an answer to continue.');
      goToQuestion(activeQuestion, true);
      return;
    }
    setMessage('');
    if (activeQuestion === QUESTIONS.length - 1) checkAnswers();
    else goToQuestion(activeQuestion + 1);
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    setMessage('');
    goToQuestion(0);
  }

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero} aria-labelledby="quiz-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>VOTER AWARENESS QUIZ</span>
          <h1 id="quiz-title">How well do you<br />know your vote?</h1>
          <p className={styles.desktopDescription}>Answer five questions and put your knowledge to the test.</p>
          <p className={styles.mobileDescription}>Five questions to test your knowledge.</p>
        </div>
        <DesignArtwork source="quiz" crop={[531, 144, 583, 306]} alt="A young voter thinking about voting beside a ballot box" className={styles.heroArtwork} priority />
      </section>

      <section className={styles.progress} aria-label="Quiz progress">
        <div className={styles.progressCopy}>
          <span className={styles.desktopProgressTitle}>Your progress</span>
          <span className={styles.mobileProgressTitle}>Question {activeQuestion + 1} of {QUESTIONS.length}</span>
          <span className={styles.progressCount} aria-live="polite"><span className={styles.desktopCount}>{answeredCount} of {QUESTIONS.length} answered</span><span className={styles.mobileCount}>{answeredCount} answered</span></span>
        </div>
        <div className={styles.progressTrack} role="progressbar" aria-label="Questions answered" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={answeredCount}>
          <div className={styles.progressFill} style={{ '--answered-progress': `${answeredCount / QUESTIONS.length * 100}%`, '--current-progress': `${(activeQuestion + 1) / QUESTIONS.length * 100}%` } as CSSProperties} />
        </div>
        <span className={styles.questionCount}>5 QUESTIONS</span>
      </section>

      <div className={styles.questions}>
        {QUESTIONS.map((question, questionIndex) => {
          const correct = answers[questionIndex] === question.correctAnswer;
          return (
            <section
              key={question.title}
              ref={(element) => { questionElements.current[questionIndex] = element; }}
              className={`${styles.question} ${activeQuestion === questionIndex ? styles.activeQuestion : ''}`}
              aria-labelledby={`question-${questionIndex}`}
              style={{ '--question-color': question.color, '--question-tint': question.tint } as CSSProperties}
            >
              <div className={styles.illustrationPanel}>
                <DesignArtwork source="quiz" crop={question.crop} alt={question.illustration} className={styles.questionArtwork} />
                <span className={styles.number} aria-hidden="true">{questionIndex + 1}</span>
              </div>
              <div className={styles.questionBody}>
                <h2 id={`question-${questionIndex}`} tabIndex={-1}>{question.title}</h2>
                <div className={styles.options} role="radiogroup" aria-labelledby={`question-${questionIndex}`} aria-describedby={submitted ? `feedback-${questionIndex}` : undefined}>
                  {question.options.map((option, optionIndex) => {
                    const selected = answers[questionIndex] === optionIndex;
                    const correctOption = submitted && optionIndex === question.correctAnswer;
                    const wrongOption = submitted && selected && !correctOption;
                    return (
                      <label key={option} className={`${styles.option} ${selected ? styles.selected : ''} ${correctOption ? styles.correctOption : ''} ${wrongOption ? styles.wrongOption : ''}`}>
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={optionIndex}
                          checked={selected}
                          disabled={submitted}
                          onChange={() => { setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex })); setMessage(''); }}
                        />
                        <span>{option}</span>
                        {correctOption && <span className={styles.answerStatus} aria-label="Correct answer">✓</span>}
                        {wrongOption && <span className={styles.answerStatus} aria-label="Incorrect answer">×</span>}
                      </label>
                    );
                  })}
                </div>
                {submitted && <p id={`feedback-${questionIndex}`} className={`${styles.feedback} ${correct ? styles.correctFeedback : styles.incorrectFeedback}`}><strong>{correct ? 'Correct!' : 'Not quite.'}</strong> {question.explanation}</p>}
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.desktopActions}>
        {!submitted && <><p role="status" className={message ? styles.validation : undefined}>{message || 'Choose one answer for each question.'}</p><button type="button" className={styles.primaryButton} onClick={checkAnswers}>Check my answers <span aria-hidden="true">→</span></button></>}
      </div>

      <div className={styles.mobileActions}>
        <button type="button" className={styles.primaryButton} onClick={nextQuestion}>{submitted ? 'Review next question' : activeQuestion === QUESTIONS.length - 1 ? 'Check my answers' : 'Next question'} <span aria-hidden="true">→</span></button>
        <p role="status" className={message ? styles.validation : undefined}>{message || (submitted ? 'Explore each question to review your answers.' : answers[activeQuestion] === undefined ? 'Answer a question to continue.' : 'Answer selected. Continue when you’re ready.')}</p>
      </div>

      {submitted && <div className={styles.result} ref={resultElement} tabIndex={-1} role="region" aria-label="Quiz results"><div><h2>You scored {score} out of {QUESTIONS.length}</h2><p>{score === QUESTIONS.length ? 'Well done! You know your vote.' : 'Keep learning. Review the answers and try again.'}</p></div><button type="button" className={styles.primaryButton} onClick={resetQuiz}>Retake quiz <span aria-hidden="true">↻</span></button></div>}

      <nav className={styles.questionNavigation} aria-label="Question navigation">
        <h2>Your quiz</h2>
        <div>{QUESTIONS.map((_, index) => <button type="button" key={index} onClick={() => { setMessage(''); goToQuestion(index); }} className={`${activeQuestion === index ? styles.currentNavigation : ''} ${answers[index] !== undefined ? styles.answeredNavigation : ''}`} aria-label={`Question ${index + 1}${answers[index] !== undefined ? ', answered' : ', unanswered'}`} aria-current={activeQuestion === index ? 'step' : undefined}>{index + 1}</button>)}</div>
      </nav>
    </main>
  );
}
