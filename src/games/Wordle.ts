import { words } from "@/games/EnglishWordList";

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

    console.log('The word is "' + this.word + '"');
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

    let leftLetters: string = this.word;
    this.rows[this.currRow].letters.forEach((field, idx) => {
      if (field.letter == this.word.charAt(idx)) {
        field.status = LetterStatus.Correct;
        leftLetters = leftLetters.replace(field.letter, "");
      } else {
        field.status = LetterStatus.Incorrect;
      }
    });

    this.rows[this.currRow].letters.forEach((field) => {
      if (
        field.status == LetterStatus.Incorrect &&
        leftLetters.includes(field.letter)
      ) {
        field.status = LetterStatus.Exists;
        leftLetters = leftLetters.replace(field.letter, "");
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
  }

  popLetter() {
    if (this.currLetter == 0) {
      return;
    }

    this.currLetter--;
    this.rows[this.currRow].letters[this.currLetter].letter = " ";
  }
}
