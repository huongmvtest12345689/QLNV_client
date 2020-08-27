<template>
    <div>
        <Toast/>
        <loading :active.sync="isLoading" loader="dots" color="#5eb814" :width="130" :height="130"
                 :is-full-page="true"></loading>
        <div class="layout-content-mask"></div>
        <div :class="containerClass" @click="onDocumentClick" v-if="!isLoading">
            <AppTopBar :topbarMenuActive="topbarMenuActive" :activeTopbarItem="activeTopbarItem" :inlineUser="inlineUser"
                       @right-menubutton-click="onRightMenuButtonClick"
                       @menubutton-click="onMenuButtonClick" @topbar-menubutton-click="onTopbarMenuButtonClick"
                       @topbar-item-click="onTopbarItemClick" @logout="doLogout"></AppTopBar>

            <AppRightMenu :rightPanelMenuActive="rightPanelMenuActive" @rightmenu-click="onRightMenuClick"></AppRightMenu>

            <transition name="layout-menu-container">
                <div class="layout-menu-container" @click="onMenuClick" v-show="isMenuVisible()">
                    <div class="menu-scroll-content">
                        <div class="layout-profile" v-if="inlineUser">
                            <button class="p-link layout-profile-button"
                                    @click="onInlineUserClick">
                                <img src="/assets/layout/images/avatar.png" alt="roma-layout"/>
                                <span class="layout-profile-userinfo">
							<span class="layout-profile-name">{{user.firstName + ' ' + user.lastName}}</span>
							<span class="layout-profile-role">Here is role</span>
						</span>
                            </button>
                            <transition name="layout-profile-menu">
                                <ul :class="['layout-profile-menu', {'profile-menu-active':inlineUserMenuActive}]"
                                    v-show="inlineUserMenuActive">
                                    <li>
                                        <button class="p-link">
                                            <i class="pi pi-fw pi-user"></i><span>Profile</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="p-link">
                                            <i class="pi pi-fw pi-cog"></i><span>Settings</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="p-link">
                                            <i class="pi pi-fw pi-envelope"></i><span>Messages</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="p-link">
                                            <i class="pi pi-fw pi-bell"></i><span>Notifications</span>
                                        </button>
                                    </li>
                                    <li role="menuitem">
                                        <button class="p-link" @click="doLogout">
                                            <i class="pi pi-fw pi-sign-out"></i>
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </transition>
                        </div>
                        <AppMenu :model="menu" :layoutMode="layoutMode" :active="menuActive"
                                 @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick"></AppMenu>
                    </div>
                </div>
            </transition>

            <div class="layout-main">
                <div class="layout-content">
                    <router-view/>
                </div>

                <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" :lightMenu="lightMenu"
                           @menu-color-change="onMenuColorChange" :inlineUser="inlineUser"
                           @profile-mode-change="onProfileModeChange" :isRTL="isRTL"
                           @orientation-change="onChangeOrientation" :topbarColor="topbarColor" :topbarColors="topbarColors"
                           @topbar-color-change="onTopbarColorChange"
                           :theme="theme" :themes="themeColors" @theme-change="onThemeChange"></AppConfig>

            </div>

            <AppFooter/>
        </div>
    </div>

