这是一个生成网格view的模块，基于[`Matrix`](https://docs.xteko.com/#/component/matrix)控件实现。

# 安装

1. 使用JSBox扫描二维码安装模块[`GridView`](https://xteko.com/redir?name=GridView&url=https%3A%2F%2Fraw.githubusercontent.com%2Fltryee%2FJSBoxModules%2Fmaster%2FGridView%2FGridView.js&icon=icon_153.png&types=3&version=1.0.0&author=ltryee)，[代码](https://github.com/ltryee/JSBoxModules/blob/master/GridView/GridView.js)
2. 在JSBox中点击左上角设置按钮->模块管理->右上角加号按钮->从脚本导入，导入上一步添加的模块文件
3. 安装Demo脚本[`GridViewDemo`](https://xteko.com/redir?name=GridViewDemo&url=https%3A%2F%2Fraw.githubusercontent.com%2Fltryee%2FJSBoxModules%2Fmaster%2FGridView%2FGridViewDemo.js&icon=icon_102.png&types=3&version=1.0.0&author=ltryee)

# 使用

1. 引入模块

    ```js
    const GridViewMaker = require('GridView')
    ```

2. 生成view

    ```js
    $ui.render({
      props: {
        debugging: false
      },
      layout: $layout.fill,
      views: [GridViewMaker('demo', {
        colunms: 2,
      }, [0, 1, 2, 3], (sender, indexPath, data) => {
        $alert(data)
      })]
    })
    ```

# 接口

```js
/**
 * 生成网格view对象
 * @param   {?String}     identifier        view的id
 * @param   {?Dictionary} options           view的配置项
 * @param   {?Number}     options.colunms   cell列数
 * @param   {?Number}     options.height    cell高度
 * @param   {?Number}     options.margin    cell间距
 * @param   {!Array}      dataList          数据
 * @param   {!Function}   didSelectCallback 点击事件回调
 * @returns {Object}      网格view对象
 */
let maker = (identifier, options, dataList, didSelectCallback) => {
   ...
}
```

* `identifier`表示view的id，在外部引用这个view的时候会用到，传入`null`将设置为默认值`matrix`。
* `options`可以按需配置，传入`null`将设置为默认值

    ```js
    {
      colunms: 1, // cell的列数
      margin: 5,  // cell的边距
      height: 40, // cell的高度
    }
    ```
    
* `dataList`表示数据，数组的元素可以是任意对象、字符串或数字，展示在cell里的内容会优先匹配对象的`name`，`title`，`id`属性，若都不存在则设置为元素自身
* `didSelectCallback`表示点击事件的回调函数，在这个函数里面处理点击相应的操作，函数带有三个参数：
    * `sender`：一般情况下是网格view自己
    * `indexPath`：就是indexPath
    * `data`：`dataList`数组里的一个元素


