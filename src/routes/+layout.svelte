<script lang="ts">
	import '../app.css';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	import { i18n } from '@/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { toast } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '@/components/ui/sonner';

	const flash = getFlash(page);

	let { children } = $props();

	$effect(() => {
		if ($flash) {
			switch ($flash.type) {
				case 'success':
					toast.success($flash.message);
					break;
				case 'info':
					toast.info($flash.message);
					break;
				case 'warning':
					toast.warning($flash.message);
					break;
				case 'error':
					toast.error($flash.message);
					break;
			}

			$flash = undefined;
		}
	});
</script>

<ModeWatcher />
<Toaster richColors />

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
