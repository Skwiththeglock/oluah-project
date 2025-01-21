import { Button } from '@/components/ui/button'

import { ExternalLink } from '@/components/external-link'
import { IconArrowRight, IconSparkles } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading:
      'What are the best textbooks for learning algorithms and data structures?',
    message:
      'What are the best textbooks for learning algorithms and data structures?'
  },
  {
    heading: 'Can you recommend books on operating systems?',
    message: 'Can you recommend books on operating systems?'
  },
  {
    heading:
      'What is a good textbook for learning about artificial intelligence?',
    message:
      'What is a good textbook for learning about artificial intelligence?'
  },
  {
    heading:
      'Are there any textbooks that focus on computer networks and protocols?',
    message:
      'Are there any textbooks that focus on computer networks and protocols?'
  }
]

export function EmptyScreen({
  submitMessage
}: {
  submitMessage: (message: string) => void
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 mt-12">
      <div className="rounded-md bg-background p-8 dark:border-none border border-foreground-muted  mb-4 w-full justify-center flex flex-col items-center">
        {/* <h1 className="mb-2 text-lg font-semibold">Welcome Weather AI</h1> */}
        <span className="text-2xl flex items-center my-5">
          {/* <span className="text-lg font-semibold">Weather</span> */}
          Book recommendation System
          <IconSparkles className="inline mr-0 ml-0.5 w-4 sm:w-5 mb-1" />
        </span>
        <p className="mb-2 leading-normal text-muted-foreground text-center">
          An AI book recommendation system that helps you discover the
          appropriate from a collection of over 2500 computer science textbooks.
          Explore suggestions by topic, expertise level, programming language,
          or your learning goals.{' '}
        </p>

        <div className="mt-4 flex flex-col items-start space-y-2 mb-4 justify-start">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
