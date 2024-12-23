import { Skeleton, Tabs, TabsProps } from "antd";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import PickedProjectCard from "./picked-project-card";
import { projects as myProjects } from "@utils/dummy-data";
import PersonalSelected from "./personal-selected";

function Picked() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Frontend",
      children: <PersonalSelected category="frontend" />,
    },
    {
      key: "2",
      label: "Backend",
      children: <PersonalSelected category="backend" />,
    },
    {
      key: "3",
      label: "UX/UI",
      children: <PersonalSelected category="ui/ux" />,
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-between gap-4 w-full mb-4">
          {
            <Skeleton.Node
              active
              style={{
                marginRight: "150px",
                backgroundColor: "#f0f0f0",
                borderRadius: "8px",
              }}
              className="w-full m-5 h-[60vh] px-4 grid grid-flow-col auto-cols-fr gap-4"
            />
          }
        </div>
      ) : (
        <div className="w-full max-h-[80vh] px-4  md:px-10 mt-10">
          <div className="bg-[#D6DEF6] flex justify-center p-4 rounded-3xl items-center flex-col">
            <div className="flex flex-col gap-8 justify-center items-center">
              <h1 className="text-5xl sm:text-xl md:text-2xl text-center  font-semibold">
                Pick from <span className="text-primary">200+</span> projects
              </h1>
              <div className="flex justify-between items-center px-2 w-full rounded-lg text-gray-600 bg-surface">
                <input
                  placeholder="Search projects, skills, companies..."
                  type="text"
                  className="h-10  w-56 bg-transparent outline-none px-2"
                />
                <div className="p-2">
                  <Search />
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Picked;
