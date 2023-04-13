import os
os.environ["OPENAI_API_KEY"] = 'xxxxxxxx'

'''from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader
documents = SimpleDirectoryReader('data').load_data()
index = GPTSimpleVectorIndex.from_documents(documents)'''
from llama_index import download_loader
import os
# i prefer using the obsidian reader and indexing it regularly 
ObsidianReader = download_loader('ObsidianReader')
documents = ObsidianReader('/path/to/dir').load_data()
