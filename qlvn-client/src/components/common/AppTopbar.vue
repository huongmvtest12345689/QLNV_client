<template>
	<div class="layout-topbar">
		<button :class="menuButtonClass" @click="onMenuButtonClick">
			<div class="layout-menubutton-icon"></div>
		</button>
		<div class="layout-topbar-grid">
			<div class="layout-topbar-grid-column layout-topbar-grid-column-fixed">
				<button class="layout-logo p-link" @click="goDashboard">
					<span style="color: white; font-weight: bold; font-size: 24px">DSVN</span>
				</button>
			</div>
			<div class="layout-topbar-grid-column">
				<transition name="layout-menu-container">
					<AppMenu :model="model" :horizontal="horizontal" :menuHoverActive="menuHoverActive" @menuitem-click="onMenuItemClick" @root-menuitem-click="onRootMenuItemClick"
							@sidebar-click="onSidebarClick" :isMobile="isMobile"></AppMenu>
				</transition>
			</div>

			<div class="layout-topbar-grid-column layout-topbar-grid-column-fixed">
				<span class="layout-topbar-search">
					<span class="p-float-label p-input-icon-right">
						<InputText id="search" type="text" v-model="searchText" placeholder="Search"/>
						<i class="topbar-icon pi pi-search"></i>
					</span>
				</span>
			</div>

			<div class="layout-topbar-grid-column layout-topbar-grid-column-fixed">
				<button class="p-link profile-menu-button" @click="onTopbarUserMenuButtonClick">
					<img src="assets/layout/images/avatar.png" alt="Profile"/>
				</button>
				<ul :class="topbarMenuClass" @click="onTopbarUserMenuClick" role="menu">
					<li class="layout-profile-menu-search">
						<span class="md-inputfield">
							<InputText type="text" v-model="searchText"/>
							<label>Search</label>
						</span>
					</li>

					<li role="menuitem">
						<button class="p-link">
							<i class="pi pi-user"></i>
							<span>Profile</span>
						</button>
					</li>
					<li role="menuitem">
						<button class="p-link">
							<i class="pi pi-envelope"></i>
							<span>Inbox</span>
						</button>
					</li>
					<li role="menuitem">
						<button class="p-link" @click="showChangePasswordDialog = true">
							<i class="pi pi-cog"></i>
							<span>Change password</span>
						</button>
					</li>
					<li role="menuitem">
						<button class="p-link" @click="doLogout">
							<i class="pi pi-times"></i>
							<span>Logout</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
		<dialog-change-password :display="showChangePasswordDialog" @close="showChangePasswordDialog = false"/>
	</div>
</template>

<script>
import AppMenu from './AppMenu.vue';
import {mapActions, mapState} from 'vuex'
import DialogChangePassword from "../dialog/DialogChangePassword";
export default {
	data() {
		return {
			searchText: '',
			showChangePasswordDialog: false
		}
	},
	props: {
		menuActive: Boolean,
		topbarUserMenuActive: Boolean,
		model: Array,
		horizontal: Boolean,
		menuHoverActive: Boolean,
		isMobile: Function
	},
    methods: {
		...mapActions('account', ['logout']),
        onMenuButtonClick(event) {
            this.$emit('menu-click', event);
        },
		onTopbarUserMenuButtonClick(event) {
			this.$emit('usermenu-button-click', event)
		},
		onTopbarUserMenuClick(event) {
			this.$emit('usermenu-click', event)
		},
		onMenuItemClick(event) {
			this.$emit('menuitem-click', event);
		},
		onRootMenuItemClick(event) {
			this.$emit('root-menuitem-click', event);
		},
		onSidebarClick(event){
			this.$emit('sidebar-click', event);
		},
		goDashboard(){
			window.location = "/#/"
		},
		doLogout() {
			this.logout().then(() => {
				this.$router.push({path: '/login'})
			})
		}
    },
	computed: {
		...mapState('account', ['user']),
		menuButtonClass() {
			return ['layout-menubutton', {
				'layout-menubutton-active': this.menuActive
			}];
		},
		topbarMenuClass() {
			return ['layout-profile-menu fadeInDown ', {
				'layout-profile-menu-active': this.topbarUserMenuActive
			}];
		}
	},
	components: {
		'AppMenu': AppMenu,
		'DialogChangePassword': DialogChangePassword
	}
}
</script>
