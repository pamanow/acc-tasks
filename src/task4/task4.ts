import { sleep } from "./task4.utils";
import { ERROR_PAGE } from "./task4.constants";
import {
  TErrorMessages,
  IProcessingResult,
  IProcessingItem,
} from "./task4.types";

function handleError(error?: TErrorMessages): IProcessingResult {
  switch (error) {
    case "NO_STOCK": {
      return { title: ERROR_PAGE, message: "No stock has been found" };
    }
    case "INCORRECT_DETAILS": {
      return {
        title: ERROR_PAGE,
        message: "Incorrect details have been entered",
      };
    }
    default: {
      return { title: ERROR_PAGE, message: null };
    }
  }
}

export async function getProcessingPage(
  data: IProcessingItem[]
): Promise<IProcessingResult | undefined> {
  for (const dataItem of data) {
    switch (dataItem.state) {
      case "processing": {
        await sleep(2 * 1000);
        break;
      }
      case "error": {
        return handleError(dataItem?.error);
      }
      case "success": {
        return {
          title: "Order completed",
          message: null,
        };
      }
      default: {
        throw new Error("Unsupported state type");
      }
    }
  }
}
