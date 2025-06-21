export const EAppEvent = {
  CHANGE_CURRENT_WORD: "change_current_word",
} as const;

export type EAppEvent = (typeof EAppEvent)[keyof typeof EAppEvent];

type AppEvent = {
  event: typeof EAppEvent.CHANGE_CURRENT_WORD;
  listener: (
    event: CustomEvent<{
      nextWord: string;
    }>
  ) => void;
};

type PublishAppEvent = {
  event: typeof EAppEvent.CHANGE_CURRENT_WORD;
  details: {
    nextWord: string;
  };
};

export const subscribeAppEvent: ({ event, listener }: AppEvent) => {
  unsubscribe: () => void;
} = ({ event, listener }) => {
  document.addEventListener(event, listener as EventListener);

  return {
    unsubscribe: () => {
      document.removeEventListener(event, listener as EventListener);
    },
  };
};

export const publishAppEvent: ({ event, details }: PublishAppEvent) => void = ({
  event,
  details,
}) => {
  document.dispatchEvent(new CustomEvent(event, { detail: details }));
};
