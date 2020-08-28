<template>
	<div>
		<button  class="layout-config-button p-link" @click="onConfigButtonClick">
			<i class="pi pi-cog"></i>
		</button>

		<transition name="layout-config">
			<div v-show="configDialogActive" class="layout-config" @click="$event.stopPropagation()">
				<div class="layout-config-content">
					<button class="layout-config-close" @click="onConfigCloseClick">
						<i class="pi pi-times"></i>
					</button>

					<TabView>
						<TabPanel header="TopBar">
							<div class="layout-config-subtitle">Size</div>
							<div class="p-grid">
								<div class="p-col p-col-fixed">
									<button class="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
											@click="changeTopbarSize($event, 'large')">
										<img src="assets/layout/images/configurator/topbar-large.png" alt="sapphire" style="width:100%" />
										<i class="pi pi-check" v-if="topbarSize === 'large'"></i>
									</button>
								</div>
								<div class="p-col p-col-fixed">
									<button class="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
											@click="changeTopbarSize($event, 'medium')">
										<img src="assets/layout/images/configurator/topbar-medium.png" alt="sapphire" style="width:100%" />
										<i class="pi pi-check" v-if="topbarSize === 'medium'"></i>
									</button>
								</div>
								<div class="p-col p-col-fixed">
									<button class="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
											@click="changeTopbarSize($event, 'small')">
										<img src="assets/layout/images/configurator/topbar-small.png" alt="sapphire" style="width:100%" />
										<i class="pi pi-check" v-if="topbarSize === 'small'"></i>
									</button>
								</div>
							</div>
							<div class="layout-config-subtitle">Themes</div>
							<div class="p-grid">
								<template v-for="(topbarTheme, i) of topbarThemes">
									<div class="p-col" :key="i">
										<button class="p-link layout-config-option layout-config-option-image ui-shadow-1"
												@click="changeTopbarTheme($event, topbarTheme.file)">
											<img :src="'assets/layout/images/configurator/' + topbarTheme.image" :alt=topbarTheme.name />
											<i class="pi pi-check" v-if="'layout-topbar-' + topbarTheme.file === topbarColor"></i>
										</button>
									</div>
								</template>
                                <div class="p-col"></div>
                                <div class="p-col"></div>
                                <div class="p-col"></div>
							</div>
						</TabPanel>

						<TabPanel header="Menu">
							<div class="layout-config-subtitle">Orientation</div>
							<div class="p-grid">
								<div class="p-col p-col-fixed">
									<button class="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
											@click="changeMenuToHorizontal($event, true)">
										<img src="assets/layout/images/configurator/horizontal.png" alt="sapphire" style="width:100%" />
										<i class="pi pi-check" v-if="horizontal"></i>
									</button>
								</div>
								<div class="p-col p-col-fixed">
									<button class="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
											@click="changeMenuToHorizontal($event, false)">
										<img src="assets/layout/images/configurator/vertical.png" alt="sapphire" style="width:100%" />
										<i class="pi pi-check" v-if="!horizontal"></i>
									</button>
								</div>
							</div>
							<div class="layout-config-subtitle">Theme</div>
							<div class="p-grid">
								<template v-for="(menuTheme, i) of menuThemes">
									<div class="p-col" :key="i">
										<button :class="['p-link layout-config-option layout-config-option-image ui-shadow-1',{'layout-config-option-light': menuTheme.file === 'light'}]"
												@click="changeMenuTheme($event, menuTheme.file)">
											<img :src="'assets/layout/images/configurator/' + menuTheme.image" :alt=menuTheme.name />
											<i class="pi pi-check" v-if="'layout-menu-' + menuTheme.file === menuColor"></i>
										</button>
									</div>
								</template>
                                <div class="p-col"></div>
							</div>
						</TabPanel>

						<TabPanel header="Components">
							<div class="p-grid">
								<template v-for="(componentTheme, i) of componentThemes">
									<div class="p-col" :key="i">
										<button class="p-link layout-config-option layout-config-option-image ui-shadow-1"
												@click="changeComponentTheme($event, componentTheme.file)">
											<img :src="'assets/layout/images/configurator/theme/' + componentTheme.image" :alt=componentTheme.name />
											<i class="pi pi-check" v-if="componentTheme.file === themeColor"></i>
										</button>
									</div>
								</template>
                                <div class="p-col"></div>
                                <div class="p-col"></div>
							</div>
						</TabPanel>

						<TabPanel header="Primary Color">
							<p>Primary Color defines the highlight color of active menus. Note that this setting is only utilized in
								<b>light</b> and <b>light</b>menu modes as other menu themes have their own color to highlight the active
								menus.</p>
							<div class="p-grid p-primary-colors-grid">
								<template v-for="(primaryColor, i) of primaryColors">
									<div class="p-col" :key="i">
										<button class="p-link layout-config-option ui-shadow-1" :style="[{'background':primaryColor.color}]"
												@click="changePrimaryColor($event, primaryColor.file)">
											<i class="pi pi-check" v-if="primaryColor.file === layoutColor"></i>
										</button>
									</div>
								</template>
                                <div class="p-col"></div>
                                <div class="p-col"></div>
							</div>
						</TabPanel>
					</TabView>
				</div>
			</div>
		</transition>

        <transition name="layout-config-mask">
            <div class="layout-config-mask" v-if="configDialogActive" @click="$event.stopPropagation()"></div>
        </transition>
	</div>
