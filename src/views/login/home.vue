<template>
    <div>
        <div class="tabs">
            <router-link :to="{name: 'login'}" class="tab">登录</router-link>
            <router-link :to="{name: 'regist'}" class="tab">注册</router-link>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name:"home"
}
</script>
<style scoped>
.tabs{
    float:center;
}
.tab{
    margin-right: 10px;
    margin-left: 10px;
}
</style>