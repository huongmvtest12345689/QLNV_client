<template>
    <div class="layout-config">
            <div class="layout-config-content-wrapper">
                <a href="#" class="layout-config-button">
                    <div class="gear">
                        <div class="center"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                        <div class="tooth"></div>
                    </div>
                </a>

                <div class="layout-config-content">
                    <ColorPicker v-model="text" @input="textColor" />
                </div>
            </div>
        </div>
</template>
<script>
    export default {
        data() {
            return {
                bg: '#4e73df',
                color: '#ffffff',
                text: '',
                clData: ''
            }
        },
        methods: {
            textColor (val) {
                console.log(val)
            }
        },
        created() {},
        mounted() {
            let $ = this._$
            $('.layout-config-button').click(function () {
                $('.layout-config').toggleClass('layout-config-active')
            })
        }
    }
</script>
<style>
    .bg-gradient-primary {
        background-color: var(--bg);
        color: var(--color);
    }

    .layout-config {
        position: fixed;
        padding: 0;
        top: 0;
        right: 0;
        display: block;
        width: 550px;
        z-index: 998;
        height: 100%;
        -webkit-transition: -webkit-transform .4s cubic-bezier(.05, .74, .2, .99);
        transition: -webkit-transform .4s cubic-bezier(.05, .74, .2, .99);
        transition: transform .4s cubic-bezier(.05, .74, .2, .99);
        transition: transform .4s cubic-bezier(.05, .74, .2, .99), -webkit-transform .4s cubic-bezier(.05, .74, .2, .99);
        -webkit-transform: translateX(100%);
        transform: translateX(100%);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .layout-config.layout-config-active {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }

    .layout-config .layout-config-content-wrapper {
        position: relative;
        height: 100%;
        -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .24);
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .24);
        color: var(--text-color);
        background-color: var(--surface-f);
    }

    .layout-config .layout-config-content-wrapper .layout-config-button {
        display: flex;
        position: absolute;
        width: 52px;
        height: 52px;
        line-height: 52px;
        background-color: var(--primary-color);
        text-align: center;
        color: var(--primary-color-text);
        top: 270px;
        left: -51px;
        z-index: -1;
        overflow: hidden;
        cursor: pointer;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        -webkit-box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
    }

    .layout-config a {
        color: #2196f3;
        font-weight: 600;
    }

    .layout-config .layout-config-content-wrapper .layout-config-button i {
        font-size: 26px;
        line-height: inherit;
        cursor: pointer;
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn);
        -webkit-transition: -webkit-transform 1s;
        transition: -webkit-transform 1s;
        transition: transform 1s;
        transition: transform 1s, -webkit-transform 1s;
    }

    .pi {
        font-family: primeicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .layout-config .layout-config-close {
        position: absolute;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        right: 20px;
        top: 20px;
        z-index: 999;
        background-color: var(--primary-color);
        border-radius: 50%;
        -webkit-transition: background-color .2s, -webkit-box-shadow .2s, -webkit-transform .2s;
        transition: background-color .2s, -webkit-box-shadow .2s, -webkit-transform .2s;
        transition: background-color .2s, box-shadow .2s, transform .2s;
        transition: background-color .2s, box-shadow .2s, transform .2s, -webkit-box-shadow .2s, -webkit-transform .2s;
    }

    .layout-config a {
        color: #2196f3;
        font-weight: 600;
    }

    .layout-config .layout-config-close i {
        color: var(--primary-color-text);
        line-height: inherit;
        font-size: 14px;
    }

    .layout-config .layout-config-content {
        overflow: auto;
        height: 100%;
        padding: 2rem;
    }

    .gear {
        position: relative;
        width: 20px;
        height: 20px;
        margin: auto;
        background: #fff;
        border-radius: 50%;
        animation-name: spin;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .gear .center {
        position: absolute;
        top: 4px;
        left: 4px;
        z-index: 10;
        width: 12px;
        height: 12px;
        background: var(--primary-color);
        border-radius: 50%;
    }

    .tooth {
        position: absolute;
        top: -5px;
        left: 7px;
        z-index: 1;
        width: 6px;
        height: 30px;
        background: #fff;
    }

    .tooth:nth-child(2) {
        transform: rotate(45deg);
    }

    .tooth:nth-child(3) {
        transform: rotate(90deg);
    }

    .tooth:nth-child(4) {
        transform: rotate(135deg);
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>