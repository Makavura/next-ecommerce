import "@testing-library/jest-dom";

interface LocalStorageMock {
  getItem: jest.Mock<string | null, [key: string]>;
  setItem: jest.Mock<void, [key: string, value: string]>;
  removeItem: jest.Mock<void, [key: string]>;
  clear: jest.Mock<void, []>;
}

const localStorageMock: LocalStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  configurable: true,
});
