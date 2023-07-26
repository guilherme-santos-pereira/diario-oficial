export const optionsType = [
  "Portaria",
  "Ato",
  "Relatório",
  "Edital",
  "Extrato",
  "Provimento",
  "Manifestação",
  "Deliberação",
  "Resolução",
  "Licitação",
  "Contrato",
  "Errata de Publicação",
  "Dispensa de Licitação",
  "Inexigibilidade de Licitação",
  "Avisos",
  "Resultados",
  "Concursos",
  "Súmulas",
  "circular",
];

export function dateFormat(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export function exhibitionDateFormat(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function hourFormat(hour: string) {}

export function handleKeyPress(event: any, handleSubmit: any, key: string) {
  event.key === key && handleSubmit();
}
