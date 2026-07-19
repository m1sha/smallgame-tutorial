import { defineCustomElement } from 'vue'
import Flexbox from './components/custom/flexbox.ce.vue'
import ColoredBox from './components/custom/colored-box.ce.vue'
import EmptyLine from './components/custom/new-line.ce.vue'
import FList from './components/custom/f-list.ce.vue'
import FText from './components/custom/f-text.ce.vue'

export function regCustomComponents () {
  const regCustomComponent = (name: string, type: any)  => {
    const element = defineCustomElement(type)
    customElements.define(name, element)  
  }
  regCustomComponent ('f-panel', Flexbox)
  regCustomComponent ('f-list', FList)
  regCustomComponent ('f-text', FText)
  regCustomComponent ('colored-box', ColoredBox)
  regCustomComponent ('empty-line', EmptyLine)
}