import { config } from "dotenv";
config();

import { SequentialChain, LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new OpenAI({ temperature: 0 });

let template =
  "You were curious about {curiosity}, relating to the {aspect} aspect of the Raikes School. Ask a question: ";
let promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["curiosity", "aspect"],
});
const curiosityChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "curiosity",
});

template = "Given that question: {curiosity}, write a follow-up comment: ";
promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["curiosity"],
});
const commentChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "comment",
});

template = "Summarise the curiosity in one short sentence: \n\n {curiosity}";
promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["curiosity"],
});
const summaryChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "summary",
});

template = "Translate the summary to Vietnamese: \n\n {summary}";
promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["summary"],
});
const translationChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "vietnamese_translation",
});

const overallChain = new SequentialChain({
  chains: [curiosityChain, commentChain, summaryChain, translationChain],
  inputVariables: ["curiosity", "aspect"],
  outputVariables: ["curiosity", "comment", "summary", "vietnamese_translation"],
});

const result = await overallChain.call({
  curiosity: "How do you pay for room and board?",
  aspect: "Financial aid is confusing!",
});
console.log(result);
