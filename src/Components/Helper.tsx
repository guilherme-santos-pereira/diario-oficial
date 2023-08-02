interface iContent {
  file_name: string;
  presigned_url: string;
}

export const optionsType = [
  "Ato",
  "Avisos",
  "Circular",
  "Concursos",
  "Contrato",
  "Deliberação",
  "Dispensa de Licitação",
  "Edital",
  "Errata de Publicação",
  "Extrato",
  "Inexigibilidade de Licitação",
  "Licitação",
  "Manifestação",
  "Portaria",
  "Provimento",
  "Relatório",
  "Resolução",
  "Resultados",
  "Súmulas",
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

export function handleExtractUrl(urls: string[], setContent: any) {
  const currentTime = new Date();

  urls?.forEach((presigned_url) => {
    const dateRegex = /date%3D([^&]+)/;
    const hourRegex = /hour%3D([^&]+)/;
    const fileNameRegex = /file%3D([^&]+)/;

    const dateMatch = presigned_url.match(dateRegex);
    const hourMatch = presigned_url.match(hourRegex);
    const fileNameMatch = presigned_url.match(fileNameRegex);

    if (dateMatch && fileNameMatch) {
      let date = decodeURIComponent(dateMatch[1]).replace(/-/g, "/");
      let hour = hourMatch ? decodeURIComponent(hourMatch[1]) : "";
      let fileName = decodeURIComponent(fileNameMatch[1]);

      const questionMarkIndex = fileName.indexOf(".pdf");
      if (questionMarkIndex !== -1) {
        fileName = fileName.substring(0, questionMarkIndex).replace("_", " ");
      }

      const tripleDashMarkIndex = hour.indexOf("---");
      if (tripleDashMarkIndex !== -1) {
        hour = hour.substring(0, tripleDashMarkIndex);
      }

      const tripleQuestionMarkIndex = date.indexOf("///");
      if (tripleQuestionMarkIndex !== -1) {
        date = date.substring(0, tripleQuestionMarkIndex);
      }

      const extractedInfo = {
        date,
        hour: hour ? hour : "00:00",
        fileName,
        presigned_url,
      };

      const extractedHour = new Date(date + " " + hour);

      if (extractedHour < currentTime) {
        setContent((prev: any) => [...prev, extractedInfo]);
      }
    }
  });
}
