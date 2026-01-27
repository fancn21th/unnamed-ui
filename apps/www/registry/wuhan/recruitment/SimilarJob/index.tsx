/** 相似 JD 参考 */
import { StyledSimilarJob } from "./style";
import { FullscreenIcon } from "../icons";

export interface SimilarJobProps {
  jdList?: {
    label: string;
    title: string;
    desc: string;
  }[];
}

const SimilarJob: React.FC<SimilarJobProps> = ({
  jdList = [
    {
      label: "相似JD参考 1",
      title: "前端开发工程师",
      desc: "负责公司前端项目的开发与维护，要求熟悉 React 框架，有良好的编码习惯和团队合作精神。",
    },
    {
      label: "相似JD参考 2",
      title: "全栈工程师",
      desc: "负责公司前后端项目的开发与维护，要求熟悉 Node.js 和 React 框架，有良好的编码习惯和团队合作精神。",
    },
  ],
}) => {
  return (
    <StyledSimilarJob>
      {jdList.map((jd, index) => (
        <div key={index} className="similar-job-item">
          <div className="label">
            <span>{jd.label}</span>
            <FullscreenIcon className="icon-fullscreen" />
          </div>
          <div className="title">{jd.title}</div>
          <div className="desc">{jd.desc}</div>
        </div>
      ))}
    </StyledSimilarJob>
  );
};

export default SimilarJob;
