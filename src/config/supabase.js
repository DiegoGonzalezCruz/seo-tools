import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { createClient } from '@supabase/supabase-js'
import { OpenAIEmbeddings } from '@langchain/openai'

// console.log("Supabase client START *****");
const openAIApiKey = process.env.OPENAI_API_KEY
if (!openAIApiKey) throw new Error(`Expected SUPABASE_SERVICE_ROLE_KEY`)

const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!sbUrl) throw new Error(`Expected SUPABASE_SERVICE_ROLE_URL`)

const sbApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!sbApiKey) throw new Error(`Expected SUPABASE_SERVICE_ROLE_KEY`)
// console.log(openAIApiKey, "openAIApiKey");
// console.log(sbUrl, "sbUrl");
// console.log(sbApiKey, "sbApiKey");

export const client = createClient(sbUrl, sbApiKey)
// console.log("Supabase client START *****");
// console.log(client);
// console.log("Supabase client END *****");

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: openAIApiKey,
  batchSize: 512,
  modelName: 'text-embedding-3-small',
})
// console.log(embeddings, "embeddings");

// export const vectorStore = new SupabaseVectorStore(embeddings, {
//   client,
//   tableName: "thinkey_docs",
//   queryName: "match_documents",
// });
// export const vectorStore = await MemoryVectorStore.fromDocuments(
//   docs,
//   embeddings
// );

export const createEmbeddingsFromDocuments = async (docs) => {
  try {
    // const res = await SupabaseVectorStore.fromDocuments(docs, embeddings, {
    const res = await MemoryVectorStore.fromDocuments(docs, embeddings)
    // console.log(res, "embeddings created successfully 🫡");
    return res
  } catch (error) {
    console.error('Error creating embeddings:', error)
    throw error
  }
}

// console.log("vector Store START *****");
// console.log(createEmbeddingsFromDocuments);
// console.log("vector Store END *****");
