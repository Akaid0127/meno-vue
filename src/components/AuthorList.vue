<template>
    <div class="rank-container">
        <div class="rank-title">创作者排行</div>
        <div class="rank-body">
            <div class="item">
                <div class="num">1</div>
                <dl class="author">
                    <dd>andy</dd>
                </dl>
                <div class="rank-ability">收获点赞量34822</div>
            </div>
            <div class="item">
                <div class="num">2</div>
                <dl class="author">
                    <dd>航空史密斯</dd>
                </dl>
                <div class="rank-ability">收获点赞量888</div>
            </div>
            <div class="item">
                <div class="num">3</div>
                <dl class="author">
                    <dd>疯狂钻石</dd>
                </dl>
                <div class="rank-ability">收获点赞量654</div>
            </div>
            <div class="item">
                <div class="num">4</div>
                <dl class="author">
                    <dd>海洋学者</dd>
                </dl>
                <div class="rank-ability">收获点赞量321</div>
            </div>
            <div class="item">
                <div class="num">5</div>
                <dl class="author">
                    <dd>福葛</dd>
                </dl>
                <div class="rank-ability">收获点赞量110</div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.rank-container {
    width: 100%;
    height: 100%;
    color: #303133;
    font-size: 14px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #dcdfe6;
}

/* 标题 */
.rank-title {
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 24px;
    color: #000;
    text-align: left;
    margin-bottom: 20px;
    padding: 30px 20px;
}

/* 内容主体 */
.rank-body {
    padding: 0 30px 20px;
    display: flex;
    flex-direction: column;
}

/* 每项样式 */
.item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    line-height: 50px;
}

/* 数字 */
.item .num {
    font-size: 20px;
    margin-right: 20px;
}

/* 作者 */
.item .author {
    display: flex;
    align-items: center;
    flex: 1;
}

/* 能力值 */
.item .rank-ability {
    color: #999;
}

.item:nth-child(1) .num {
    color: #de5149;
}

.item:nth-child(2) .num {
    color: #ef8634;
}

.item:nth-child(3) .num {
    color: #f6cb46;
}
</style>