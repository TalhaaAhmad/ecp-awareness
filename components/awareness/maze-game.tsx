"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, RotateCcw, Trophy, ArrowRight, Home as HomeIcon, Building2, UserCheck, FileText, Inbox } from "lucide-react";
import { ReferenceCrop } from "./reference-crop";

const milestones = [
  {
    id: 1,
    title: "1. Home — Get Your CNIC",
    icon: HomeIcon,
    coord: { x: "40%", y: "20%" },
    task: "Before leaving, ensure you have your original Computerized National Identity Card (CNIC). A photocopy is not valid for voting.",
    action: "Got CNIC & Checked 8300",
  },
  {
    id: 2,
    title: "2. Polling Station",
    icon: Building2,
    coord: { x: "72%", y: "44%" },
    task: "Reach your assigned polling station early. Check your serial number and electoral roll information with the polling agents outside if needed.",
    action: "Arrived at Polling Station",
  },
  {
    id: 3,
    title: "3. Presiding Officer — CNIC & Vote Identification",
    icon: UserCheck,
    coord: { x: "82%", y: "56%" },
    task: "Present your original CNIC to the polling officer. Your name is announced and crossed off the roll, and your thumb is marked with indelible ink.",
    action: "Identity Verified",
  },
  {
    id: 4,
    title: "4. Polling Officer — Taking Ballot Paper",
    icon: FileText,
    coord: { x: "82%", y: "67%" },
    task: "Receive your official ballot papers (green for National Assembly, white for Provincial Assembly), signed and stamped by the presiding staff.",
    action: "Received Stamped Ballot",
  },
  {
    id: 5,
    title: "5. Cast Vote — Place Ballot in Ballot Box",
    icon: Inbox,
    coord: { x: "74%", y: "81%" },
    task: "Go behind the voting screen to stamp your chosen candidate symbol in complete secrecy. Fold the paper properly and drop it into the ballot box.",
    action: "Cast Secret Ballot",
  },
  {
    id: 6,
    title: "6. Successful Vote Cast!",
    icon: CheckCircle2,
    coord: { x: "92%", y: "79%" },
    task: "Congratulations! You have exercised your democratic right and contributed to free, fair, and credible elections in Pakistan.",
    action: "Complete Journey",
  },
];

export function MazeGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  function advanceStep() {
    if (currentStep < milestones.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  }

  function resetGame() {
    setCurrentStep(0);
    setCompleted(false);
  }

  const activeMilestone = milestones[currentStep];

  return (
    <div className="reference-page maze-reference">
      <main id="main-content">
        <h1 className="sr-only">Find the Way and Cast Your Vote — ECP Maze Game</h1>

        {/* Top Header Crop from maze.jpg */}
        <ReferenceCrop
          source="maze"
          y={0}
          width={905}
          height={155}
          priority
          alt="Election Commission of Pakistan. Find the way and Cast your Vote. Your Vote, A Brighter Pakistan."
        />

        <div className="journey-game-switcher">
          <Link href="/journey" className="switcher-btn">🎮 8-Stage Voting Journey</Link>
          <span className="switcher-btn active">🧩 Play Maze Challenge</span>
        </div>

        {/* Interactive Game Stats & Progress */}
        <div className="maze-status-bar">
          <div className="maze-step-info">
            <span className="maze-badge">
              {completed ? "Completed!" : `Checkpoint ${currentStep + 1} of ${milestones.length}`}
            </span>
            <strong>{completed ? "Vote Successfully Cast! 🎉" : activeMilestone.title}</strong>
          </div>
          <div className="maze-progress-bar" role="progressbar" aria-valuenow={currentStep} aria-valuemin={0} aria-valuemax={milestones.length}>
            <span style={{ width: `${((currentStep + (completed ? 1 : 0)) / milestones.length) * 100}%` }} />
          </div>
        </div>

        {/* Maze Board Container with Interactive Overlay */}
        <div className="maze-interactive-container">
          <ReferenceCrop
            source="maze"
            y={155}
            width={905}
            height={755}
            className="maze-board-crop"
            alt="Maze showing path from Home with CNIC to Polling Station, Identification, Ballot Paper, and Ballot Box."
          />

          {/* Animated Player Marker */}
          {!completed && (
            <div
              className="maze-player-token"
              style={{
                left: activeMilestone.coord.x,
                top: activeMilestone.coord.y,
              }}
              title="Your Position in the Maze"
            >
              <div className="token-ping" />
              <div className="token-core">
                <activeMilestone.icon size={18} />
              </div>
            </div>
          )}

          {/* Milestone Checkpoint Markers */}
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              className={`maze-checkpoint-dot ${idx <= currentStep ? "visited" : ""} ${idx === currentStep && !completed ? "current" : ""}`}
              style={{ left: m.coord.x, top: m.coord.y }}
              onClick={() => {
                if (idx <= currentStep + 1) {
                  setCurrentStep(idx);
                  if (idx === milestones.length - 1) setCompleted(true);
                }
              }}
              aria-label={m.title}
              title={m.title}
            >
              <span>{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Step Guide / Interactive Prompt Card */}
        <section className="maze-action-card" aria-live="polite">
          {!completed ? (
            <>
              <div className="maze-card-header">
                <div className="maze-step-icon">
                  <activeMilestone.icon size={24} />
                </div>
                <div>
                  <span className="maze-step-number">STEP {activeMilestone.id}</span>
                  <h2>{activeMilestone.title}</h2>
                </div>
              </div>
              <p className="maze-card-desc">{activeMilestone.task}</p>
              <div className="maze-card-footer">
                <button type="button" className="maze-advance-btn" onClick={advanceStep}>
                  <span>{activeMilestone.action}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="maze-success-card">
              <Trophy size={48} className="maze-trophy-icon" />
              <h2>Congratulations, Empowered Voter!</h2>
              <p>
                You have completed the entire voting path — from confirming your CNIC at home, to identification, receiving your ballot, and casting your vote securely in the ballot box.
              </p>
              <div className="maze-success-actions">
                <button type="button" className="maze-reset-btn" onClick={resetGame}>
                  <RotateCcw size={16} />
                  <span>Play Maze Again</span>
                </button>
                <Link href="/quiz" className="maze-quiz-btn">
                  <span>Take the Voter Quiz</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Bottom Banner Crop from maze.jpg */}
        <ReferenceCrop
          source="maze"
          y={910}
          width={905}
          height={114}
          alt="Free • Fair • Credible Elections. Stronger Democracy, A Brighter Pakistan."
        />
      </main>

      <nav className="reference-nav" aria-label="More voter resources">
        <Link href="/">Back to learning</Link>
        <Link href="/journey">Voting journey</Link>
        <Link href="/quiz">Take the quiz</Link>
      </nav>
    </div>
  );
}
