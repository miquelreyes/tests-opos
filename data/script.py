import json
import os
import re

def parse_questions(file_path):
    """Parses a question file and returns a list of question dictionaries."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    raw_questions = re.split(r'\n\n+', content.strip())
    questions = []

    for raw_question in raw_questions:
        lines = raw_question.strip().split('\n')
        question_text = lines[0]
        options = []

        for option in lines[1:]:
            match = re.match(r'([a-dA-D])\)(.*)', option)
            if match:
                options.append(match.group(2).strip())

        questions.append({"question": question_text, "options": options})

    return questions

def parse_answers(file_path):
    """Parses the answers file and returns a list of answers."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read().strip().split('\n')

def map_answers_to_questions(questions, answers, start_index):
    """Maps answers to questions, converting to 0-indexed values."""
    mapped_questions = []
    for i, question in enumerate(questions):
        correct_answer = answers[start_index + i] if start_index + i < len(answers) else "-"
        correct_index = "ABCD".find(correct_answer.upper())  # Convert A-D to 0-3 index
        mapped_questions.append({
            "question": question["question"],
            "options": question["options"],
            "answer": correct_index if correct_index != -1 else -1
        })
    return mapped_questions

def main():
    topics_count = 15
    answers = parse_answers('respuestas.txt')
    
    all_topics = {}
    answer_index = 0  # Track the position in the answer list

    for i in range(1, topics_count + 1):
        file_name = f"tema{i}.txt"
        if os.path.exists(file_name):
            questions = parse_questions(file_name)
            mapped_questions = map_answers_to_questions(questions, answers, answer_index)
            all_topics[f"tema{i}"] = mapped_questions
            answer_index += len(questions)  # Move answer index forward

    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(all_topics, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    main()
