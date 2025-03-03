<script lang="ts">
  import { Dialog, Label, Separator } from "bits-ui";
  let { children } = $props();
</script>

<Dialog.Root >
  <Dialog.Trigger
    class="rounded-input bg-dark text-background
	  shadow-mini hover:bg-dark/95 focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden
	  inline-flex h-12 items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
  >
    New API key
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay
      class="
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0
      data-[state=open]:fade-in-0
      fixed inset-0 z-50 bg-black/80"
    />
    <Dialog.Content
      class="rounded-card-lg
      bg-zinc-900
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0
      data-[state=open]:fade-in-0
      data-[state=closed]:zoom-out-95
      data-[state=open]:zoom-in-95
      outline-hidden
      fixed z-50 shadow-lg
      inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm
      border-r
      p-5"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
      >
        Create API key
      </Dialog.Title>
      <Separator.Root class="bg-muted -mx-5 mb-6 mt-5 block h-px" />
      <Dialog.Description class="text-foreground-alt text-sm">
        Create and manage API keys. You can create multiple keys to organize
        your applications.
      </Dialog.Description>
      <div class="flex flex-col items-start gap-1 pb-11 pt-7">
        {@render children()}
      </div>

      <Dialog.Close
        class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden absolute right-5 top-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        <div>
          <span>x</span>
          <span class="sr-only">Close</span>
        </div>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>