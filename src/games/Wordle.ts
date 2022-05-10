import {words} from "@/games/EnglishWordList";

enum LetterStatus {
  Correct = "correct",
  Incorrect = "incorrect",
  Exists = "exists",
  Unchecked = "unchecked",
}

export class WordleGame {
  wordLen = 5;
  rowsLen = 7;
  currRow = 0;
  currLetter = 0;
  allowedWords: string[];
  word: string;
  rows: {
    letters: { letter: string; status: LetterStatus }[];
  }[] = Array.from({ length: this.rowsLen }, () => {
    return {
      letters: Array.from({ length: this.wordLen }, () => {
        return {
          letter: " ",
          status: LetterStatus.Unchecked,
        };
      }),
    };
  });

  constructor() {
    this.allowedWords = words.filter((w: string) => w.length == this.wordLen);
    this.word =
      this.allowedWords[Math.floor(Math.random() * this.allowedWords.length)];
  }

  checkWord() {
    if (this.currLetter != this.wordLen) {
      return;
    }

    const wordToCheck: string = this.rows[this.currRow].letters.reduce(
      (prev: string, curr) => prev + curr.letter,
      ""
    );

    if (!this.allowedWords.includes(wordToCheck)) {
      alert("No such word!");
      return;
    }

    this.rows[this.currRow].letters.forEach((field, idx) => {
      if (field.letter == this.word.charAt(idx)) {
        field.status = LetterStatus.Correct;
      } else {
        field.status = LetterStatus.Incorrect;
      }
    });

    this.currRow++;
    this.currLetter = 0;
  }

  pushLetter(letter: string) {
    if (
      this.currLetter >= this.wordLen ||
      this.currRow >= this.rowsLen ||
      letter.length != 1
    ) {
      return;
    }

    this.rows[this.currRow].letters[this.currLetter].letter =
      letter.toLowerCase();
    this.currLetter++;

    console.log(this.rows);
  }

  popLetter() {
    if (this.currLetter == 0) {
      return;
    }

    this.rows[this.currRow].letters[this.currLetter].letter = " ";
    this.currLetter--;
  }
}
