import { useState } from "react";
import { TodoContext, ISection } from "./common/TodoContext";
import Header from "./Header";
import Sections from "./Sections";

export default function App() {
  const [sections, setSections] = useState<ISection[]>([])

  return (
    <TodoContext.Provider value={{ sections, setSections }}>
      <Header />
      <Sections />
    </TodoContext.Provider>
  );
}
