import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import SelectedList from "../../Components/SelectedList/SelectedList";
import Table from "../../Components/Table/Table";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import { MdUpload, MdDelete } from "react-icons/md";
import { optionsType } from "../../Components/Helper";
import { fetchPost } from "../../Services/Slices/postSlice";
import { useDispatch } from "react-redux";
import services from "../../Services/services";

const Status = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number | string>();
  const [selectedRange, setSelectedRange] = useState<any>({
    file: File,
    type: [],
    date: "",
    time: "",
    code: "",
  });
  const [data, setData] = useState<any[]>([]);

  const columns = [
    { title: "Nome", property: "name" },
    { title: "Data", property: "date" },
    { title: "Arquivo", property: "presigned_url" },
    { title: "Excluir", property: "delete" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    if (name === "date") {
      setSelectedRange((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setSelectedRange((prev: any) => {
        if (Array.isArray(prev[name])) {
          return {
            ...prev,
            [name]: [...prev[name], value],
          };
        }
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, "").toString();

    if (numericValue === "") {
      setSelectedRange((prev: any) => ({
        ...prev,
        time: "",
      }));
      return;
    }

    let formattedValue = numericValue;
    if (numericValue.length > 2 && !numericValue.includes(":")) {
      formattedValue = numericValue.slice(0, 2) + ":" + numericValue.slice(2);
    }

    if (formattedValue.length > 5) {
      formattedValue = formattedValue.substring(0, 5);
    }

    setSelectedRange((prev: any) => ({
      ...prev,
      time: formattedValue,
    }));
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const formatDate = (dateString: any) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const postType = selectedRange.type.join(",");
    formData.append("post_type", postType);
    formData.append("date", formatDate(selectedRange.date));
    formData.append("hour", selectedRange.time);
    formData.append("number", selectedRange.code);

    try {
      await dispatch<any>(fetchPost(formData));
    } catch (err) {}
  };

  const loading = false;
  const error = false;

  const handleDeleteFile = async (file: string) => {
    try {
      await services.deleteFiles(file);
      const response = await services.getFiles("1");
      if (Array.isArray(response.data.results)) {
        setData(response.data.results);
      } else {
        setData([]);
      }
    } catch (err) {}
  };

  const transformedData = data.map((item: any) => {
    const fileNameMatch = item.file_name.match(/name=(.*?)\./);
    const fileName = fileNameMatch ? fileNameMatch[1] : "Unknown File";

    const dateMatch = fileName.match(/date=(.*?)---/);
    const date = dateMatch ? dateMatch[1] : "Unknown Date";

    const newFileNameMatch = item.file_name.match(/file=(.*?)\./);
    const newFileName = newFileNameMatch ? newFileNameMatch[1] : "Unknown File";

    return {
      name: newFileName,
      date: date,
      presigned_url: item.presigned_url,
      delete: (
          <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }} className={styles.fakeInput}>
            <MdDelete onClick={() => handleDeleteFile(item.file_name.replace('files/', ''))} size={24} style={{ marginLeft: "0px" }} />
          </label>
      ),
    };
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await services.getFiles("1");
        if (Array.isArray(response.data.results)) {
          setData(response.data.results);
        } else {
          setData([]);
        }
      } catch (err) {}
    };
    fetchFiles().then(r => {});
  }, []);

  if (loading) return <Loading size="5rem" type="spin" label="Carregando" />;

  if (error) return <Error size="5rem" label={`Erro ${error}`} />;

  return (
      <div className={styles.container}>
        <div className={styles.postContainer}>
          <label style={{ cursor: "pointer" }} className={styles.fakeInput} htmlFor="file">
            <MdUpload size={24} />
          </label>
          <Input
              className={styles.file}
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
          />
          {selectedFile && (
              <div style={{ marginRight: "15px" }} className={styles.selectedFileName}>
                Arquivo: {selectedFile.name}
              </div>
          )}
          <SelectedList
              placeholder="Tipo"
              field="type"
              list={selectedRange}
              setList={setSelectedRange}
              options={optionsType}
              isType
              readOnly
          />
          <div>
            <Input
                className={styles.date}
                type="date"
                name="date"
                value={selectedRange.date}
                onChange={handleChange}
            />
            <Input
                className={styles.time}
                name="time"
                value={selectedRange.time}
                onChange={handleTime}
                placeholder="Horario"
            />
          </div>
          <div className={styles.lastColumn}>
            <Input
                className={`${styles.input} ${styles.code}`}
                placeholder="Código"
                value={selectedRange.code}
                onChange={handleChange}
                name="code"
            />
            <Button className={`${styles.button} ${styles.schedule}`} onClick={handleSubmit}>
              Agendar
            </Button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
              title="Publicacoes Agendadas"
              columns={columns}
              data={transformedData}
              setPage={setPage}
              page={page}
              downloadButton
          />
        </div>
      </div>
  );
};

export default Status;
