export const useAgentStream = () => {
  let eventSource: EventSource | null = null;

  const connect = (
    task: string,
    onToken: (token: string) => void,
    onDone?: () => void,
    onError?: (err: any) => void
  ) => {
    // Close previous stream if exists
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }

    const config = useRuntimeConfig();
    const BASEURL = config.public.BASEURL || "";

    const url = `${BASEURL}/api/agent/stream?task=` + encodeURIComponent(task);

    eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource?.close();
        eventSource = null;
        onDone?.();
        return;
      }

      onToken(event.data);
    };

    eventSource.onerror = (err) => {
      eventSource?.close();
      eventSource = null;
      onError?.(err);
    };
  };

  const close = () => {
    eventSource?.close();
    eventSource = null;
  };

  return {
    connect,
    close,
  };
};
