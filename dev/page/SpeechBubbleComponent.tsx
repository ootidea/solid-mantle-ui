import { SpeechBubble } from '../../src/SpeechBubble'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function SpeechBubbleComponent() {
  return (
    <article>
      <PageTitle>SpeechBubble</PageTitle>

      <Sample title="Basic example">
        <SpeechBubble>Sample</SpeechBubble>
      </Sample>

      <Sample title="Background color">
        <SpeechBubble backgroundColor="hsl(0 100% 95%)">Sample</SpeechBubble>
        <SpeechBubble backgroundColor="#e9ffe9">Sample</SpeechBubble>
      </Sample>

      <Sample title="Border color">
        <SpeechBubble borderColor="hsl(0 60% 60%)">Sample</SpeechBubble>
      </Sample>

      <Sample title="Border width">
        <SpeechBubble borderWidth="3px">Sample</SpeechBubble>
      </Sample>

      <Sample title="Triangle height">
        <SpeechBubble triangleHeight="0.5em">Triangle height</SpeechBubble>
        <SpeechBubble triangleHeight="1.4em">Triangle height</SpeechBubble>
        <SpeechBubble triangleHeight="3em">Triangle height</SpeechBubble>
      </Sample>

      <Sample title="Triangle angle">
        <SpeechBubble triangleAngle="20deg">Triangle angle</SpeechBubble>
        <SpeechBubble triangleAngle="2rad">Triangle angle</SpeechBubble>
        <SpeechBubble triangleAngle="0.4turn">Triangle angle</SpeechBubble>
      </Sample>

      <Sample title="Triangle x-coordinate">
        <SpeechBubble triangleX="20%">Triangle x-coordinate</SpeechBubble>
        <SpeechBubble triangleX="70%">Triangle x-coordinate</SpeechBubble>
      </Sample>

      <Sample title="Triangle skew">
        <SpeechBubble triangleSkew="0.16turn">Triangle skew</SpeechBubble>
        <SpeechBubble triangleSkew="-45deg">Triangle skew</SpeechBubble>
      </Sample>
    </article>
  )
}
