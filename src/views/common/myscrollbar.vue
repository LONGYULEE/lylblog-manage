<template>
    <div>
        <vue-scroll :ops="ops">
            <slot></slot>
        </vue-scroll>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {
                    keepShow: true
                },
                bar: {
                    hoverStyle: true,
                    onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                    background: "#409EFF", //滚动条颜色
                    opacity: 0.5, //滚动条透明度
                    "overflow-x": "hidden"
                }
            }
        };
    },
    computed: {
        themeColor: function() {
            return this.$store.state.settings.theme;
        }
    },
    watch: {
        themeColor(n, o) {
            this.ops.bar.background = n;
        }
    },
    created() {
        this.ops.bar.background = this.$store.state.settings.theme;
    }
};
</script>

<style lang="" scoped>
</style>