import { useTheme } from "../../context/ThemeContext/ThemeProvider";

function Home() {
  const { toggleTheme } = useTheme();
  return (
    <section>
      Home Page
      <button onClick={toggleTheme}>Change Theme</button>
    </section>
  );
}

export default Home;
