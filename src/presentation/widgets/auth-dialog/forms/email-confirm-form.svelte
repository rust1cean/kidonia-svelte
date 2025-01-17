<script lang="ts">
  import { REGEXP_ONLY_DIGITS } from 'bits-ui';

	import * as m from '$lib/app/paraglide/messages';
	import * as InputOTP from '$lib/components/ui/input-otp';
	import { Button } from '$lib/components/ui/button';
</script>

<form method="POST" class="flex size-full flex-col gap-8  justify-center">
  <InputOTP.Root maxlength={4} pattern={REGEXP_ONLY_DIGITS} class="flex justify-center">
    {#snippet children({ cells })}
      <InputOTP.Group>
        {#each cells as cell}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
  <Button type="submit">
    {m.send()}
  </Button>
</form>