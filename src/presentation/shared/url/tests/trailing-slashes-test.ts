import { describe, expect, test } from 'vitest';
import { pushPath, justPushPath, removeTrailingSlashes, replacePath } from '$lib/shared/url';

describe('trailing slashes', () => {
	test('url expects trailing slashes to remain unchanged', () => {
		const result = removeTrailingSlashes('https://doesnt.exist').href;
		const comparable = 'https://doesnt.exist/';
		expect(result).toBe(comparable);
	});

	test('url expects trailing slashes to be removed', () => {
		const result = removeTrailingSlashes('https://doesnt.exist///').href;
		const comparable = 'https://doesnt.exist/';
		expect(result).toBe(comparable);
	});
});

describe('add path even when not needed', () => {
	test('url expects nothing to be added', () => {
		const result = justPushPath('https://doesnt.exist/', '').href;
		const comparable = 'https://doesnt.exist/';
		expect(result).toBe(comparable);
	});

	test('url expects a path to be added', () => {
		const result = justPushPath('https://doesnt.exist/another/', '/another').href;
		const comparable = 'https://doesnt.exist/another/another';
		expect(result).toBe(comparable);
	});
});

describe('add path', () => {
	test('url expects nothing to be added', () => {
		const result = pushPath('https://doesnt.exist/', '/path').href;
		const comparable = 'https://doesnt.exist/path';
		expect(result).toBe(comparable);
	});

	test('url expects a path to be added', () => {
		const result = pushPath('https://doesnt.exist/', 'new').href;
		const comparable = 'https://doesnt.exist/new';
		expect(result).toBe(comparable);
	});
});

describe('replace path', () => {
	test('url expects nothing to be replaced', () => {
		const result = replacePath('https://doesnt.exist/', '').href;
		const comparable = 'https://doesnt.exist/';
		expect(result).toBe(comparable);
	});

	test('url expects a path to be added', () => {
		const result = replacePath('https://doesnt.exist/', 'new').href;
		const comparable = 'https://doesnt.exist/new';
		expect(result).toBe(comparable);
	});
});
