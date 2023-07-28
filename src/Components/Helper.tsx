interface iContent {
  file_name: string;
  presigned_url: string;
}

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

export function handleKeyPress(
  event: any,
  handleSubmit: any,
  key: string,
  different?: string | string[]
) {
  const differentArray = Array.isArray(different) ? different : [different];

  if (event.key === key && !differentArray.includes(event.target.name)) {
    handleSubmit();
  }
}

export function handleExtract(data: iContent[], setContent: any) {
  data?.forEach((content: iContent) => {
    const split = content?.file_name?.split("---");
    let date, edition, hour;
    if (split.length === 3) {
      date = split[1].split("=")[1].replace(/-/g, "/");
      edition = split[2].split("=")[1].replace(".pdf", "");
      hour = split[0].split("=")[1];
    } else if (split.length === 2) {
      date = split[0].split("=")[1].replace(/-/g, "/");
      edition = split[1].split("=")[1].replace(".pdf", "");
      hour = "";
    }
    const extractedInfo = {
      date,
      edition,
      hour,
      presigned_url: content.presigned_url,
    };

    setContent((prev: any) => [...prev, extractedInfo]);
  });
}
