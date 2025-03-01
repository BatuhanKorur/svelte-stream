<script>
  import {ResizableHandle, ResizablePane, ResizablePaneGroup} from "$lib/ui/resizable/index.js";
</script>

<ResizablePaneGroup direction="horizontal" class="flex grow h-full">
  <ResizablePane defaultSize={70} minSize={50}>
    <div class="p-6">
      <p>Left</p>
    </div>
  </ResizablePane>
  <ResizableHandle withHandle />
  <ResizablePane defaultSize={30} minSize={20}>
    <p>hello</p>
  </ResizablePane>
</ResizablePaneGroup>
