import { c, html, css, useProp } from "atomico";
import { calc } from "./calc";

let keys = [
  ["C", "CE", "/", "+"],
  ["7", "8", "9", "-"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "="],
  ["+-", "0", "."],
];

function atomicoCalc() {
  let [values, setValues] = useProp("values");
  return html`
    <host shadowDom>
      <div class="display">
        <div class="history">
          ${values.map((value) => html` <span>${value}</span> `)}
        </div>
        <div class="title">
          ${[...values].reverse().find((value) => typeof value == "number") ||
          0}
        </div>
      </div>
      <div class="keys">
        ${keys.map((row) =>
          row.map(
            (value) => html`
              <button
                onclick=${() => setValues(calc(values, value))}
                data-key=${value}
              >
                ${value}
              </button>
            `
          )
        )}
      </div>
    </host>
  `;
}

atomicoCalc.props = {
  values: {
    type: Array,
    value: () => [],
  },
};

atomicoCalc.styles = css`
  :host {
    color: var(--calc--color, white);
    font-family: var(--calc--font, monospace);
    background: var(--calc--background, #232323);
    padding: var(--calc--padding, 1rem);
    border-radius: var(--calc--radius, 1rem);
    min-width: 280px;
    box-sizing: border-box;
  }
  .keys {
    display: grid;
    grid-gap: 5px;
    grid-template-rows: repeat(5, 50px);
    grid-template-columns: repeat(3, 1fr) 60px;
  }
  .display {
    width: 100%;
    display: flex;
    flex-flow: column;
  }

  .display .history {
    font-size: 12px;
  }
  .display .history span {
    padding: 0px 0.1rem;
  }
  .display .title {
    height: 50px;
    font-size: 40px;
  }
  .display .history {
    height: 20px;
  }
  .display .history,
  .display .title {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  [data-key] {
    background: transparent;
    border: none;
    color: unset;
    font-family: unset;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  [data-key="="] {
    grid-row: 4/6;
    grid-column: 4;
    background: var(--calc--submit, #6200ff);
  }
`;

customElements.define("custom-element", c(atomicoCalc));
