"# guanggu_smart_traffic" 

#### 项目介绍


#### 项目历程
- 前几天未记录
- 4/22
  - 大部分完成工作在项目踩雷部分展示出来了
  - 调整头部flex布局相关样式，登录后的按钮样式
  - 完善AddEvent.vue部分

#### 项目踩雷
 - 4/22日,在完善MyEvent.vue文件时，也就是头部部分对应的我的事件这一组件，我想根据用户登录时保存在userLoginData数据找到用户的id，忘记了要在挂载前就请求数据，导致一直获取的是undefined。     还有就是获取对应id的用户上报的事件时，由于初始封装的接口(getAllUserEvents)不完备，由于我只需要传入userId，没有传入其它参数的必要，导致一直请求报错，对应的文件是在src/request/eventHttp.js。
