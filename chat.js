import { config } from "dotenv";
config();

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

const chat = new ChatOpenAI({ temperature: 0 });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "This AI is designed to answer frequently asked questions about the Raikes School by prospective students. If this AI does not know the answer to the question, you may contact a current student, faculty, or staff member who can redirect you."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

const response = await chain.call({
  input: "What are the classes freshmen take in their first semester of college?",
});
const response2 = await chain.call({
  input: "What is Design Studio?",
});

console.log(response2);
