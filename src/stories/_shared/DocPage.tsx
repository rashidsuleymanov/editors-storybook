import type React from "react";

type DocPageProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export const DocPage = ({ title, description, children }: DocPageProps) => (
  <div
    style={{
      fontFamily: "Arial, Helvetica, sans-serif",
      lineHeight: 1.5,
      display: "grid",
      gap: 16,
    }}
  >
    <div style={{ display: "grid", gap: 8 }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
      {description ? <p style={{ margin: 0, color: "var(--page-muted, rgba(0,0,0,0.6))" }}>{description}</p> : null}
    </div>
    {children}
  </div>
);
