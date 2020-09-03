# draglayout

> 基于vue的scroll跳转插件，代替锚点的需求

## Build Setup

``` bash

npm install vue-drag-flex

main.js
import DragLayout from 'vue-drag-flex'
Vue.use(DragLayout)


# build for production with minification
npm run build
```
npm下载  
-
> npm install vue-anchor-scroll 

main.js   
-
> import DragLayout from 'vue-drag-flex'  
Vue.use(DragLayout)

template
-
>
```
<anchor-scroll>
     <trigger-view trigger-key="xxx">
            内部与外部均可包裹元素
     </trigger-view>
     <anchor-view anchor-key="xxx">
          内部与外部均可包裹元素
     </anchor-view>
</anchor-scroll>
```
简介
-
anchor-scroll标签需要包裹trigger-view与anchor-view，只需保证trigger-key与anchor-key值一样，即可通过点击trigger-view页面滚动至anchor-view处。
目前只适用于浏览器滚动条，例如某个div的scroll是不支持的。

文档
-
anchor-scroll

|  属性   | 可选值  | 默认值 | 类型  | 说明 |
|  ----  | ----  |  ----  |  ----  |  ----  |
| animation-time  | -- | 300 | Number | 动画执行时间 |
| animation-step  | -- | 10 |Number | 动画执行间隔，切记不可设置为0 |
| animation-tips  |true，false | true |Boolean | 滚动至目标区域后是否进行闪烁提示 |

|  事件名   | 执行时机  | 返回值 | 说明 |
|  ----  | ----  |  ----  |  ----  |
| changeBefore  | 滚动执行开始前 | 滚动条位置 | -- |
| changeAfter  | 滚动执行结束后 | 滚动条位置 | -- |


trigger-view

|  属性   | 可选值  | 默认值 | 类型  | 说明 |
|  ----  | ----  |  ----  |  ----  |  ----  |
| trigger-key  | -- | -- | String | 执行跳转的依据，需要与anchor-key对应 |

trigger-view

|  属性   | 可选值  | 默认值 | 类型  | 说明 |
|  ----  | ----  |  ----  |  ----  |  ----  |
| anchor-key  | -- | -- | String | 执行跳转的依据，需要与trigger-key对应 |


slot

|  名称   | 描述  |
|  ----  | ----  | 
| slider  | 可通过插槽自定义slider样式，如不设置，则使用默认样式 | 

drag-layout-item与drag-layout可互相嵌套，形成类似表格的布局
