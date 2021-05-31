页面实现的关键点有三个：

1. 如何设计vue组件中的数据结构，用最少的dom结构实现复杂的页面效果
2. 数据传递和路由设计
3. 数据库中的数据应该有哪些属性

# 公共顶部

![image-20210421204543633](/assets/mdimg/image-20210421204543633.png)

## 1. topbar

![image-20210421204931919](/assets/mdimg/image-20210421204931919.png)

### (1) geo
**dom结构**

只需要注意这里的切换城市是可以切换到另一个页面的，所以用`<nuxt-link to="/changeCity">`

**数据传递**

这里的当前城市定位，是多个页面中都会用到的，因此为了方便共享这个数据，利用vuex存储，并且在渲染的时候，利用了SSR。

> SSR渲染实现：
>
>       1. 在store/index.js里面利用了`nuxtServerInit`，
>
>       2. 在这个函数里面，请求得到位置的接口以得到当前定位。
>       3. 在Vue组件获取数据的地方用`$store`获取

**接口设计**

==获取城市定位 `/geo/getPosition`==

### (2) user

这部分的显示是动态的： 当用户登录时显示用户名，未登录时显示登录和注册

![image-20210421212730057](/assets/mdimg/image-20210421212730057.png)

**dom结构**

这种非我即他的显示原理，不难想到用`v-if`和`v-else`。

这种状态可以和数据user绑定。通过判断user是否为空，决定显示什么模板。

此外，`[退出],立即登录,注册`都是可点击链接，应该用`<nuxt-link to='/...'>`

**数据传递**

当mounted的时候，访问接口获取用户，填充user。

**接口设计**

获取用户`/users/getUser`：检查是否登录（==passsport==），如果登录了，从==session==中得到用户名并返回，否则，返回空。

### (3) nav

这部分的数据是mock的。dom设计方面，hover时显示的内容是一个dl，nav中的内容不用重复定义，只是hover的时候改变样式而已。

## 2. searchbar

![image-20210421215611289](/assets/mdimg/image-20210421215611289.png)

### (1) search

**dom设计**

效果：当搜索框里没有内容并且聚焦时，显示推荐内容；当搜索框有内容时，显示相关搜素内容。

分析：搜索框下方显示的内容取决于两个状态，一是是否聚焦，二是搜索框是否有内容。

数据绑定：数据search绑定是否有输入，focus绑定是否聚焦。那么search可以根据v-model进行双向的绑定，focus可以通过给input绑定@focus和@blur事件进行更新。

**数据**：

关键数据有两个，一个是热门推荐数据，一个是搜索结果。

热门推荐数据：通过SSR（其他方式当然也行）。在store/index.js里面的`nuxtServerInit`里请求接口`/search/hopPlace`得到，并存到store中。

搜索结果数据：需要绑定input事件，在input事件里访问接口`/search/top`。需要注意的是，这里为了控制访问次数，用了==防抖==

**接口设计**

`/search/hopPlace`：查找条件是城市和类型（默认是丽人）

`/search/top`：根据输入框内容和当前城市查找对应的内容，查找的方式是通过正则表达式

### (2) suggest

显示热门，和search中的推荐内容一样



# 切换城市页

![image-20210422202353465](/assets/mdimg/image-20210422202353465.png)

## 1. iSelect选择省份

**数据**：省份的选择结果和pvalue绑定，城市的选择根据pvalue的值决定。

当mounted的时候需要访问`/geo/province`得到所有的省份，填充到省份的下拉列表中。用watch监听pvalue，当pvalue变化的时候，请求接口`/geo/province:id`得到省份对应的市区，并填充到城市的下拉列表里。选择城市以后，触发一个事件，修改store中的当前城市。



**接口设计**

`/geo/province`：直接得到数据库中的所有省份

`/geo/province:id`：根据id从数据库中找到cities。

## 2. Hot

这个部分没有什么难点，当页面mounted的时候，请求`/geo/hotCity`得到热门城市，并存在data中，模板v-for 数据进行渲染。

## 3. Category

**dom设计**：首字母选择是一个dl，下面详细的城市又是一个dl。在首字母选择那里，为了点击跳到对应的详情，需要给每一个a标签绑定一个动态的href，对应下面每一个类的id。

**数据**：所有的数据都是在mounted的时候获得的。城市详情的数据结构设计很巧妙，它的形式为[{title: 'A', city: []}]。那么如何通过城市的首字母填充这个数据呢。通过 `'js-pinyin'`获取所有城市的拼音首字母，再根据这个首字母填充一个map：{A:[], b:[], .... Z:[]}，然后再根据这个map填充[{title: 'A', city: []}]。





# 登录/注册

## 1.注册

<img src="/assets/mdimg/image-20210423200540726.png" alt="image-20210423200540726" style="zoom: 80%;" />

输入验证用的是element-ui里的表单输入，在data中设定好rules。

### (1) 发送验证码功能

关键点有两个，一个是计时器（验证码有效期），一个是关于验证码发送。

**发送验证码**

利用nodemailer插件，利用smtp服务发送验证码`transporter.sendMail()`。如果发送成功，就把注册成功的用户名等信息存到redis中，用来验证每次请求发送验证码的时候是不是超过了一分钟（过期时间）。

**计时器**

