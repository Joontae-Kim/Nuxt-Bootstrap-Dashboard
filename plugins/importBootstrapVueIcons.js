import Vue from 'vue'
import {
  BIcon,
  BIconstack,
  BIconArrowBarLeft,
  BIconArrowBarRight,
  BIconArrowClockwise,
  BIconArrowLeftSquare,
  BIconBellFill,
  BIconCash,
  BIconCashStack,
  BIconCalendarCheck,
  BIconCheckCircle,
  BIconChevronDown,
  BIconChevronUp,
  BIconCircleFill,
  BIconClipboardCheck,
  BIconClockHistory,
  BIconCreditCardFill,
  BIconEyeFill,
  BIconEnvelopeFill,
  BIconFilter,
  BIconGearWideConnected,
  BIconHouseDoorFill,
  BIconInfoCircle,
  BIconLayoutThreeColumns,
  BIconList,
  BIconPencilFill,
  BIconPencilSquare,
  BIconPeopleFill,
  BIconPersonCheckFill,
  BIconPersonPlusFill,
  BIconPlusCircleFill,
  BIconTools,
  BIconTrash
} from 'bootstrap-vue'

Vue.component('BIcon', BIcon)
Vue.component('BIconstack', BIconstack)

const icons = {
  BIconArrowBarLeft,
  BIconArrowBarRight,
  BIconArrowClockwise,
  BIconArrowLeftSquare,
  BIconBellFill,
  BIconCalendarCheck,
  BIconCash,
  BIconCashStack,
  BIconCheckCircle,
  BIconChevronDown,
  BIconChevronUp,
  BIconCircleFill,
  BIconClipboardCheck,
  BIconClockHistory,
  BIconCreditCardFill,
  BIconEyeFill,
  BIconEnvelopeFill,
  BIconFilter,
  BIconGearWideConnected,
  BIconHouseDoorFill,
  BIconInfoCircle,
  BIconLayoutThreeColumns,
  BIconList,
  BIconPencilFill,
  BIconPencilSquare,
  BIconPeopleFill,
  BIconPersonCheckFill,
  BIconPersonPlusFill,
  BIconPlusCircleFill,
  BIconTools,
  BIconTrash
}

for (const [iconName, iconComponent] of Object.entries(icons)) {
  Vue.component(iconName, iconComponent)
}
