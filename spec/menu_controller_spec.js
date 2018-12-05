const MenuController = require("../controllers/MenuController");

// #1
describe("MenuController", () => {
    describe("#getContactCount()", () => {
 
 // #2
      it("should return 0 when no contacts are in the book", () => {
        const menu = new MenuController();
        expect(menu.getContactCount()).toBe(0);
      });
    });
  });