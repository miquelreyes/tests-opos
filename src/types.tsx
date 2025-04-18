export type TestData = {
  [topic: string]: TestQuestion[]
}

export type TestQuestion = {
  question: string
  options: string[]
  answer: number
}
