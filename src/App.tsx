import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <section className="app-card">
        <p className="app-eyebrow">Plugin UI</p>
        <h1 className="app-title">Storybook workspace</h1>
        <p className="app-copy">
          This package is intended to be reviewed and maintained through Storybook.
        </p>
        <div className="app-actions" aria-label="Available commands">
          <code>npm run storybook</code>
          <code>npm run build-storybook</code>
          <code>npm run lint</code>
        </div>
      </section>
    </main>
  );
}

export default App;
