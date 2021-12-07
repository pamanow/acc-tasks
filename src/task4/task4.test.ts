import { getProcessingPage } from "./task4";
import { IProcessingItem } from "./task4.types";
import { ERROR_PAGE } from "./task4.constants";

describe("getProcessingPage", () => {
  it("should return proper error for lack of stocks", async () => {
    const data: IProcessingItem[] = [{ state: "error", error: "NO_STOCK" }];
    const result = await getProcessingPage(data);

    expect(result?.title).toBe(ERROR_PAGE);
    expect(result?.message).toBe("No stock has been found");
  });

  it("should return proper error for incorrect details", async () => {
    const data: IProcessingItem[] = [
      { state: "error", error: "INCORRECT_DETAILS" },
    ];
    const result = await getProcessingPage(data);

    expect(result?.title).toBe(ERROR_PAGE);
    expect(result?.message).toBe("Incorrect details have been entered");
  });

  it("should return default error", async () => {
    const data: IProcessingItem[] = [{ state: "error" }];
    const result = await getProcessingPage(data);

    expect(result?.title).toBe(ERROR_PAGE);
    expect(result?.message).toBe(null);
  });

  it("should return proper response on success", async () => {
    const data: IProcessingItem[] = [{ state: "success" }];
    const result = await getProcessingPage(data);

    expect(result?.title).toBe("Order completed");
    expect(result?.message).toBe(null);
  });
});
