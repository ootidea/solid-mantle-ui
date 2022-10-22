import { createEffect, createSignal, For, Show } from "solid-js";
import { Portal } from "solid-js/web";
import chevronDownIcon from "./chevron-down.svg";
import { Divider } from "./Divider";
import { Icon } from "./Icon";
import { Scrollable } from "./Scrollable";
import css from "./Select.scss";
import { TextInput } from "./TextInput";
import { call, setupFocusTrap } from "./utility/others";
import { joinClasses, prepareProps, SkelProps } from "./utility/props";
import { registerCss } from "./utility/registerCss";

registerCss(css);

export type SelectProps<T extends string> = SkelProps<{
  values: readonly T[];
  titles?: Partial<Record<T, string>>;
  selected?: T | undefined;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  showSearchBox?: boolean;
  onChangeSelected?: (selected: T | undefined) => void;
}>;

export function Select<T extends string>(rawProps: SelectProps<T>) {
  const [props, restProps] = prepareProps(
    rawProps,
    {
      titles: {},
      placeholder: "",
      disabled: false,
      fullWidth: false,
      showSearchBox: false,
    },
    ["values", "selected", "onChangeSelected"],
  );

  function getText(value: T): string {
    return props.titles?.[value] ?? value;
  }

  const [selected, setSelected] = createSignal(props.selected);
  createEffect(() => setSelected(() => props.selected));
  function changeSelected(selected: T | undefined) {
    setSelected(() => selected);
    props.onChangeSelected?.(selected);
  }

  const [searchQuery, setSearchQuery] = createSignal("");
  function search(values: readonly T[]): readonly T[] {
    const searchWords = searchQuery().split(/[ 　]/);
    return values.filter((value) => {
      const lowerCaseText = getText(value).toLowerCase();
      return searchWords.every((word) => lowerCaseText.includes(word.toLowerCase()));
    });
  }

  type DropdownInfo = { leftPx: number; topPx: number; widthPx: number; maxHeightPx: number };
  const [dropdownInfo, setDropdownInfo] = createSignal<DropdownInfo | undefined>(undefined, {
    equals: false,
  });
  function onClickLauncher(event: MouseEvent) {
    if (event.currentTarget instanceof HTMLElement) {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownInfo({
        leftPx: rect.left,
        topPx: rect.bottom,
        widthPx: rect.width,
        maxHeightPx: window.innerHeight - rect.bottom,
      });
    }
  }

  function onClickBackdrop(event: MouseEvent) {
    if (event.target !== event.currentTarget) return;

    setDropdownInfo(undefined);
  }

  return (
    <>
      <button
        class={joinClasses(rawProps, "skel-Select_launcher", {
          "skel-Select_disabled": props.disabled,
          "skel-Select_opened": dropdownInfo() !== undefined,
          "skel-Select_full-width": props.fullWidth,
        })}
        type="button"
        disabled={props.disabled}
        onClick={onClickLauncher}
        {...restProps}
      >
        <div class="skel-Select_preview-area">
          {call(() => {
            const previewValue = selected();
            return (
              <>
                {previewValue !== undefined ? (
                  <div class="skel-Select_preview">{getText(previewValue)} </div>
                ) : null}
                <div
                  class="skel-Select_placeholder"
                  classList={{ "skel-Select_invisible": previewValue !== undefined }}
                >
                  {props.placeholder}
                </div>
                <div class="skel-Select_invisible">
                  <For each={props.values}>
                    {(value) => <div class="skel-Select_preview">{getText(value)}</div>}
                  </For>
                </div>
              </>
            );
          })}
        </div>
        <Icon class="skel-Select_icon" src={chevronDownIcon} />
      </button>
      <Show when={dropdownInfo()}>
        {(dropdownInfo) => (
          <Portal>
            <div
              class="skel-Select_backdrop"
              ref={(element) => setupFocusTrap(element)}
              onClick={onClickBackdrop}
            >
              <div
                class="skel-Select_dropdown"
                style={{
                  "--skel-Select_dropdown-left": `${dropdownInfo.leftPx}px`,
                  "--skel-Select_dropdown-top": `${dropdownInfo.topPx}px`,
                  "--skel-Select_dropdown-width": `${dropdownInfo.widthPx}px`,
                  "--skel-Select_dropdown-max-height": `${dropdownInfo.maxHeightPx}px`,
                }}
              >
                <Show when={props.showSearchBox}>
                  <div class="skel-Select_search-box-area">
                    <TextInput
                      class="skel-Select_search-box"
                      placeholder="search"
                      value={searchQuery()}
                      onChangeValue={setSearchQuery}
                    />
                  </div>
                </Show>
                <Scrollable>
                  {/* TODO: implement empty state */}
                  <For each={search(props.values)}>
                    {(value, i) => (
                      <>
                        <Show when={i() > 0}>
                          <Divider />
                        </Show>
                        <button
                          class="skel-Select_option"
                          classList={{ "skel-Select_selected": selected() === value }}
                          type="button"
                          onClick={() => {
                            changeSelected(value);
                            setDropdownInfo(undefined);
                          }}
                        >
                          {getText(value)}
                        </button>
                      </>
                    )}
                  </For>
                </Scrollable>
              </div>
            </div>
          </Portal>
        )}
      </Show>
    </>
  );
}