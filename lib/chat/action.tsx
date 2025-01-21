import 'server-only'
import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc'

// Components
import {
  BotCard,
  BotMessage,
  BotMessageText
} from '@/components/llm-weather/message'
import { spinner } from '@/components/llm-weather/spinner'

async function submitUserMessage(content: string) {
  'use server'
  const aiState = getMutableAIState<typeof AI>()
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content
    }
  ])
  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>
  )
  reply.update(
    <BotMessageText className="items-center" content={'Let me cook....'}>
      {spinner}
    </BotMessageText>
  )
  const generation = await GeneratePromptBasedOnQuery(content)

  reply.update(<BotMessageText content={generation} />)
  reply.done()
  aiState.done([...aiState.get(), { role: 'assistant', content: generation }])

  return {
    id: Date.now(),
    display: reply.value
  }
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

export const AI = createAI({
  actions: {
    submitUserMessage
  },
  initialUIState,
  initialAIState
})

async function GeneratePromptBasedOnQuery(query: string) {
  console.log('Generating Prompt')
  ;('use server')
  try {
    const response = await fetch(
      'https://oluah-backend.onrender.com/embedQuery',

      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ query }),
        cache: 'no-store'
      }
    )
    const embedding = await response.json()
    console.log('response: ', embedding)
    return embedding.result.rows[0]['?column?']
  } catch (error) {
    console.error('Something went wrong:', error)
    return Response.json({ message: error })
  }
}
