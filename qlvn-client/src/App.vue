<template>
    <div :class="containerClass" @click="onWrapperClick">
        <Toast/>
        <div class="layout-top">
            <AppTopBar @menu-click="onMenuClick" @usermenu-button-click="onTopbarUserMenuButtonClick" @usermenu-click="onTopbarUserMenuClick"
                       :menuActive="menuActive" :topbarUserMenuActive="topbarUserMenuActive" :model="menu" :horizontal="horizontal" :menuHoverActive="menuHoverActive"
                       @sidebar-click="onSidebarClick" @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick" :isMobile="isMobile" />

            <div class="layout-topbar-separator"></div>

            <AppBreadcrumb></AppBreadcrumb>
        </div>

        <div class="layout-content">
            <router-view />
        </div>

        <AppConfig :topbarSize.sync="topbarSize" :topbarColor.sync="topbarColor" :menuColor.sync="menuColor" :horizontal.sync="horizontal"></AppConfig>

        <AppFooter />

        <div class="layout-mask" v-if="menuActive"></div>
    </div>
</template>

<script>
    import AppTopBar from './components/common/AppTopbar.vue';
    import AppFooter from './components/common/AppFooter.vue';
    import AppConfig from './components/common/AppConfig.vue';
    import AppBreadcrumb from './components/common/AppBreadcrumb.vue';
    import EventBus from './event-bus';

    export default {
        data() {
            return {
                horizontal: true,
                topbarSize: 'large',
                topbarColor: 'layout-topbar-blue',
                menuColor: 'layout-menu-light',
                menuActive: false,
                menuHoverActive: false,
                topbarUserMenuActive: false,
                menu : [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', to:'/'},
                    {
                        label: 'Pages', icon: 'pi pi-fw pi-clone',
                        items: [
                            {label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error'},
                            {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
                            {label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access'},
                        ]
                    }
                ]
            }
        },
        watch: {
            $route() {
                this.menuActive = false;
                this.$toast.removeAllGroups();
            }
        },
        methods: {
            onWrapperClick() {
                if (!this.menuClick) {
                    this.menuActive = false;
                    this.unblockBodyScroll();

                    if (this.horizontal) {
                        EventBus.$emit('reset_active_index');
                        this.menuHoverActive = false;
                    }
                }

                if (!this.userMenuClick) {
                    this.topbarUserMenuActive = false;
                }

                this.userMenuClick = false;
                this.menuClick = false;
            },
            blockBodyScroll() {
                let blockScrollClass = this.horizontal ? 'blocked-scroll-horizontal' : 'blocked-scroll';
                if (document.body.classList)
                    document.body.classList.add(blockScrollClass);
                else
                    document.body.className += ' ' + blockScrollClass;
            },
            unblockBodyScroll() {
                let blockScrollClass = this.horizontal ? 'blocked-scroll-horizontal' : 'blocked-scroll';
                if (document.body.classList) {
                    document.body.classList.remove(blockScrollClass);
                }
                else {
                    document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                        blockScrollClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            },
            onMenuClick(event) {
                this.menuClick = true;

                if (!this.horizontal || this.isMobile()) {
                    this.menuActive = !this.menuActive;

                    if (this.menuActive) {
                        this.blockBodyScroll();
                    }
                    else {
                        this.unblockBodyScroll();
                    }
                }

                event.preventDefault();
            },
            onTopbarUserMenuButtonClick(event) {
                this.userMenuClick = true;
                this.topbarUserMenuActive = !this.topbarUserMenuActive;

                event.preventDefault();
            },
            onTopbarUserMenuClick(event) {
                this.userMenuClick = true;

                if (event.target.nodeName === 'BUTTON' || event.target.parentNode.nodeName === 'BUTTON') {
                    this.topbarUserMenuActive = false;
                }

                event.preventDefault();
            },
            onSidebarClick() {
                this.menuClick = true;
            },
            onRootMenuItemClick(event) {
                this.menuClick = true;

                if (this.horizontal && this.isMobile()) {
                    this.menuHoverActive = event.isSameIndex ? false : true;
                }
                else {
                    this.menuHoverActive = !this.menuHoverActive;
                }
            },
            onMenuItemClick(event) {
                if (event.item && !event.item.items) {
                    if (!this.horizontal || this.isMobile()) {
                        this.menuActive = false;
                        this.unblockBodyScroll();
                    }

                    EventBus.$emit('reset_active_index');
                    this.menuHoverActive = false;
                }
            },
            isMobile() {
                return window.innerWidth <= 1024;
            }
        },
        computed: {
            containerClass() {
                return ['layout-container', {
                    'layout-menu-horizontal': this.horizontal,
                    'layout-menu-active': this.menuActive,
                    'layout-top-small': this.topbarSize === 'small',
                    'layout-top-medium': this.topbarSize === 'medium',
                    'layout-top-large': this.topbarSize === 'large',
                    'p-input-filled': this.$appState.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.ripple === false
                }, this.topbarColor, this.menuColor];
            }
        },
        components: {
            'AppTopBar': AppTopBar,
            'AppFooter': AppFooter,
            'AppConfig': AppConfig,
            'AppBreadcrumb': AppBreadcrumb
        }
    }
</script>

<style lang="scss">
    @import './App.scss';
</style>
