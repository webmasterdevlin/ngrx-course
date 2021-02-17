import { heroReducer, HeroState, initialState } from "./hero.reducer";
import { deleteHeroSuccess, loadHeroesSuccess } from "../actions/hero.actions";

describe("HeroReducer", () => {
  describe("unknown action", () => {
    it("should return the default state", () => {
      const action = {
        type: "unknown",
      };

      const state = heroReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe("loadHeroesSuccess action", () => {
    it("should update the state in an immutable way", () => {
      const newState: HeroState = {
        error: "",
        heroes: [
          {
            id: "89ga-e874-z3g7",
            firstName: "Scott",
            lastName: "Summer",
            house: "Marvel",
            knownAs: "Cyclopes",
          },
        ],
        isLoading: false,
      };

      const action = loadHeroesSuccess({ heroes: newState.heroes });
      const state = heroReducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });
  });

  describe("deleteHeroFail", () => {
    it("should not update the state when ID does not exist", () => {
      const initialState: HeroState = {
        error: "",
        heroes: [
          {
            id: "89ga-e874-z3g7",
            firstName: "Scott",
            lastName: "Summer",
            house: "Marvel",
            knownAs: "Cyclopes",
          },
        ],
        isLoading: false,
      };

      const action = deleteHeroSuccess({ id: "66" });
      const state = heroReducer(initialState, action);

      expect(state.heroes.length).toEqual(1);
    });
  });
});