</template>

<script>
export default {
	props: {
		horizontal: {
			type: Boolean,
			default: true
		},
		topbarSize: {
			type: String,
			default: 'large'
		},
		topbarColor: {
			type: String,
			default: 'layout-topbar-blue'
		},
		menuColor: {
			type: String,
			default: 'layout-menu-light'
		}
	},
	data() {
		return {
			configDialogActive: false,
			themeColor: 'blue',
			layoutColor: 'blue',
			topbarThemes: [
				{ name: 'Blue', file: 'blue', image: 'blue.svg' },
				{ name: 'Ash', file: 'ash', image: 'ash.svg' },
				{ name: 'Kashmir', file: 'kashmir', image: 'kashmir.svg' },
				{ name: 'Orange', file: 'orange', image: 'orange.svg' },
				{ name: 'Midnight', file: 'midnight', image: 'midnight.svg' },
				{ name: 'Sunset', file: 'sunset', image: 'sunset.svg' },
				{ name: 'Marley', file: 'marley', image: 'marley.svg' },
				{ name: 'Harvey', file: 'harvey', image: 'harvey.svg' },
				{ name: 'Vanusa', file: 'vanusa', image: 'vanusa.svg' },
				{ name: 'Skyline', file: 'skyline', image: 'skyline.svg' },
				{ name: 'Royal', file: 'royal', image: 'royal.svg' },
				{ name: 'Disco', file: 'disco', image: 'disco.svg' },
				{ name: 'Sky', file: 'sky', image: 'sky.svg' },
				{ name: 'Rose', file: 'rose', image: 'rose.svg' },
				{ name: 'Revolt', file: 'revolt', image: 'revolt.svg' },
				{ name: 'Forest', file: 'forest', image: 'forest.svg' },
				{ name: 'Night', file: 'night', image: 'night.svg' },
				{ name: 'Apricot', file: 'apricot', image: 'apricot.svg' },
				{ name: 'Faraway', file: 'faraway', image: 'faraway.svg' },
				{ name: 'Grape', file: 'grape', image: 'grape.svg' },
				{ name: 'River', file: 'river', image: 'river.svg' },
				{ name: 'Dock', file: 'dock', image: 'dock.svg' }
			],
			menuThemes: [
				{ name: 'Light', file: 'light', image: 'light.svg' },
				{ name: 'Dark', file: 'dark', image: 'dark.svg' },
				{ name: 'Blue', file: 'blue', image: 'blue.svg' },
				{ name: 'Ash', file: 'ash', image: 'ash.svg' },
				{ name: 'Kashmir', file: 'kashmir', image: 'kashmir.svg' },
				{ name: 'Orange', file: 'orange', image: 'orange.svg' },
				{ name: 'Midnight', file: 'midnight', image: 'midnight.svg' },
				{ name: 'Sunset', file: 'sunset', image: 'sunset.svg' },
				{ name: 'Marley', file: 'marley', image: 'marley.svg' },
				{ name: 'Harvey', file: 'harvey', image: 'harvey.svg' },
				{ name: 'Vanusa', file: 'vanusa', image: 'vanusa.svg' },
				{ name: 'Skyline', file: 'skyline', image: 'skyline.svg' },
				{ name: 'Royal', file: 'royal', image: 'royal.svg' },
				{ name: 'Disco', file: 'disco', image: 'disco.svg' },
				{ name: 'Sky', file: 'sky', image: 'sky.svg' },
				{ name: 'Rose', file: 'rose', image: 'rose.svg' },
				{ name: 'Revolt', file: 'revolt', image: 'revolt.svg' },
				{ name: 'Forest', file: 'forest', image: 'forest.svg' },
				{ name: 'Night', file: 'night', image: 'night.svg' },
				{ name: 'Apricot', file: 'apricot', image: 'apricot.svg' },
				{ name: 'Faraway', file: 'faraway', image: 'faraway.svg' },
				{ name: 'Grape', file: 'grape', image: 'grape.svg' },
				{ name: 'River', file: 'river', image: 'river.svg' },
				{ name: 'Dock', file: 'dock', image: 'dock.svg' }
			],
			componentThemes: [
				{ name: 'Amber', file: 'amber', image: 'amber.svg' },
				{ name: 'Blue', file: 'blue', image: 'blue.svg' },
				{ name: 'Bluegray', file: 'bluegray', image: 'bluegray.svg' },
				{ name: 'Brown', file: 'brown', image: 'brown.svg' },
				{ name: 'Cyan', file: 'cyan', image: 'cyan.svg' },
				{ name: 'Deep Orange', file: 'deeporange', image: 'deeporange.svg' },
				{ name: 'Deep Purple', file: 'deeppurple', image: 'deeppurple.svg' },
				{ name: 'Gray', file: 'gray', image: 'gray.svg' },
				{ name: 'Green', file: 'green', image: 'green.svg' },
				{ name: 'Indigo', file: 'indigo', image: 'indigo.svg' },
				{ name: 'Light Blue', file: 'lightblue', image: 'lightblue.svg' },
				{ name: 'Light Green', file: 'lightgreen', image: 'lightgreen.svg' },
				{ name: 'Lime', file: 'lime', image: 'lime.svg' },
				{ name: 'Orange', file: 'orange', image: 'orange.svg' },
				{ name: 'Pink', file: 'pink', image: 'pink.svg' },
				{ name: 'Purple', file: 'purple', image: 'purple.svg' },
				{ name: 'Teal', file: 'teal', image: 'teal.svg' },
				{ name: 'Yellow', file: 'yellow', image: 'yellow.svg' }
			],
			primaryColors: [
				{ name: 'Amber', file: 'amber', color: '#FFC107' },
				{ name: 'Blue', file: 'blue', color: '#457fca' },
				{ name: 'BlueGray', file: 'bluegray', color: '#607D8B' },
				{ name: 'Brown', file: 'brown', color: '#795548' },
				{ name: 'Cyan', file: 'cyan', color: '#00ACC1' },
				{ name: 'DeepOrange', file: 'deeporange', color: '#FF5722' },
				{ name: 'DeepPurple', file: 'deeppurple', color: '#673AB7' },
				{ name: 'Gray', file: 'gray', color: '#757575' },
				{ name: 'Green', file: 'green', color: '#4CAF50' },
				{ name: 'Indigo', file: 'indigo', color: '#3F51B5' },
				{ name: 'LightBlue', file: 'lightblue', color: '#03A9F4' },
				{ name: 'LightGreen', file: 'lightgreen', color: '#8BC34A' },
				{ name: 'Lime', file: 'lime', color: '#C0CA33' },
				{ name: 'Orange', file: 'orange', color: '#FF9800' },
				{ name: 'Pink', file: 'pink', color: '#E91E63' },
				{ name: 'Purple', file: 'purple', color: '#9C27B0' },
				{ name: 'Teal', file: 'teal', color: '#009688' },
				{ name: 'Yellow', file: 'yellow', color: '#FDD835' }
			]
		}
	},
	methods: {
		onConfigButtonClick() {
			this.configDialogActive = true;
			this.blockBodyScroll();
		},
		onConfigCloseClick() {
			this.configDialogActive = false;
			this.unblockBodyScroll();
		},
		changeTopbarSize(event, size) {
			this.$emit('update:topbarSize', size);

			event.preventDefault();
		},
		changeTopbarTheme(event, color) {
			this.$emit('update:topbarColor', 'layout-topbar-' + color);

			event.preventDefault();
		},
		changeMenuToHorizontal(event, isHorizontal) {
			this.$emit('update:horizontal', isHorizontal);

			event.preventDefault();
		},
		changeMenuTheme(event, color) {
			this.$emit('update:menuColor', 'layout-menu-' + color);

			event.preventDefault();
		},
		changeComponentTheme(event, theme) {
			this.themeColor = theme;

			let element = document.getElementById('theme-css');
			let urlTokens = element.getAttribute('href').split('/');
			urlTokens[urlTokens.length - 1] = 'theme-' + theme + '.css';
			let newURL = urlTokens.join('/');

			this.replaceLink(element, newURL);

			event.preventDefault();
		},
		changePrimaryColor(event, color) {
			this.layoutColor = color;

			let element = document.getElementById('layout-css');
			let urlTokens = element.getAttribute('href').split('/');
			urlTokens[urlTokens.length - 1] = 'layout-' + color + '.css';
			let newURL = urlTokens.join('/');

			this.replaceLink(element, newURL);

			event.preventDefault();
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
		blockBodyScroll() {
			if (document.body.classList) {
				document.body.classList.add('blocked-scroll-config');
			} else {
				document.body.className += ' blocked-scroll-config';
			}
		},
		unblockBodyScroll() {
			if (document.body.classList) {
				document.body.classList.remove('blocked-scroll-config');
			} else {
				document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
					'blocked-scroll-config'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		}
	}
}
</script>

