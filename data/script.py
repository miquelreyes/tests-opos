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
            options.append(option.strip())

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

def validate_data(data):
    """Validates that the data contains 15 topics with 50 questions each having 4 options."""
    expected_topics = 15
    expected_questions_per_topic = 50
    expected_options_per_question = 4
    
    errors = []
    
    # Check number of topics
    actual_topics = len(data)
    if actual_topics != expected_topics:
        errors.append(f"Expected {expected_topics} topics, but found {actual_topics}")
    
    # Check each topic
    for topic_name, questions in data.items():
        # Check number of questions
        actual_questions = len(questions)
        if actual_questions != expected_questions_per_topic:
            errors.append(f"Topic {topic_name}: Expected {expected_questions_per_topic} questions, but found {actual_questions}")
        
        # Check each question
        for i, question in enumerate(questions):
            # Check number of options
            actual_options = len(question["options"])
            if actual_options != expected_options_per_question:
                errors.append(f"Topic {topic_name}, Question {i+1}: Expected {expected_options_per_question} options, but found {actual_options}")
            
            # Check if answer is valid
            # if question["answer"] < 0 or question["answer"] >= expected_options_per_question:
            #     errors.append(f"Topic {topic_name}, Question {i+1}: Invalid answer index {question['answer']}")
    
    return errors

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

    # Validate the data
    validation_errors = validate_data(all_topics)
    
    if validation_errors:
        print("Validation failed with the following errors:")
        for error in validation_errors:
            print(f"- {error}")
        print("Data not saved. Please fix the errors and try again.")
        sys.exit(1)
    else:
        print("Validation successful: 15 topics with 50 questions each and 4 options per question.")
        
        with open('data.json', 'w', encoding='utf-8') as f:
            json.dump(all_topics, f, indent=4, ensure_ascii=False)
        print("Data successfully saved to data.json")

if __name__ == "__main__":
    main()
