<!-- <script lang="ts">
	import * as m from '$lib/app/paraglide/messages';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	import * as Tabs from '$lib/components/ui/tabs';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import GoogleIcon from '$lib/components/icons/GoogleIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import UploadAvatar from '$lib/components/upload-avatar.svelte';
	import TextField from '$lib/components/text-field.svelte';
	import { signIn, loginFormSchema, signupFormSchema, signUp } from '$lib/state/auth';

	let { open = $bindable(false) }: { open: boolean } = $props();

	const loginForm = superForm(defaults(valibot(loginFormSchema)), {
		SPA: true,
		resetForm: true,
		validators: valibot(loginFormSchema),
		onSubmit({ formData }) {
			signIn({ formData, form: loginForm })
				.then((_) => toast.message(m.login_successful()))
				.catch((error) => toast.error(error.toString()));
		}
	});

	const signupForm = superForm(defaults(valibot(signupFormSchema)), {
		SPA: true,
		resetForm: true,
		validators: valibot(signupFormSchema),
		onSubmit({ formData }) {
			signUp({ formData, form: loginForm })
				.then((_) => toast.message(m.signup_successful()))
				.catch((error) => toast.error(error.toString()));
		}
	});

	let tab = $state<'signup' | 'login'>('login');
</script>

<Dialog.Root bind:open>
	<Tabs.Root bind:value={tab}>
		<Dialog.Content>
			<Dialog.Title>
				<h4>{tab === 'login' ? m.authorization() : m.registration()}</h4>
			</Dialog.Title>

			<Dialog.Description>
				<span>
					{tab === 'login' ? m.authorization_description() : m.registration_description()}
				</span>
			</Dialog.Description>

			<Tabs.Content value="login">
				<form method="POST" class="flex flex-col gap-2" use:loginForm.enhance>
					<TextField form={loginForm} field="email" type="email" label={m.email()} />
					<TextField form={loginForm} field="password" type="password" label={m.password()} />
					{@render footer()}
				</form>
			</Tabs.Content>

			<Tabs.Content value="signup">
				<form
					method="POST"
					enctype="multipart/form-data"
					class="flex flex-col gap-2"
					use:signupForm.enhance
				>
					<UploadAvatar class="size-full" form={signupForm} />
					<TextField form={signupForm} field="name" type="text" label={m.name()} />
					<TextField form={signupForm} field="email" type="email" label={m.email()} />
					<TextField form={signupForm} field="password" type="password" label={m.password()} />
					<TextField
						form={signupForm}
						field="confirmPassword"
						type="password"
						label={m.confirmPassword()}
					/>

					{@render footer()}
				</form>
			</Tabs.Content>
		</Dialog.Content>
	</Tabs.Root>
</Dialog.Root>

{#snippet footer()}
	<Dialog.Footer>
		<div class="flex w-full gap-2">
			<Tabs.List class="bg-transparent p-0">
				<Tabs.Trigger value={tab === 'signup' ? 'login' : 'signup'} class="p-0">
					<Button size="sm" variant="ghost">
						{#if tab === 'signup'}
							<span class="text-primary">{m.login()}</span>
						{:else}
							<span class="text-green-600">{m.signup()}</span>
						{/if}
					</Button>
				</Tabs.Trigger>
			</Tabs.List>

			<Button size="icon" variant="outline">
				<GoogleIcon />
			</Button>
			<Button size="icon" variant="outline">
				<AppleIcon />
			</Button>
		</div>
		<Button class={tab === 'signup' ? 'bg-green-600 hover:bg-green-600/90' : ''} type="submit">
			{tab === 'signup' ? m.signup() : m.login()}
		</Button>
	</Dialog.Footer>
{/snippet} -->
