import React, { useState, useEffect } from "react";
import styles from "./Status.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import SelectedList from "../../Components/SelectedList/SelectedList";
import Table from "../../Components/Table/Table";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";
import { MdUpload } from "react-icons/md";
import { handleResetResponse, optionsType } from "../../Components/Helper";
import { fetchPost } from "../../Services/Slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetFiles } from "../../Services/Slices/getFilesSlice";
import loading from "../../Components/Loading/Loading";

const Status = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [selectedRange, setSelectedRange] = useState<any>({
    file: File,
    type: [],
    date: "",
    time: "",
    code: "",
  });
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const post = useSelector((state: any) => state.postSlice);
  const getFiles = useSelector((state: any) => state.getFilesSlice);
  const deleteFile = useSelector((state: any) => state.deleteFileSlice);
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
    formData.append("date", formatDate(selectedRange?.date));
    formData.append("hour", selectedRange.time);
    formData.append("number", selectedRange.code);
    dispatch<any>(fetchPost(formData));
  };

  const transformedData = getFiles?.data?.results?.map((item: any) => {
    const fileNameMatch = item.file_name.match(/name=(.*?)\./);
    const fileName = fileNameMatch ? fileNameMatch[1] : "Unknown File";

    const dateMatch = fileName.match(/date=(.*?)---/);
    const date = dateMatch ? dateMatch[1].replace(/-/g, "/") : "Unknown Date";

    const newFileNameMatch = item.file_name.match(/file=(.*?)\./);
    const newFileName = newFileNameMatch
      ? newFileNameMatch[1].replace("_", " ")
      : "Unknown File";

    return {
      name: newFileName,
      date: date,
      presigned_url: item.presigned_url,
      delete: item.file_name.replace("files/", ""),
    };
  });

  useEffect(() => {
    dispatch<any>(fetchGetFiles(page.toString()));
    setIsDispatched(true);
  }, [dispatch, page, deleteFile?.data?.response]);

  if (post.loading || getFiles.loading)
    return (
      <div
        style={{
          display: "flex",
          height: "50vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading size="5rem" type="spin" />
      </div>
    );
  if (post.error || getFiles.error) {
    setTimeout(() => {
      window.location.reload();
    }, 0.000001);
  }

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <div className={`${selectedFile ? styles.fileContainer : ""}`}>
          <label
            style={{ cursor: "pointer" }}
            className={styles.fakeInput}
            htmlFor="file"
          >
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
            <>
              <div className={styles.fileText}>
                Arquivo: {selectedFile.name}
              </div>
            </>
          )}
        </div>
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
          <Button
            className={`${styles.button} ${styles.schedule}`}
            onClick={handleSubmit}
          >
            Agendar
          </Button>
        </div>
      </div>
      {transformedData && (
        <div className={styles.table}>
          <Table
            title="Publicações Agendadas"
            columns={columns}
            data={transformedData}
            setPage={setPage}
            page={page}
            total={getFiles.data.count}
            downloadButton
            isEmpty={isDispatched && getFiles.data.length === 0}
          />
        </div>
      )}
    </div>
  );
};

export default Status;
