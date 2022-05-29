import { useState } from "react";
import { TodoContext, TodoSection } from "./common/TodoContext";
import Header from "./Header";
import Sections from "./Sections";

export default function App() {
  const [sections, setSections] = useState<TodoSection[]>([])

  return (
    <TodoContext.Provider value={{ sections, setSections }}>
      <Header />
      <Sections />
    </TodoContext.Provider>
  );
}
