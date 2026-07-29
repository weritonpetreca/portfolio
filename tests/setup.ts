// Estende o `expect` do Vitest com matchers como `toBeInTheDocument()`,
// `toHaveTextContent()`, etc. Sem isso, você teria que checar o DOM
// "na mão" com querySelector — o equivalente seria escrever asserts
// customizados em vez de usar os matchers prontos do AssertJ/Hamcrest.
import "@testing-library/jest-dom/vitest";