</template>
<script>
    import AppTopBar from './components/common/AppTopbar.vue';
    import AppRightMenu from './components/common/AppRightMenu.vue';
    import AppMenu from './components/common/AppMenu.vue';
    import AppFooter from './components/common/AppFooter.vue';
    import EventBus from './event-bus';
    import AppConfig from "./components/common/AppConfig";
    import localStorageService from '@/services/common/localStorage.service'
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    import {mapState, mapActions} from 'vuex'
    export default {
        data() {
            return {
                isLoading: true,
                layoutMode: '',
                lightMenu: true,
                overlayMenuActive: false,
                staticMenuMobileActive: false,
                staticMenuDesktopInactive: false,
                isRTL: false,
                inlineUser: false,
                topbarMenuActive: false,
                activeTopbarItem: null,
                rightPanelMenuActive: null,
                inlineUserMenuActive: false,
                menuActive: false,
                topbarColor: '',
                topbarColors: [
                    {name: "Light", topbarColor: "layout-topbar-light", logo: "logo", image: "light.png"},
                    {name: "Dark", topbarColor: "layout-topbar-dark", logo: "logo", image: "dark.png"},
                    {name: "Blue", topbarColor: "layout-topbar-blue", logo: "logo", image: "blue.png"},
                    {name: "Green", topbarColor: "layout-topbar-green", logo: "logo", image: "green.png"},
                    {name: "Orange", topbarColor: "layout-topbar-orange", logo: "logo", image: "orange.png"},
                    {
                        name: "Magenta",
                        topbarColor: "layout-topbar-magenta",
                        logo: "logo",
                        image: "magenta.png"
                    },
                    {
                        name: "Blue Grey",
                        topbarColor: "layout-topbar-bluegrey",
                        logo: "logo",
                        image: "bluegrey.png"
                    },
                    {
                        name: "Deep Purple",
                        topbarColor: "layout-topbar-deeppurple",
                        logo: "logo",
                        image: "deeppurple.png"
                    },
                    {name: "Brown", topbarColor: "layout-topbar-brown", logo: "logo", image: "brown.png"},
                    {name: "Lime", topbarColor: "layout-topbar-lime", logo: "logo", image: "lime.png"},
                    {name: "Rose", topbarColor: "layout-topbar-rose", logo: "logo", image: "rose.png"},
                    {name: "Cyan", topbarColor: "layout-topbar-cyan", logo: "logo", image: "cyan.png"},
                    {name: "Teal", topbarColor: "layout-topbar-teal", logo: "logo", image: "teal.png"},
                    {
                        name: "Deep Orange",
                        topbarColor: "layout-topbar-deeporange",
                        logo: "logo",
                        image: "deeporange.png"
                    },
                    {name: "Indigo", topbarColor: "layout-topbar-indigo", logo: "logo", image: "indigo.png"},
                    {name: "Pink", topbarColor: "layout-topbar-pink", logo: "logo", image: "pink.png"},
                    {name: "Purple", topbarColor: "layout-topbar-purple", logo: "logo", image: "purple.png"}
                ],
                theme: '',
                themeColors: [
                    {name: "Blue", file: "blue", image: "blue.svg"},
                    {name: "Blue Grey", file: "bluegrey", image: "bluegrey.svg"},
                    {name: "Brown", file: "brown", image: "brown.svg"},
                    {name: "Cyan", file: "cyan", image: "cyan.svg"},
                    {name: "Deep Orange", file: "deeporange", image: "deeporange.svg"},
                    {name: "Deep Purple", file: "deeppurple", image: "deeppurple.svg"},
                    {name: "Green", file: "green", image: "green.svg"},
                    {name: "Teal", file: "teal", image: "teal.svg"},
                    {name: "Indigo", file: "indigo", image: "indigo.svg"},
                    {name: "Lime", file: "lime", image: "lime.svg"},
                    {name: "Magenta", file: "magenta", image: "magenta.svg"},
                    {name: "Orange", file: "orange", image: "orange.svg"},
                    {name: "Pink", file: "pink", image: "pink.svg"},
                    {name: "Purple", file: "purple", image: "purple.svg"},
                    {name: "Rose", file: "rose", image: "rose.svg"},
                ],
                menu: [
                    {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'},
                    {
                        label: 'Pages', icon: 'pi pi-fw pi-copy',
                        items: [
                            {label: 'Login', icon: 'pi pi-fw pi-clone', to: '/login'},
                            {label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', to: '/error'},
                            {label: '404', icon: 'pi pi-fw pi-times', to: '/notfound'},
                            {
                                label: 'Access Denied', icon: 'pi pi-fw pi-ban',
                                to: '/access'
                            }
                        ]
                    },
                    {
                        label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
                        items: [
                            {
                                label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {
                                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
                                        items: [
                                            {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in'},
                                            {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in'},
                                            {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in'},
                                        ]
                                    },
                                    {
                                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
                                        items: [
                                            {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in'}
                                        ]
                                    },
                                ]
                            },
                            {
                                label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    {
                                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
                                        items: [
                                            {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in'},
                                            {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in'},
                                        ]
                                    },
                                    {
                                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
                                        items: [
                                            {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in'},
                                        ]
                                    },
                                ]
                            }
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
            ...mapActions('account', ['logout']),
            onDocumentClick() {
                if (!this.topbarItemClick) {
                    this.activeTopbarItem = null;
                    this.topbarMenuActive = false;
                }

                if (!this.rightMenuClick) {
                    this.rightPanelMenuActive = false;
                }

                if (!this.userMenuClick && this.isSlim() && !this.isMobile()) {
                    this.inlineUserMenuActive = false;
                }

                if (!this.menuClick) {
                    if (this.isHorizontal() || this.isSlim()) {
                        this.menuActive = false;
                    }

                    if (this.overlayMenuActive || this.staticMenuMobileActive) {
                        this.hideOverlayMenu();
                    }

                    EventBus.$emit('reset_active_index');
                    this.unblockBodyScroll();
                }

                this.topbarItemClick = false;
                this.menuClick = false;
                this.rightMenuClick = false;
                this.userMenuClick = false;
            },
            onMenuButtonClick(event) {
                this.menuClick = true;
                this.topbarMenuActive = false;
                this.rightPanelMenuActive = false;

                if (this.layoutMode === 'overlay') {
                    this.overlayMenuActive = !this.overlayMenuActive;
                }

                if (this.isDesktop())
                    this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
                else {
                    this.staticMenuMobileActive = !this.staticMenuMobileActive;
                    if (this.staticMenuMobileActive) {
                        this.blockBodyScroll();
                    } else {
                        this.unblockBodyScroll();
                    }
                }

                event.preventDefault();
            },
            onTopbarMenuButtonClick(event) {
                this.topbarItemClick = true;
                this.topbarMenuActive = !this.topbarMenuActive;
                this.hideOverlayMenu();
                event.preventDefault();
            },
            onTopbarItemClick(event) {
                this.topbarItemClick = true;

                if (this.activeTopbarItem === event.item)
                    this.activeTopbarItem = null;
                else
                    this.activeTopbarItem = event.item;

                event.originalEvent.preventDefault();
            },
            onMenuClick() {
                this.menuClick = true;
            },
            onInlineUserClick() {
                this.userMenuClick = true;
                this.inlineUserMenuActive = !this.inlineUserMenuActive;
            },
            blockBodyScroll() {
                this.addClass(document.body, 'blocked-scroll');
            },
            unblockBodyScroll() {
                this.removeClass(document.body, 'blocked-scroll');
            },
            onRightMenuButtonClick(event) {
                this.rightMenuClick = true;
                this.rightPanelMenuActive = !this.rightPanelMenuActive;

                this.hideOverlayMenu();

                event.preventDefault();
            },
            onRightMenuClick() {
                this.rightMenuClick = true;
            },
            hideOverlayMenu() {
                this.overlayMenuActive = false;
                this.staticMenuMobileActive = false;
            },
            onMenuItemClick(event) {
                if (!event.item.items) {
                    EventBus.$emit('reset_active_index');
                    this.hideOverlayMenu();
                }
                if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
                    this.menuActive = false;
                }
            },
            onRootMenuItemClick() {
                this.menuActive = !this.menuActive;
            },
            isTablet() {
                let width = window.innerWidth;
                return width <= 1024 && width > 640;
            },
            isDesktop() {
                return window.innerWidth > 896;
            },
            isMobile() {
                return window.innerWidth <= 1025;
            },
            isStatic() {
                return this.layoutMode === 'static';
            },
            isOverlay() {
                return this.layoutMode === 'overlay';
            },
            isHorizontal() {
                return this.layoutMode === 'horizontal';
            },
            isSlim() {
                return this.layoutMode === 'slim';
            },
            isMenuVisible() {
                if (this.isDesktop()) {
                    if (this.layoutMode === 'static')
                        return !this.staticMenuDesktopInactive;
                    else if (this.layoutMode === 'overlay')
                        return this.overlayMenuActive;
                    else
                        return true;
                } else {
                    return true;
                }
            },
            onLayoutChange(layoutMode) {
                this.layoutMode = layoutMode;
                this.staticMenuDesktopInactive = false;
                this.overlayMenuActive = false;

                localStorageService.save('book-layout-mode', layoutMode, false);
                if (this.isSlim() || this.isHorizontal()) {
                    this.inlineUser = false;
                    this.inlineUserMenuActive = false;
                }
            },
            onMenuColorChange(menuColor) {
                this.lightMenu = menuColor;
                localStorageService.save('book-menu-color', menuColor, false)
            },
            onProfileModeChange(profileMode) {
                this.inlineUser = profileMode;
                localStorageService.save('book-user-profile', profileMode, false)
            },
            onChangeOrientation(orientation) {
                this.isRTL = orientation;
                localStorageService.save('book-orientation', orientation, false)
            },
            onTopbarColorChange(topbarColor, logo) {
                this.topbarColor = topbarColor;
                localStorageService.save('book-topbar-color', topbarColor, false)
                const topbarLogoLink = document.getElementById('topbar-logo');
                topbarLogoLink.src = '/assets/layout/images/' + logo + '.png';
            },
            onThemeChange(theme) {
                this.theme = theme;
                this.changeStyleSheetUrl('layout-css', theme, 'layout');
                this.changeStyleSheetUrl('theme-css', theme, 'theme');
            },
            changeStyleSheetUrl(id, value, prefix) {
                let element = document.getElementById(id);
                let urlTokens = element.getAttribute('href').split('/');
                urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
                let newURL = urlTokens.join('/');
                localStorageService.save('book-theme', value, false);
                this.replaceLink(element, newURL);
            },
            replaceLink(linkElement, href) {
                const id = linkElement.getAttribute('id');
                const cloneLinkElement = linkElement.cloneNode(true);

                cloneLinkElement.setAttribute('href', href);
                cloneLinkElement.setAttribute('id', id + '-clone');

                linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

                cloneLinkElement.addEventListener('load', () => {
                    linkElement.remove();
                    cloneLinkElement.setAttribute('id', id);
                });
            },
            addClass(element, className) {
                if (element.classList)
                    element.classList.add(className);
                else
                    element.className += ' ' + className;
            },
            removeClass(element, className) {
                if (element.classList)
                    element.classList.remove(className);
                else
                    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            },
            doLogout() {
                this.logout().then(() => {
                    this.$router.push({path: '/login'})
                })
            }
        },
        computed: {
            ...mapState('account', ['user']),
            containerClass() {
                return ['layout-wrapper', {
                    'layout-horizontal': this.layoutMode === 'horizontal',
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-slim': this.layoutMode === 'slim',
                    'layout-menu-light': this.lightMenu === true,
                    'layout-menu-dark': this.lightMenu === false,
                    'layout-overlay-active': this.overlayMenuActive,
                    'layout-mobile-active': this.staticMenuMobileActive,
                    'layout-static-inactive': this.staticMenuDesktopInactive,
                    'layout-rtl': this.isRTL
                }, this.topbarColor];
            }
        },
        components: {
            'AppTopBar': AppTopBar,
            'AppRightMenu': AppRightMenu,
            'AppMenu': AppMenu,
            'AppConfig': AppConfig,
            'AppFooter': AppFooter,
            'loading': Loading
        },
        created() {
        },
        mounted() {
            this.theme = localStorageService.get('book-theme');
            this.topbarColor = localStorageService.get('book-topbar-color');
            this.layoutMode = localStorageService.get('book-layout-mode');
            let menuColor = localStorageService.get('book-menu-color');
            let userMode = localStorageService.get('book-user-profile');
            let orientation = localStorageService.get('book-orientation');
            if (!this.theme)
                this.theme = 'blue';
            else
                this.onThemeChange(this.theme);
            if (!this.topbarColor)
                this.topbarColor = 'layout-topbar-blue';
            if(!this.layoutMode)
                this.layoutMode = 'slim';
            else this.onLayoutChange(this.layoutMode);
            if(menuColor !== undefined)
                this.lightMenu = menuColor === 'true';
            if(userMode !== undefined)
                this.inlineUser = userMode  === 'true';
            if(orientation !== undefined)
                this.isRTL = orientation  === 'true';
            setTimeout(() => { this.isLoading = false }, 1000)
        }
    }
</script>

<style lang="sass">
    @import 'App'
</style>
