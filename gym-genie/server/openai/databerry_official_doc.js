import { DataberryRetriever } from "langchain/retrievers/databerry";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {RetrievalQAChain} from "langchain/chains";
//conversational chain

const run = async () => {
  const retriever = new DataberryRetriever({
    datastoreUrl: "https://api.databerry.ai/query/clgchaqrg000iji08j56xvt8f",
    apiKey: "c2e85376-f959-4e13-b13f-cae6be2c208c", // optional: needed for private datastores
    topK: 3, // optional: default value is 3
  });
  const model = new ChatOpenAI({
    temperature: 0.9,
    openAIApiKey: "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", //process.env.OPENAI_API_KEY
  }); 
  // const docs = retriever.getRelevantDocuments("Gym Genie").then(error=>{console.log(error)});
  const chain = RetrievalQAChain.fromLLM(model, retriever);
  const res = await chain.call({
    query: "how can i gain weight for a 21 year old that weighs 65kgs with fast metabolism and low appetite height: 1,80m",
  });
  console.log(res.data.messages[0].content);
};
run();

//https://js.langchain.com/docs/modules/agents/tools/