
import spacy
from spacy.matcher import Matcher
import json

# Load spaCy model
# Load Dutch spaCy model
nlp = spacy.load("nl_core_news_sm")
def process_user_input(user_input: str):
    # Use spaCy for natural language processing
    doc = nlp(user_input)

    # Extract entities, keywords, or any relevant information from the user input
    entities = [ent.text for ent in doc.ents]
    keywords = [token.text for token in doc if token.is_alpha]

    return entities, keywords

def chat_bot(user_input):
    knowledge_base = load_knowledge_base('knowledge_base.json')
    bot_response = ""

    entities, keywords = process_user_input(user_input)

    if 'hallo' in keywords or 'hoi' in keywords:
        bot_response = 'Bot: Hallo, hoe kan ik je helpen?'

    elif 'doei' in keywords or 'tot ziens' in keywords:
        bot_response = 'Bot: Doei, prettige dag verder.'

    elif 'greeting' in entities:
        bot_response = 'Bot: Hallo, hoe kan ik je helpen?'

    elif 'goodbye' in entities:
        bot_response = 'Bot: Doei, prettige dag verder.'

    else:
        # No specific match, check knowledge base
        best_match = find_best_match(user_input, [q["question"] for q in knowledge_base.get("questions", [])])

        if best_match:
            answer = get_answer_for_question(best_match, knowledge_base)
            if answer is not None:
                bot_response = f'Bot: {answer}'
            else:
                bot_response = 'Bot: Ik weet het antwoord niet. Kunt u mij leren?'
                new_answer = input('Type the answer or "skip" to skip: ')

                if new_answer.lower() != 'skip':
                    knowledge_base["questions"].append({"question": user_input, "answer": new_answer})
                    save_knowledge_base('knowledge_base.json', knowledge_base)
                    bot_response = 'Bot: Thank you! I learned a new response!'

        else:
            bot_response = 'Ik kan je helaas /niet helpen hiermee?'

    return bot_response


# -------------------------------------------------------------------------------------------------------------------------------
import json
from difflib import get_close_matches
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def load_knowledge_base(file_path: str) -> dict:
    try:
        with open(file_path, 'r') as file:
            knowledge_base: dict = json.load(file)
        return knowledge_base
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return {"questions": []}

def save_knowledge_base(file_path: str, data: dict):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

def find_best_match(user_question: str, questions: list[str]) -> str | None:
    matches: list = get_close_matches(user_question, questions, n=1, cutoff=0.6)
    return matches[0] if matches else None

def get_answer_for_question(question: str, knowledge_base: dict) -> str | None:
    for q in knowledge_base.get("questions", []):
        if q["question"] == question:
            return q["answer"]
    return None

# def chat_bot(user_input):
#     knowledge_base = load_knowledge_base('knowledge_base.json')
#     bot_response = ""

#     best_match = find_best_match(user_input, [q["question"] for q in knowledge_base.get("questions", [])])

#     if best_match:
#         answer = get_answer_for_question(best_match, knowledge_base)
#         print(answer)
#         if answer is not None:
#             bot_response = f'Bot: {answer}'
#         else:
#             bot_response = 'Bot: I don\'t know the answer. Can you teach me?'
#             new_answer = input('Type the answer or "skip" to skip: ')

#             if new_answer.lower() != 'skip':
#                 knowledge_base["questions"].append({"question": user_input, "answer": new_answer})
#                 save_knowledge_base('knowledge_base.json', knowledge_base)
#                 bot_response = 'Bot: Thank you! I learned a new response!'

#     else:
#         bot_response = 'Bot: I don\'t know the answer. Can you teach me?'

#     return bot_response

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_input']
    response = chat_bot(user_input)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)
