import React from "react";
import {
  StyledRecruitmentScene,
  StyledRecruitmentSceneContainer,
  StyledSceneHeader,
} from "./style";
import {
  FeatherIcon,
  ChartIcon,
  ClockIcon,
  BellIcon,
  RectangleEditIcon,
  BookIcon,
  NoteIcon,
} from "../icons";
interface SceneCard {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface RecruitmentSceneProps {
  scenes?: SceneCard[];
}

const _scenes: SceneCard[] = [
  {
    title: "撰写岗位JD",
    icon: <FeatherIcon style={{ fontSize: 16 }} />,
    bgColor: "#E2F8EC",
  },
  {
    title: "简历初筛评估",
    icon: <ChartIcon style={{ fontSize: 16 }} />,
    bgColor: "#EDF2FF",
  },
  {
    title: "面试时间推荐",
    icon: <ClockIcon style={{ fontSize: 16 }} />,
    bgColor: "#F8F0FF",
  },
  {
    title: "面试会邀及通知",
    icon: <BellIcon style={{ fontSize: 16 }} />,
    bgColor: "#EBF8FE",
  },
  {
    title: "生成面试题",
    icon: <RectangleEditIcon style={{ fontSize: 16 }} />,
    bgColor: "#F4F3FF",
  },
  {
    title: "候选人能力评估",
    icon: <BookIcon style={{ fontSize: 16 }} />,
    bgColor: "#EAFBFA",
  },
  {
    title: "招聘活动概览",
    icon: <NoteIcon style={{ fontSize: 16 }} />,
    bgColor: "#E2FDFF",
  },
];

const RecruitmentScene: React.FC<RecruitmentSceneProps> = ({
  scenes = _scenes,
}) => {
  return (
    <StyledRecruitmentSceneContainer>
      <StyledSceneHeader>Agent</StyledSceneHeader>
      <StyledRecruitmentScene>
        {scenes.map((scene, index) => (
          <div
            key={index}
            className="scene-card"
            style={{ backgroundColor: scene.bgColor }}
          >
            {scene.icon}
            <div className="scene-title">{scene.title}</div>
          </div>
        ))}
      </StyledRecruitmentScene>
    </StyledRecruitmentSceneContainer>
  );
};

export default RecruitmentScene;
