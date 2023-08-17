import { config } from "dotenv";
config();

import { SimpleSequentialChain, LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new OpenAI({ temperature: 0 });

const responseTemplate1 = `
Although you know some details about the Raikes School, you don't know everything.
If you get a question you don't know how to answer, direct those to Raikes School administration.
Based on the question, you will determine whether you are available to answer that question.

text: {input}
`;

const responseTemplate2 = `
New students often have questions that they need answered but might not feel comfortable asking initially.
Think carefully about all questions.

text: {input}
`;

const questionPromptTemplate1 = new PromptTemplate({
  template: responseTemplate1,
  inputVariables: ["input"],
});

const questionPromptTemplate2 = new PromptTemplate({
  template: responseTemplate2,
  inputVariables: ["input"],
});

const questionChain1 = new LLMChain({ llm, prompt: questionPromptTemplate1 });
const questionChain2 = new LLMChain({ llm, prompt: questionPromptTemplate2 });

const overallChain = new SimpleSequentialChain({
  chains: [questionChain1, questionChain2],
  verbose: true,
});

const result = await overallChain.run({
  input: "I am not sure how many credit hours the average freshman takes during the first semester of college.",
});

console.log(result);
