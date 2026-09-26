import type { Metadata } from "next";
import { MazeGame } from "@/components/awareness/maze-game";

export const metadata: Metadata = {
  title: "Voting Maze Game | Election Commission of Pakistan",
  description: "Find the way and cast your vote in this interactive ECP voting maze game. Learn the critical steps from leaving home to casting your ballot.",
};

export default function MazePage() {
  return <MazeGame />;
}
