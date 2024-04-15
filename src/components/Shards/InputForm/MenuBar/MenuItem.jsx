/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */
import './MenuItem.css'

import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default ({
  icon, title, action, isActive = null,
}) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <svg className="remix">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg>
  </button>
)