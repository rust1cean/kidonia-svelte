<script module lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { userPrefersMode, resetMode, setMode } from 'mode-watcher';

	import * as m from '$lib/app/paraglide/messages';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	const updateTheme = (newMode: 'light' | 'dark') => {
		setMode(newMode);
	};
</script>

<!-- TODO: animation for moon/sun -->
<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="icon" variant="outline">
			<Moon class="rotate-180 scale-0 duration-500 dark:rotate-0 dark:scale-100" />
			<Sun class="absolute scale-100 duration-500 dark:-rotate-180 dark:scale-0" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>{m.choose_theme()}</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.RadioGroup value={$userPrefersMode} onValueChange={updateTheme as any}>
			<DropdownMenu.RadioItem value="light">
				<span>{m.light()}</span>
			</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="dark">
				<span>{m.dark()}</span>
			</DropdownMenu.RadioItem>
			<Separator />
			<DropdownMenu.RadioItem value="system" onclick={resetMode}>
				<span>{m.system()}</span>
			</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
