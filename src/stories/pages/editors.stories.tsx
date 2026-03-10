import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocPage } from "../_shared/DocPage";

const meta: Meta = {
  title: "Pages/Editors",
  parameters: {
    docs: {
      description: {
        component:
          "Editor-specific UI guidelines for plugin surfaces inside document editors.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const cardStyle = {
  border: "1px solid var(--page-border, #d1d5db)",
  borderRadius: 12,
  background: "var(--page-surface, #f7f7f7)",
  padding: 16,
} as const;

const sectionTitleStyle = {
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
} as const;

const listStyle = {
  margin: 0,
  paddingLeft: 18,
  display: "grid",
  gap: 8,
} as const;

export const Overview: Story = {
  render: () => (
    <DocPage
      title="Editors"
      description="Правила для плагинового интерфейса внутри редакторов: компактные поверхности, предсказуемые состояния и минимальный визуальный шум."
    >
      <div style={{ display: "grid", gap: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Где используется</h2>
            <ul style={listStyle}>
              <li>панели справа от документа</li>
              <li>модальные окна и диалоги действий</li>
              <li>контекстные меню и компактные тулбары</li>
            </ul>
          </div>
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Что важно</h2>
            <ul style={listStyle}>
              <li>контент важнее декора, поэтому плотность интерфейса должна быть высокой</li>
              <li>состояния должны читаться без анимаций и без лишних переходов</li>
              <li>одни и те же паттерны должны выглядеть одинаково во всех темах</li>
            </ul>
          </div>
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Что проверять</h2>
            <ul style={listStyle}>
              <li>влезает ли UI в базовую и широкую панель</li>
              <li>не ломается ли контраст в темных темах</li>
              <li>понятны ли hover, pressed, disabled и loading состояния</li>
            </ul>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Базовые принципы</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(180px, 220px) 1fr",
              gap: 12,
              marginTop: 12,
            }}
          >
            {[
              ["Компактность", "Редактор уже перегружен содержимым, поэтому элементы интерфейса должны занимать минимум места и не конкурировать с документом."],
              ["Иерархия", "Первичное действие должно быть одно. Вторичные и служебные действия отступают по контрасту, размеру или положению."],
              ["Повторяемость", "Одинаковые контролы должны иметь одинаковые размеры, отступы и состояния во всех сюжетах сторибука."],
              ["Темизация", "Компонент считается готовым только если одинаково читается в Light, Classic, Modern и Dark вариантах."],
            ].map(([label, text]) => (
              <>
                <div key={`${label}-label`} style={{ fontWeight: 700 }}>
                  {label}
                </div>
                <div key={`${label}-text`} style={{ color: "var(--page-muted, rgba(0,0,0,0.7))" }}>
                  {text}
                </div>
              </>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Паттерны поверхности</h2>
            <ul style={listStyle}>
              <li>для панели использовать фиксированную сетку и предсказуемые вертикальные ритмы</li>
              <li>для форм держать подписи, поля и пояснения в одной колонке</li>
              <li>для списков действий не смешивать больше одного визуального акцента в строке</li>
              <li>для модалок сначала показывать решение, потом справочный текст</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Антипаттерны</h2>
            <ul style={listStyle}>
              <li>большие пустоты между элементами без смысловой причины</li>
              <li>разные подписи и размеры у одинаковых контролов</li>
              <li>иконки, которые дублируют уже понятный текст</li>
              <li>состояния, различимые только по одному очень слабому оттенку</li>
            </ul>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>Рекомендуемый порядок проверки после переноса</h2>
          <ol style={listStyle}>
            <li>сравнить размер, отступы и типографику с исходным Plugin UI</li>
            <li>пройти все темы через toolbar и проверить фон, текст, бордеры и иконки</li>
            <li>отдельно посмотреть hover, pressed, disabled, loading и empty состояния</li>
            <li>проверить docs-страницы как справочник, а stories как интерактивный полигон</li>
          </ol>
        </div>
      </div>
    </DocPage>
  ),
};
