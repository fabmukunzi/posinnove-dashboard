import { Carousel, Skeleton, Space } from "antd";
import React, { useEffect, useState } from "react";
import PendingCard from "./pending-card";
import { myProjects } from "@utils/dummy-data";
import { DotChartOutlined } from "@ant-design/icons";

const CurrentsProjects = () => {
  const [chunkSize, setChunkSize] = useState(3);
  const [loading, setLoading] = useState(true);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const updateChunkSize = () => {
    if (window.innerWidth < 768) {
      setChunkSize(1);
    } else if (window.innerWidth < 1024) {
      setChunkSize(2);
    } else {
      setChunkSize(3);
    }
  };

  // Use effect to monitor screen size changes
  useEffect(() => {
    updateChunkSize(); // Set initial chunk size
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize); // Cleanup event listener
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const chunkProjects = (projects: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < projects.length; i += size) {
      chunks.push(projects.slice(i, i + size));
    }
    return chunks;
  };

  const projectChunks = chunkProjects(myProjects, chunkSize);
  return (
    <>
      {loading ? (
        <div>
          {[...Array(3)].map((_, index) => (
            <>
              <Space direction="vertical" className="ml-8 w-[1/3] px-6  ">
                <Skeleton.Input active size={"large"} />
                <Space direction="horizontal">
                  <Skeleton.Input active size={"small"} />
                  <Skeleton.Avatar active size={"default"} shape={"circle"} />
                </Space>
                <Space direction="horizontal">
                  <Skeleton.Input active size={"small"} />
                  <Skeleton.Avatar active size={"default"} shape={"circle"} />
                </Space>
                <Space direction="horizontal">
                  <Skeleton.Input active size={"small"} />
                  <Skeleton.Avatar active size={"default"} shape={"circle"} />
                </Space>
                <Space direction="horizontal">
                  <Skeleton.Input active size={"small"} />
                  <Skeleton.Avatar active size={"default"} shape={"circle"} />
                </Space>
                <Skeleton.Input active size={"large"} />
                <Skeleton.Node active style={{ width: 200 }} />
                <Skeleton.Button
                  active
                  size={"default"}
                  shape={"square"}
                  className=" rounded-sm ml-6 w-[50%]"
                  block={true}
                />
              </Space>
            </>
          ))}
        </div>
      ) : (
        <div className="px-4 md:px-10 w-full">
          <h1 className="text-3xl font-semibold py-5 px-10">My Projects</h1>
          <Carousel afterChange={onChange} dotPosition="bottom">
            {projectChunks.map((chunk, index) => (
              <div
                key={index}
                className=" grid grid-flow-col auto-cols-fr gap-4"
              >
                {chunk.map((project, idx) => (
                  <PendingCard key={idx} project={project} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default CurrentsProjects;
