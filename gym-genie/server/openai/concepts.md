# RetrievalQAChain
>>> The RetrievalQAChain is a chain in LangChain that combines a Retriever and a QA chain to retrieve documents from a Retriever and then use a QA chain to answer a question based on the retrieved documents. You can use a Remote Retriever in a RetrievalQAChain to retrieve documents from a remote server. Here is an example usage:

import { RetrievalQAChain } from "langchain/chains";
import { VectorStore } from "langchain/retrievers/vectorstore";
import { StuffDocumentsChain } from "langchain/chains";

const retriever = new VectorStore({ host: "http://localhost:8080" });
const qa = new StuffDocumentsChain();
const chain = new RetrievalQAChain({ retriever: retriever, qa: qa });

const res = await chain.call({ question: "What is LangChain?" });
console.log(res);

# Databerry NLU
you do not need DataberryResolver to use DataberryVectorStore. DataberryResolver is used to resolve entities in text using Databerry's NLU API, while DataberryVectorStore is used to retrieve vectors from a Databerry instance. They are separate components with different purposes.

# prompt engineering 
This is a description of the inputs that the prompt expects.

question: Original question to be answered.
existing_answer: Existing answer from previous documents.
context_str: New piece of context to use to refine the existing answer.