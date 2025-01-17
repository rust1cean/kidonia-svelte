import * as m from '$lib/app/paraglide/messages';

export type TabName = 'signup' | 'login' | 'confirmEmail';
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

	get confirmEmail() {
		return {
			title: m.confirm_email(),
			description: m.confirm_email_description()
		};
	}
};

export const createTabState = (initialHistory: TabName[]) => {
	const tabHistory: TabName[] = $state(initialHistory);

	const defaultTab = initialHistory.at(-1) ?? 'login';
	const currentTab = $derived<TabName>(tabHistory.at(-1) ?? defaultTab);
	const currentTabOptions = $derived<Tab>(TABS[currentTab]);

	return {
		get title(): string {
			return currentTabOptions.title;
		},

		get description(): string {
			return currentTabOptions.description;
		},

		get tabsOpened(): number {
			return tabHistory.length;
		},

		get isMoreThanOneTab(): boolean {
			return this.tabsOpened > 1;
		},

		get currentTab(): TabName {
			return currentTab;
		},

		replaceCurrentTab(name: TabName) {
			let lastTabIdx = tabHistory.length - 1;
			if (lastTabIdx < 0) lastTabIdx = 0;
			tabHistory[lastTabIdx] = name;
		},

		openTab(name: TabName) {
			tabHistory.push(name);
			return this;
		},

		closeTab(name: TabName) {
			const lastIdx = tabHistory.lastIndexOf(name);
			if (lastIdx !== -1) {
				tabHistory.splice(lastIdx, 1);
			}
		},

		closeSecondLastTab() {
			if (tabHistory.length > 1) {
				this.closeLastTab();
			}
			return this;
		},

		closeLastTab() {
			tabHistory.pop();
			return this;
		}
	};
};

export const tabState = createTabState(['login']);
