const OpenAI = require("langchain/llms/openai");
//import { LLMChain } from "langchain/chains";
//const RetrievalQAChain = require("langchain/retrieval_qa");
const DataberryRetriever = require("langchain/retrievers/databerry");

// Initialize the OpenAI model
const model = new OpenAI({ temperature: 0,  maxConcurrency: 5 });

// import { RetrievalQAChain } from "langchain/chains";
// import { DataberryVectorStore } from "langchain/retrievers/vectorstore";
//import { StuffDocumentsChain } from "langchain/chains";

const retriever = new DataberryVectorStore({
  host: "https://app.databerry.ai/datastores/clgchaqrg000iji08j56xvt8f",
  //apiKey: "your-api-key",
  //indexName: "your-index-name",
}).error((err) => {console.log(err)});
//const qa = new StuffDocumentsChain();
// const chain = new RetrievalQAChain({ retriever: retriever, qa: qa });

const chain = RetrievalQAChain.fromLLM(model, retriever);


const res = chain.call({ question: "how can i gain weight" });
console.log(res);

