// Componente que muestra cuántas notas hay en el vault

import { useEffect, useState } from "react";
import { useApp } from "../hooks/useApp"

export function ExampleApp () {
  const app = useApp();
  const [count, setCount] = useState(app.vault.getMarkdownFiles().length);

  useEffect(() => {
    const update = () => setCount (app.vault.getMarkdownFiles().length);
    const refs = [app.vault.on("create", update), app.vault.on("delete", update)];
    return () => refs.forEach((ref) => app.vault.offref(ref));
  }, [app]);

  return (
    <div className="mi-plugin-root">
      <p>Notas en el vault: {count}</p>
    </div>
  );
}