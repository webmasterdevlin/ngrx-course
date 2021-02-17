import { initialState } from "./reducers/hero.reducer";
import { selectHeroStore } from "./index";

describe("Selectors", () => {
  it("should select hero store", () => {
    const result = selectHeroStore.projector(initialState);
    expect(result.heroes.length).toBe(0);
    expect(result.isLoading).toBe(false);
    expect(result.error).toBe("");
  });
});