用于验证验证码是否已经过期。当请求发送验证码的接口返回200状态码的时候，定时器开始执行，并且要记录定时器的id，以用于下次触发的时候判断定时器还在不在，在的话验证码就还没过期，不在的话，验证码就过期了，可以再发一次。

### (2) 注册功能

请求接口`user/signup`：

1. 验证是否填写了验证码；
2. 验证码是否正确（在(1)发送验证码的时候保存在redis中了，拿出来对比）；
3. 验证用户名是否在数据库中存在，

## 2. 登录

![image-20210423210745061](/assets/mdimg/image-20210423210745061.png)

请求接口`/user/signin`进行登录，注意密码要md5加密（crypto-js），利用Passport.authenticate()





# 首页

## 1. 列表和其他

<img src="/assets/mdimg/image-20210426200000502.png" alt="image-20210426200000502" style="zoom:67%;" />

关键是左边这个列表的数据结构设计，整体是一个列表`[]`，每一项是一个map，包括type，name, child。其中child又是一个列表，hover 的时候显示，child中每一个对象有title和child属性。给相应dom元素绑定@mouseenter和@entermouseover控制hover显示。

其中的menu数据是也是通过SSR渲染的（store里的nuxtServerInit()里请求接口，得到menu数据，填到vuex中），在组件中coumputed()里得到数据（因为可能会变化）。

## 2. 楼层页

<img src="/assets/mdimg/image-20210426201159999.png" alt="image-20210426201159999" style="zoom:67%;" />

显示哪一类和数据kind绑定，kind的获取通过@mouserover获得。

第二列数据需要和第一列数据对应，那么可以通过kind得到，所以所有的数据list应该是一个`{}`，里面有不同的kind对应的数据，渲染时根据list[kind]遍历就可以了。

# 产品列表页

## 1.面包屑导航

![image-20210427201730200](/assets/mdimg/image-20210427201730200.png)

**数据**

"三亚"是当前城市，已经存在了store中，直接获取即可。

"水云阁水疗养生会所"是上一个页面（首页）点击条目时，传过来的query，`ctx.query.keyword`可以获取

## 2. 分类界面（无数据）

<img src="/assets/mdimg/image-20210427202948517.png" alt="image-20210427202948517" style="zoom:67%;" />

根据面包屑导航中的关键词和城市数据请求接口`/search/resultsByKeywords`，得到所有的“分类”和“区域”，传到category子组件并渲染

该页面的dom结构比较巧妙，是两个dl， 每个dl里面有两个dt， 其余为dd循环得到。

## 3. 列表（无数据）

<img src="/assets/mdimg/image-20210427204603630.png" alt="image-20210427204603630" style="zoom: 80%;" />

数据来源：在“2.分类界面”里请求得到的数据填充list，并传给子组件。

页面的dom设计： 导航nav那是dl+dd， 下面的产品列表是ul

# 产品详情页（无数据）

## 1. 面包屑导航

![image-20210428194121407](/assets/mdimg/image-20210428194121407.png)

城市：store中的数据，景点：上一个页面传过来的keyword。

## 2. 详情

![image-20210428200707928](/assets/mdimg/image-20210428200707928.png)



根据城市，关键词，类型请求接口`/search/products` 获取产品的详细信息，返回给`详情`的子组件，并渲染。



## 3. 商家优惠和团购列表显示

这个部分会根据是否登录显示不同的样式。如果还没有登录，那么优惠和团购不可见并显示“立即登录”按钮，如果登录了就显示可用的商家优惠和团购列表。

**数据**：

将是否绑定和login数据绑定，如果login为空那就是未登录。login的获取只能在后端，所以在请求接口的时候。返回时，也顺带返回login：ctx.isAuthenticated().





# 购物车

购物车不是一开始就存在的，而是当用户点击加入购物车以后实时创建的。

## 1. 前端显示

购物车是否显示，取决于购物车是否存在，因此显示还是需要`v-if`。数据cart表示购物车，其数据结构是[{name: , price: , count: }, ... , {}]，并且根据cart数据填充前端页面。 

## 2. 接口实现



**创建购物车**

每个购物车有一个id当作唯一标识，此外，购物车数据表中还有cartNo, time, user(当前登录对象), detail(里面是商品详情：名称，价格).

**获取购物车**

这个接口是为了填充前端显示的cart数据。根据id访问接口，查找数据表。





# 订单页

![image-20210502142942147](/assets/mdimg/image-20210502142942147.png)

## 前端显示

element-ui里的`<el-tabs>`，并且通过cur数据绑定实现简介的dom设计。cur的数据结构为： `[{name:, count, total, status, statusTxt:}, ... ,{}]`，name是商品名称，count是数量，total是总价，status是该商品状态（是否已付款）。

## 接口设计

**创建订单**：

类似于购物车，每一个订单都有一个可以唯一标识的id，例外还有商品名称，价格，总价，当前登录用户，订单状态（是否付款）。

**获取订单：**

这个接口是为了填充cur数据。直接获取订单的全部信息， 获取数据的时候对数据做调整（因为cur数据和后端返回的数据结构不一样）。



# （隐藏）退出登录页

跳转到`localhost:3000/exit`的时候需要自动执行，可以用中间件，也可以用mounted()，访问`/user/exit`接口，`await ctx.logout()`
