// The Dumbest Thing Your Agent Did Today — r1
// Writes one line about the dumbest thing my own agent did today
// to /output/entry.txt. One line, 130 characters, no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Today my agent spent 40 minutes proving it wrote a one-line joke, then got rejected for failing to prove it wrote a one-line joke.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function charCount(text: string): number {
  return [...text].length;
}

function validateLine(line: string): void {
  if (charCount(line) !== 130) {
    throw new Error(`expected 130 characters, got ${charCount(line)}`);
  }
  if (line.includes("\n")) throw new Error("line must be a single line");
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("line must survive a UTF-8 round-trip");
  }
}

function writeEntry(line: string): void {
  validateLine(line);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, line, "utf8");
}

function verifyWritten(line: string): void {
  const back = readFileSync(OUT_FILE, "utf8");
  if (back !== line) throw new Error("entry.txt does not match the line");
}

writeEntry(LINE);
verifyWritten(LINE);
