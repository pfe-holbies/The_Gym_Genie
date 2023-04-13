import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib"; // best performance i believe
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import * as fs from "fs";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

require('dotenv').config();


/*const chat = new ChatOpenAI({ temperature: 0,  maxConcurrency: 5 , openAIApiKey: "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", m}); //process.env.OPENAI_API_KEY
// The most you could ever get charged for one call using Davinci-003 is roughly $0.08 as that is the max tokens (~4,000)
response = await chat.call([
    new SystemChatMessage(
      "You are a helpful assistant that translates English to French."
    ),
    new HumanChatMessage("Translate: I love programming."),
  ]);*/
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("No OpenAI API key found in environment variable OPENAI_API_KEY");
  }

  const knwoledgeBasepath = './src/document_loaders/example_data/example';

  if(process.env.FILE_COUNT != fs.readdirSync(directoryPath).length) {
  const loader = new DirectoryLoader(
    knwoledgeBasepath,
    {
      ".json": (path) => new JSONLoader(path, "/texts"),
      ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
      ".txt": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path, "text"),
    }
  );
  }

  const docs = await loader.load();
  const vector_store_path = "./vector_store.hnswlib";
  
  export const run = async () => {
    /* Initialize the LLM to use to answer the question */
    const model = new OpenAI({ temperature: 0,  maxConcurrency: 5 , openAIApiKey: process.env.OPENAI_API_KEY, maxTokens: 2000});;
    /* Load in the files we want to do question answering over */
    docs = await loader.load();
    /* Initialize the vector store if it doesn't exists*/
    if(fs.existsSync(vector_store_path)) {
      vectorStore = await HNSWLib.load(vector_store_path);
    } else {
    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
    vectorStore = await vectorStore.save(vector_store_path);
    }
    /* Save the vector store */
    const chain = new ConversationalRetrievalQAChain(model, vectorStore.asRetriever());
    //RetrievalQAChain
    // multiple questions o chatgpt ????
    const response = await chain.call({
      query: ''
    });
    console.log(response.text);
  };

// too many options !!!! awsome !!!!!
// https://js.langchain.com/docs/modules/chains/index_related_chains/document_qa