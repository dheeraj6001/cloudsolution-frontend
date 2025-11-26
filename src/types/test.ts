// src/types/test.ts
export interface Question {
  _id: string;
  question: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  passage?: string;
}

export interface Subject {
  name: string;
  questions: Question[];
}

export interface Test {
  test_name: string;
}
