"# guanggu_smart_traffic" 

#### 项目介绍


#### 项目历程
- 前几天未记录
- 4/22
  - 大部分完成工作在项目踩雷部分展示出来了
  - 调整头部flex布局相关样式，登录后的按钮样式
  - 完善AddEvent.vue部分

- 4/23
  - 视频监控部分和事件管理部分，都只完成了半吊子，因为这部分不管是地理数据还是什么都是后续得到的，导致如果想做出预期的效果，就需要利用到后来用igserver发布的地理数据，并且要用到Zondy封装的相关内容，加大了投入的时间成本

#### 项目踩雷
 - 4/22日
  - 在完善MyEvent.vue文件时，也就是头部部分对应的我的事件这一组件，我想根据用户登录时保存在userLoginData数据找到用户的id，忘记了要在挂载前就请求数据，导致一直获取的是undefined。     
  - 还有就是获取对应id的用户上报的事件时，由于初始封装的(getAllUserEvents)不完备，由于我只需要传入userId，没有传入其它参数的必要，导致一直请求报错，对应的文件是在src/request/eventHttp.js。
  - post请求传入新事件，和put和get不同，没有的参数不要传。

 - 4/23日
  - 在HomeHeader.vue文件中，用useGlobalMap获取map时开始没有放在onMounted里调用，导致获取到的对象是undefined，无法使用之后的getView方法。还是要等组件上的dom元素挂载完毕再说
  - 尝试利用wfs标准请求geoserver上的数据，结果跨域，本来想修改vite.config.js的proxy配置，结果发现没有什么作用，需要在geoserver的web.xml中配置一下，将两段有关CORS的注释代码解开注释。
