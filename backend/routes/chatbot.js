const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ChatGroq } = require('@langchain/groq');
const { BufferMemory } = require('langchain/memory');
const { PromptTemplate } = require("@langchain/core/prompts");
const { ConversationChain } = require('langchain/chains');

// Load environment variables
dotenv.config();
const groqApiKey = process.env.GROQ_API_KEY;

const app = express();
app.use(bodyParser.json());

// Initialize the language model
const llm = new ChatGroq({ groqApiKey, modelName: "llama-3.1-70b-versatile" });

// Create a conversation memory
const memory = new BufferMemory();

// Create a prompt template
const prompt = PromptTemplate.fromTemplate(
`
    You are a mental health assistant for warehouse workers. Your goal is to provide support, ask relevant questions, and offer helpful advice. Be empathetic and professional in your responses. When responding to a topic, ask a follow-up question to encourage further discussion.

    Current conversation:
    {history}

    Human: {input}
    AI Assistant:
    `
);

// Create a conversation chain
const conversation = new ConversationChain({
    llm,
    memory,
    prompt
});

// Random pre-prompt messages
const prePrompts = [
    "How can I assist you today?",
    "How was your day?",
    "Is there something on your mind you'd like to share?",
    "What can I do to support you today?",
    "How are you feeling right now?"
];

// Function to analyze the conversation
async function analyzeConversation(userInput, aiResponse) {
    const analysisPrompt = PromptTemplate.fromTemplate(`
        Analyze the following conversation between a user and an AI mental health assistant for warehouse workers. Provide insights on the user's mental state, potential issues, and the effectiveness of the AI's response. Keep the analysis concise and in a consistent format.

        User: {userInput}
        AI: {aiResponse}

        Analysis:
    `);

    const formattedPrompt = await analysisPrompt.format({ userInput, aiResponse });

    const analysis = await llm.predict(formattedPrompt);

    return analysis;
}
// Store for conversation analysis
const conversationAnalysis = [];

router.post('/chat', async (req, res) => {
    const userInput = req.body.message;

    if (!userInput) {
        return res.status(400).json({ error: "No message provided" });
    }

    // Get the AI response
    const response = await conversation.predict({ input: userInput });

    // Analyze the conversation
    const analysis = await analyzeConversation(userInput, response);
    conversationAnalysis.push(analysis);

    res.json({ response });
});

router.get('/start', (req, res) => {
    // Return a random pre-prompt message
    const randomPrePrompt = prePrompts[Math.floor(Math.random() * prePrompts.length)];
    res.json({ message: randomPrePrompt });
});

router.get('/analysis', (req, res) => {
    // This route is for demonstration purposes only
    // In a real application, you would secure this route
    res.json({ analysis: conversationAnalysis });
});

module.exports = router;