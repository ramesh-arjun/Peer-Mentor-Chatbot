import { config } from "dotenv";
config();

import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";

process.env.LANGCHAIN_HANDLER = "langchain";
const model = new ChatOpenAI({ temperature: 0 });
const tools = [new Calculator()];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "chat-conversational-react-description",
  verbose: true,
});

const input0 = "What is the average cohort size?";

const result0 = await executor.call({ input: input0 });
console.log(result0);

const input1 = "What coding language do freshmen use at the Raikes School?";

const result1 = await executor.call({ input: input1 });
console.log(result1);
