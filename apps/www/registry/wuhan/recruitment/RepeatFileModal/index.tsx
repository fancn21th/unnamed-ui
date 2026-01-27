import React from "react";
import { Button } from "antd";
import { WordFileIcon } from "../icons";
import { StyledRepeatFileModal, StyledFileList } from "./styles";

/**
 * 重复文件信息接口
 *
 * @property {string} fileName - 文件名称
 * @property {string} reason - 重复原因（如：MD5 冲突、文件名已存在等）
 * @property {string} docType - 文档类型（如：'pdf'、'doc'、'txt' 等）
 */
export interface DuplicateFileInfo {
  fileName: string;
  reason?: string;
  docType?: string;
}

/**
 * 重复文件 Modal 的属性接口
 *
 * @property {boolean} open - 控制 Modal 的显示状态
 * @property {DuplicateFileInfo[]} files - 重复的文件列表
 * @property {() => void} onCancel - 点击"取消上传"时的回调函数
 * @property {() => void} onSkip - 点击"跳过"时的回调函数
 */
interface RepeatFileModalProps {
  open: boolean;
  files: DuplicateFileInfo[];
  onCancel: () => void;
  onSkip: () => void;
}

const RepeatFileModal: React.FC<RepeatFileModalProps> = ({
  open,
  files,
  onCancel,
  onSkip,
}) => {
  /**
   * 根据文档类型返回对应的图标组件
   *
   * @param docType - 文档类型（如：'pdf'、'doc'、'docx'、'xls'、'xlsx'、'jpg'、'png' 等）
   * @returns 对应的图标组件
   *
   * 映射规则：
   * - PDF 文件 → FilePdfOutlined
   * - Word 文档（doc/docx） → FileWordOutlined
   * - Excel 表格（xls/xlsx） → FileExcelOutlined
   * - 图片文件（jpg/png/gif/jpeg/svg/webp） → FileImageOutlined
   * - 其他文件 → FileTextOutlined（默认）
   */
  const getFileIcon = (docType?: string) => {
    if (!docType) return <WordFileIcon style={{ fontSize: 20 }} />;

    // const type = docType.toLowerCase();

    // if (type === 'pdf') {
    //   return <FilePdfOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />;
    // }

    // if (type === 'doc' || type === 'docx') {
    //   return <FileWordOutlined style={{ fontSize: 20, color: '#2b579a' }} />;
    // }

    // if (type === 'xls' || type === 'xlsx') {
    //   return <FileExcelOutlined style={{ fontSize: 20, color: '#217346' }} />;
    // }

    // if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(type)) {
    //   return <FileImageOutlined style={{ fontSize: 20, color: '#1890ff' }} />;
    // }

    return <WordFileIcon style={{ fontSize: 20 }} />;
  };

  return (
    <StyledRepeatFileModal
      title="检测到重复文件"
      open={open}
      onCancel={onCancel}
      closable
      width={500}
      centered
      footer={
        <>
          <Button onClick={onCancel}>取消上传</Button>
          <Button type="primary" onClick={onSkip}>
            跳过
          </Button>
        </>
      }
    >
      <div className="modal-content">
        <div className="hint-text">发现以下文件存在重复，请选择处理操作：</div>
        <StyledFileList>
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-info">
                <span className="file-icon">{getFileIcon(file.docType)}</span>
                <span className="file-name">{file.fileName}</span>
              </div>
            </div>
          ))}
        </StyledFileList>
      </div>
    </StyledRepeatFileModal>
  );
};

export default RepeatFileModal;
