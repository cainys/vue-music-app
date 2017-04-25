<template>
    <div :style="{backgroundColor:skinColor}" class="header">
        <div class="name">
            <span @click="showAsideMenu" class="func"><i class="icon-func"></i></span>
            <p>网易云</p>
            <span @click="showSearch" class="search"><i class="icon-search"></i></span>
        </div>
        <div class="tab">

        </div>
    </div>
</template>
<script>
export default{
    name: 'vHader'
}
</script>
<style lang="scss" scoped>
.header{
    background-color: #B72712;
    color:white;
    width: 100%;
    flex:1;
    .name{
        display: flex;
        justify-content: space-between;
        text-align:center;
        padding:10px 0;
        border-bottom:1px solid rgba(255,255,255,.2);
        .func{
            flex: 1;
            position:relative;
            .icon-func{
                position:absolute;
                display:inline-block;
                height:20px;
                width:20px;
                bottom:0;
                left:15px;
                background:url('./func.svg') no-repeat;
                background-size:contain;
                cursor:pointer;
            }
        }
        p{
            flex:1;
        }
        .search{
            flex:1;
            position:relative;
            .icon-search{
                position:absolute;
                width:20px;
                height:20px;
                bottom:0;
                right:15px;
                background:url('./search.svg') no-repeat;
                background-size:contain;
                display:inline-block;
                cursor:pointer;
            }
        }
    }
}
</style>
