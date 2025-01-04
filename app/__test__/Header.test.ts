// import { render, fireEvent } from "@testing-library/react";
// import Header from "@/components/Header";
// // import { useTheme } from "./ThemeProvider";
// import { useTheme } from "@/components/ThemeProvider";

// jest.mock("./ThemeProvider", () => ({
//   useTheme: jest.fn(() => ({ theme: "light", toggleTheme: jest.fn() })),
// }));

// it("should toggle theme when theme button is clicked", () => {
//   const { getByRole } = render(<Header />);
//   const themeButton = getByRole("button", { name: /toggle theme/i });
//   fireEvent.click(themeButton);

//   const { toggleTheme } = useTheme();
//   expect(toggleTheme).toHaveBeenCalled();
// });
