<template>
    <div id="layout-config" :class="containerClass">
        <div class="layout-config-content">
            <a href="#" class="layout-config-button" id="layout-config-button" @click="toggleConfigurator">
                <i class="pi pi-cog"></i>
            </a>
            <a href="#" class="layout-config-close" @click="hideConfigurator">
                <i class="pi pi-times"></i>
            </a>
            <TabView>
                <TabPanel header="Menu">
                    <h1>Menu Modes</h1>
                    <div class="panel-items">
                        <div class="panel-item">
                            <a href="#" @click="changeLayout($event, 'static')">
                                <img src="/assets/layout/images/configurator/menu/roma-static.png" alt="roma">
                                <i class="pi pi-check" v-if="layoutMode === 'static'"></i>
                            </a>
                            <span>Static</span>
                        </div>
                        <div class="panel-item">
                            <a href="#" @click="changeLayout($event, 'overlay')">
                                <img src="/assets/layout/images/configurator/menu/roma-overlay.png" alt="roma">
                                <i class="pi pi-check" v-if="layoutMode === 'overlay'"></i>
                            </a>
                            <span>Overlay</span>
                        </div>
                        <div class="panel-item">
                            <a href="#" @click="changeLayout($event, 'horizontal')">
                                <img src="/assets/layout/images/configurator/menu/roma-horizontal.png" alt="roma">
                                <i class="pi pi-check" v-if="layoutMode === 'horizontal'"></i>
                            </a>
                            <span>Horizontal</span>
                        </div>
                        <div class="panel-item">
                            <a href="#" @click="changeLayout($event, 'slim')">
                                <img src="/assets/layout/images/configurator/menu/roma-slim.png" alt="roma">
                                <i class="pi pi-check" v-if="layoutMode === 'slim'"></i>
                            </a>
                            <span>Slim</span>
                        </div>
                    </div>

                    <h1>Menu Colors</h1>
                    <div class="panel-items">
                        <div class="panel-item">
                            <a href="#" @click="changeMenuColor($event, false)">
                                <img src="/assets/layout/images/configurator/menu/roma-dark.png" alt="roma">
                                <i class="pi pi-check" v-if="lightMenu === false"></i>
                            </a>
                            <span>Dark</span>
                        </div>
                        <div class="panel-item">
                            <a href="#" @click="changeMenuColor($event, true)">
                                <img src="/assets/layout/images/configurator/menu/roma-static.png" alt="roma">
                                <i class="pi pi-check" v-if="lightMenu === true"></i>
                            </a>
                            <span>Light</span>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel header="User Profile">
                    <div class="panel-items">
                        <div class="panel-item">
                            <a href="#" :class="{'p-disabled':layoutMode === 'horizontal'}" @click="changeProfileMode($event, true)">
                                <img src="/assets/layout/images/configurator/menu/roma-inline.png" alt="roma">
                                <i class="pi pi-check" v-if="inlineUser === true"></i>
                            </a>
                            <span>Inline</span>
                        </div>
                        <div class="panel-item">
                            <a href="#" :class="{'p-disabled':layoutMode === 'horizontal'}" @click="changeProfileMode($event, false)">
                                <img src="/assets/layout/images/configurator/menu/roma-popup.png" alt="roma">
                                <i class="pi pi-check" v-if="inlineUser === false"></i>
                            </a>
                            <span>Overlay</span>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel header="Orientation">
                    <div class="panel-items">
                        <div class="panel-item">
                            <a href="#" @click="changeOrientation($event, false)">
                                <img src="/assets/layout/images/configurator/menu/roma-rtl.png" alt="roma">
                                <i class="pi pi-check" v-if="isRTL === false"></i>
                            </a>
                            <span>LTR</span>
                        </div>
                        <div class="panel-item">
                            <a href="#" @click="changeOrientation($event, true)">
                                <img src="/assets/layout/images/configurator/menu/roma-static.png" alt="roma">
                                <i class="pi pi-check" v-if="isRTL === true"></i>
                            </a>
                            <span>RTL</span>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel header="Topbar">
                    <div class="panel-items">
                        <div class="panel-item colors" v-for="t of topbarColors" :key="t.name">
                            <a href="#" @click="changeTopbarColor($event, t.topbarColor, t.logo)" class="layout-config-option">
                                <img :src="'/assets/layout/images/configurator/topbar/' + t.image" :alt="t.name">
                                <i class="pi pi-check" v-if="topbarColor === t.topbarColor"></i>
                            </a>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel header="Themes">
                    <div class="panel-items">
                        <div class="panel-item colors" v-for="t of themes" :key="t.name">
                            <a href="#" @click="changeTheme($event, t.file)" class="layout-config-option">
                                <img :src="'/assets/layout/images/configurator/themes/' + t.image" :alt="t.name">
                                <i class="pi pi-check" v-if="theme === t.file"></i>
                            </a>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        layoutMode: {
            type: String,
            default: null
        },
        lightMenu: {
            type: Boolean,
            default: null
        },
        inlineUser: {
            type: Boolean,
            default: null
        },
        isRTL: {
            type: Boolean,
            default: null
        },
        topbarColor: {
            type: String,
            default: null
        },
        topbarColors: {
            type: Array,
            default: null
        },
        theme: {
            type: String,
            default: null
        },
        themes: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            active: false
        }
    },
    watch: {
        $route() {
            if (this.active) {
                this.active = false;
                this.unbindOutsideClickListener();
            }
        }
    },
    outsideClickListener: null,
    methods: {
        toggleConfigurator(event) {
            this.active = !this.active;
            event.preventDefault();

            if (this.active)
                this.bindOutsideClickListener();
            else
                this.unbindOutsideClickListener();
        },
        hideConfigurator(event) {
            this.active = false;
            this.unbindOutsideClickListener();
            event.preventDefault();
        },
        changeLayout(event, layoutMode) {
            this.$emit('layout-change', layoutMode);
            event.preventDefault();
        },
        changeMenuColor(event, menuColor) {
            this.$emit('menu-color-change', menuColor);
            event.preventDefault();
        },
        changeProfileMode(event, profileMode) {
            this.$emit('profile-mode-change', profileMode);
            event.preventDefault();
        },
        changeOrientation(event, orientation) {
            this.$emit('orientation-change', orientation);
            event.preventDefault();
        },
        changeTopbarColor(event, topbarColor, logo) {
            this.$emit('topbar-color-change', topbarColor, logo);
            event.preventDefault();
        },
        changeTheme(event, theme) {
            this.$emit('theme-change', theme);
            event.preventDefault();
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.active && this.isOutsideClicked(event)) {
                        this.active = false;
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        isOutsideClicked(event) {
            return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target));
        }
    },
    computed: {
        containerClass() {
            return ['layout-config', {'layout-config-active': this.active}];
        }
    }
}
</script>
