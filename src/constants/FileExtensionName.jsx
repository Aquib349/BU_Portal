import {
  FaRegFilePdf,
  FaRegFileImage,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFilePowerpoint,
  FaRegFileAlt,
  FaRegFileArchive,
  FaRegFileAudio,
  FaRegFileCode,
  FaRegFileVideo,
  FaRegFile,
} from "react-icons/fa";

// Function to extract file extension from URL
const getFileExtension = (url) => {
  return url?.split(".").pop().toLowerCase();
};

// Function to get the appropriate file icon based on the file extension
const GetFileIcon = (url) => {
  const fileExtension = getFileExtension(url);

  switch (fileExtension) {
    case "pdf":
      return <FaRegFilePdf className="text-red-500" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
      return <FaRegFileImage className="text-yellow-500" />;
    case "doc":
    case "docx":
      return <FaRegFileWord className="text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FaRegFileExcel className="text-green-500" />;
    case "ppt":
    case "pptx":
      return <FaRegFilePowerpoint className="text-orange-500" />;
    case "txt":
      return <FaRegFileAlt className="text-gray-500" />;
    case "zip":
    case "rar":
    case "gzip":
    case "arj":
      return <FaRegFileArchive className="text-purple-500" />;
    case "wav":
    case "mp3":
    case "aif":
    case "aiff":
    case "m4a":
    case "ogg":
    case "wma":
      return <FaRegFileAudio className="text-indigo-500" />;
    case "psd":
    case "ai":
      return <FaRegFileImage className="text-pink-500" />;
    case "swf":
    case "fla":
      return <FaRegFileVideo className="text-blue-500" />;
    case "css":
    case "js":
      return <FaRegFileCode className="text-green-500" />;
    case "avi":
    case "mov":
    case "wmv":
      return <FaRegFileVideo className="text-teal-500" />;
    case "dotx":
      return <FaRegFileWord className="text-blue-500" />;
    default:
      return <FaRegFile className="text-gray-500" />;
  }
};

export default GetFileIcon
