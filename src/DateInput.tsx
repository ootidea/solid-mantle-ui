import { createSignal, Show } from 'solid-js'
import css from './DateInput.scss'
import { DatePicker } from './DatePicker'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import calendarIcon from './image/calendar.svg'
import closeCircleIcon from './image/close-circle.svg'
import { Modal } from './Modal'
import { joinClasses, prepareProps, Props, SlotProp } from './utility/props'
import { registerCss } from './utility/registerCss'
import { Slot } from './utility/Slot'

registerCss(css)

export type DateInputProps = Props<{
  value?: Date | undefined
  placeholder?: string
  disabled?: boolean | ((date: Date) => boolean)
  showClearButton?: boolean
  onChangeValue?: ((value: Date | undefined) => void) | undefined
  format?: SlotProp<{ value: Date | undefined }>
}>

export function DateInput(rawProps: DateInputProps) {
  const [props, restProps] = prepareProps(rawProps, { disabled: false, showClearButton: false }, [
    'value',
    'placeholder',
    'onChangeValue',
    'format',
  ])
  const [value, setValue] = createSignal<Date | undefined>(props.value)
  function changeValue(newValue: Date | undefined) {
    setValue(newValue)
    props.onChangeValue?.(newValue)
  }

  const dummyDate = new Date(9999, 11, 29, 23, 59, 59, 999)

  return (
    <Modal
      launcher={({ toggle }) => (
        <button
          class={joinClasses(props, 'mantle-ui-DateInput_launcher')}
          type="button"
          disabled={props.disabled === true}
          onClick={(event) => {
            if (event.defaultPrevented) return

            event.preventDefault()
            toggle()
          }}
          {...restProps}
        >
          <div class="mantle-ui-DateInput_preview-area">
            <Show when={value() !== undefined}>
              <div class="mantle-ui-DateInput_format">
                <Slot content={props.format} params={{ value: value() }}>
                  {value()!.toLocaleDateString()}
                </Slot>
              </div>
            </Show>
            <div
              class="mantle-ui-DateInput_placeholder"
              classList={{ 'mantle-ui-DateInput_invisible': value() !== undefined }}
            >
              {props.placeholder}
            </div>
            <div class="mantle-ui-DateInput_format mantle-ui-DateInput_invisible">
              {/* Intended to be the maximum rendering width */}
              <Slot content={props.format} params={{ value: dummyDate }}>
                {dummyDate.toLocaleDateString()}
              </Slot>
            </div>
          </div>
          <Show when={props.showClearButton}>
            <IconButton
              class="mantle-ui-DateInput_clear-button"
              src={closeCircleIcon}
              size="1.6em"
              iconSize="1.25em"
              iconColor="var(--mantle-ui-clear-button-icon-default-color)"
              aria-hidden={value() === undefined}
              onClick={() => changeValue(undefined)}
            />
          </Show>
          <Icon class="mantle-ui-DateInput_icon" src={calendarIcon} size="1.3em" />
        </button>
      )}
    >
      {({ toggle }) => (
        <DatePicker
          class="mantle-ui-DateInput_date-picker"
          value={value()}
          disabled={props.disabled instanceof Function ? props.disabled : undefined}
          onChangeValue={(value) => {
            toggle()
            changeValue(value)
          }}
        />
      )}
    </Modal>
  )
}
