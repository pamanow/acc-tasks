type TState = "processing" | "error" | "success";

export type TErrorMessages = "NO_STOCK" | "INCORRECT_DETAILS";

export interface IProcessingItem {
  state: TState;
  error?: TErrorMessages;
}

export interface IProcessingResult {
  title: string;
  message: string | null;
}
