## BFC 块级格式化上下文

有以下特点：

1. 在垂直方向上一个接一个的放置元素

2. Box垂直方向上的距离由margin决定，如果在同一个BFC内两个Box的margin会发生重叠。

3. BFC的区域不会与float box重叠

4. BFC 就是页面上一个独立的容器，容器里的元素不会影响到容器外的元素

5. 计算BFC的高度的时候，浮动元素也会计算在内

触发条件：

1. 根元素

2. 浮动（float的值不是none）

3. 绝对定位元素（absolute或fixed）

4. 非块级元素具有display：inline-block，table-cell, table-caption, flex, inline-flex

5. 块级元素由overflow，且值不是visible

作用：

* 清除浮动

``` html
<div class="wrap">
    <section></section>
</div>
```

``` css
.wrap {
    overflow: hidden;
}

section {
    float: left;
    height: 200px;
}
```

* 自适应两栏布局

* 防止margin合并
