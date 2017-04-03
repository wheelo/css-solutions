# Flex
1. [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
2. [react-native 之布局篇](https://github.com/tmallfe/tmallfe.github.io/issues/19)
3. [Almost complete guide to flexbox (without flexbox)](https://kyusuf.com/post/almost-complete-guide-to-flexbox-without-flexbox)

```
<style>
    .grid {
        border: .125rem solid;
        text-align: justify;
        font-size: 0;
        padding: 4% 4% 0 4%
    }

    .box {
        font-size: 1rem;
        display: inline-block;
        background: #eee;
        border: .125em solid;
        width: 30%;
        padding: 2%
    }

    /* All but the last 3 boxes */
    .box:nth-last-child(n+5) {
        margin-bottom: 4%
    }

    .break {
        display: inline-block;
        width: 30%;
        height: 0
    }
</style>

<div class="grid">
    <div class="box">Column</div>
    <div class="box">Column</div>
    <div class="box">Column</div>
    <div class="box">Column</div>
    <div class="box">Column</div>
    <div class="box">Column</div>
    <div class="break"></div>
</div>
```
