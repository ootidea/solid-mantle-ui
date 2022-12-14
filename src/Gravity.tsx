import css from './Gravity.scss'
import { EnneaPosition, toHorizontalPosition, toVerticalPosition } from './utility/position'
import { joinClasses, prepareProps, Props } from './utility/props'
import { registerCss } from './utility/registerCss'

registerCss(css)

export type GravityProps = Props<{ to?: EnneaPosition }>

export function Gravity(rawProps: GravityProps) {
  const [props, restProps] = prepareProps(rawProps, {
    to: 'center',
  })

  return (
    <div
      class={joinClasses(rawProps, 'mantle-ui-Gravity_root')}
      data-horizontal-position={toHorizontalPosition(props.to)}
      data-vertical-position={toVerticalPosition(props.to)}
      {...restProps}
    >
      <div class="mantle-ui-Gravity_cage">{rawProps.children}</div>
    </div>
  )
}
