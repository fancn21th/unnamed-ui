import {
  HTMLFileIcon,
  MDFileIcon,
  WordFileIcon,
  PDFFileIcon,
} from "../../icons";

export const FileTypeIcon = ({
  type = "",
  size = 20,
}: {
  type?: string;
  size?: number;
}) => {
  const style = {
    fontSize: size,
  };
  switch (type) {
    case "html":
      return <HTMLFileIcon style={style} />;
    case "md":
    case "markdown":
      return <MDFileIcon style={style} />;
    case "doc":
    case "docx":
      return <WordFileIcon style={style} />;
    case "pdf":
      return <PDFFileIcon style={style} />;
    default:
      return <WordFileIcon style={style} />;
  }
};
