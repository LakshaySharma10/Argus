from flask import Flask, request, jsonify
import os
import random
from langchain_groq import ChatGroq
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import ConversationChain
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables
load_dotenv()
groq_api_key = os.environ['GROQ_API_KEY']

# Initialize the language model
llm = ChatGroq(groq_api_key=groq_api_key, model_name="llama-3.1-70b-versatile")

# Create a conversation memory
memory = ConversationBufferMemory()

# Create a prompt template
prompt = ChatPromptTemplate.from_template(
    """
    You are a mental health assistant for warehouse workers. Your goal is to provide support, ask relevant questions, and offer helpful advice. Be empathetic and professional in your responses. When responding to a topic, ask a follow-up question to encourage further discussion.

    Current conversation:
    {history}

    Human: {input}
    AI Assistant:
    """
)

# Create a conversation chain
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    prompt=prompt
)

# Random pre-prompt messages
pre_prompts = [
    "How can I assist you today?",
    "How was your day?",
    "Is there something on your mind you'd like to share?",
    "What can I do to support you today?",
    "How are you feeling right now?"
]

# Function to analyze the conversation
def analyze_conversation(user_input, ai_response):
    analysis_prompt = ChatPromptTemplate.from_template(
        """
        Analyze the following conversation between a user and an AI mental health assistant for warehouse workers. Provide insights on the user's mental state, potential issues, and the effectiveness of the AI's response. Keep the analysis concise and in a consistent format.

        User: {user_input}
        AI: {ai_response}

        Analysis:
        """
    )
    
    analysis = llm.predict(analysis_prompt.format(user_input=user_input, ai_response=ai_response))
    return analysis

# Store for conversation analysis
conversation_analysis = []

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Get the AI response
    response = conversation.predict(input=user_input)
    
    # Analyze the conversation
    analysis = analyze_conversation(user_input, response)
    conversation_analysis.append(analysis)
    
    return jsonify({"response": response})

@app.route('/start', methods=['GET'])
def start():
    # Return a random pre-prompt message
    random_pre_prompt = random.choice(pre_prompts)
    return jsonify({"message": random_pre_prompt})

@app.route('/analysis', methods=['GET'])
def get_analysis():
    # This route is for demonstration purposes only
    # In a real application, you would secure this route
    return jsonify({"analysis": conversation_analysis})

if __name__ == '__main__':
    app.run(debug=True)