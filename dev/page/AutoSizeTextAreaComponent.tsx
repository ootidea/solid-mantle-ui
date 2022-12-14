import { createSignal } from 'solid-js'
import { AutoSizeTextArea } from '../../src/AutoSizeTextArea'
import { PageTitle } from '../PageTitle'
import { Sample } from '../Sample'

export function AutoSizeTextAreaComponent() {
  const [value, setValue] = createSignal('default value')

  return (
    <article>
      <PageTitle>AutoSizeTextArea</PageTitle>

      <Sample title="Basic example">
        <AutoSizeTextArea />
        <AutoSizeTextArea placeholder="placeholder" />
        <AutoSizeTextArea value="default value" />
      </Sample>

      <Sample title="Bind to signal">
        <AutoSizeTextArea value={value()} onChangeValue={setValue} />
        <div style={{ 'white-space': 'pre-wrap' }}>value() === `{value()}`</div>
      </Sample>

      <Sample title="Disabled">
        <AutoSizeTextArea placeholder="placeholder" disabled />
        <AutoSizeTextArea value="default value" disabled />
      </Sample>

      <Sample title="Error message">
        <AutoSizeTextArea placeholder="placeholder" errorMessage="Invalid value" />
        <AutoSizeTextArea value="default value" errorMessage="Error" />
      </Sample>

      <Sample title="Validation">
        <AutoSizeTextArea
          placeholder="placeholder"
          errorMessage={(value) => {
            if (value.length === 0) return 'Required'

            return
          }}
        />
        <AutoSizeTextArea
          value="Default value"
          errorMessage={(value) => {
            if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'

            return
          }}
        />
      </Sample>

      <Sample
        title="Validate initial value"
        description="If validateInitialValue option is set, it perform validation even if the user did not edit it."
      >
        <AutoSizeTextArea
          placeholder="placeholder"
          validateInitialValue
          errorMessage={(value) => {
            if (value.length === 0) return 'Required'

            return
          }}
        />
        <AutoSizeTextArea
          value="Default value"
          validateInitialValue
          errorMessage={(value) => {
            if (value.toLowerCase() !== value) return 'Uppercase letters are not allowed.'

            return
          }}
        />
      </Sample>
    </article>
  )
}
