import AnchorView from './anchorScroll/anchorView'
import AnchorScroll from './anchorScroll/anchorScroll'
import TriggerView from './anchorScroll/triggerView'
const dl = {}
dl.install= function(Vue){
  Vue.component(AnchorView.name,AnchorView)
  Vue.component(AnchorScroll.name,AnchorScroll)
  Vue.component(TriggerView.name,TriggerView)
}
export default dl
