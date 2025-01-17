import * as m from '$lib/app/paraglide/messages';

export type TabName = 'signup' | 'login' | 'emailConfirm';
export type Tab = {
	title: string;
	description: string;
};

export const TABS: { [key in TabName]: Tab } = {
	get login() {
		return {
			title: m.authorization(),
			description: m.authorization_description()
		};
	},

	get signup() {
		return {
			title: m.registration(),
			description: m.registration_description()
		};
	},

	get emailConfirm() {
		return {
			title: m.registration(),
			description: m.registration_description()
		};
	}
};

export const createTabStore = (tab: TabName) => {
	const tabHistory: TabName[] = $state([tab]);

	const currentTab = $derived<TabName>(tabHistory.at(-1) ?? tab);
	const currentTabOptions = $derived<Tab>(TABS[currentTab]);

	return {
		get title(): string {
			return currentTabOptions.title;
		},

		get description(): string {
			return currentTabOptions.description;
		},

		get currentTab(): TabName {
			return currentTab;
		},

		replaceCurrentTab(name: TabName) {
			this.closeLastTab();
			this.openTab(name);
		},

		openTab(name: TabName) {
			tabHistory.push(name);
			return this;
		},

		closeLastTab() {
			tabHistory.pop();
			return this;
		}
	};
};

export const tabStore = createTabStore('login');
