import { Button } from 'antd';
import { useGetProjectsQuery } from '@store/actions/projects';
import HashLoader from 'react-spinners/HashLoader';
import NewProject from './new-project';
import useDisclose from '@utils/hooks/useDisclose';
import { Plus } from 'lucide-react';
import ProjectCard from './project-card';
import { useSelector } from 'react-redux';

const PersonalProjects = () => {
  const { data: projects, isLoading } = useGetProjectsQuery();
  const { isOpen, toggle, close } = useDisclose();
  const user = useSelector((state: any) => state.appReducer.userProfile);
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="w-full h-[80vh] items-center justify-center flex flex-col">
          <HashLoader color="#091e6a" />
        </div>
      ) : (
        <div className="w-full">
          {user?.role !== 'learner' && (
            <div className="flex justify-end my-4">
              <Button icon={<Plus size={20} />} onClick={toggle}>
                Create Project
              </Button>
            </div>
          )}

          <NewProject open={isOpen} close={close} />
          <div className="grid xlg:grid-cols-3 md:grid-cols-2 gap-3 w-full my-8">
            {projects?.data?.projects?.map((project: any, index: number) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          {/* <h1 className="text-3xl font-semibold py-5 px-10">
            {isProject ? 'Projects' : 'Personally Picked for You'}
          </h1>
          {projects?.data?.projects?.length === 0 ? (
            <div className="text-center text-xl py-10">
              No projects available
            </div>
          ) : (
            <Carousel afterChange={onChange} dotPosition="bottom">
              {projectChunks.map((chunk, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between gap-5"
                >
                  {chunk.map((project, idx) => (
                    <PersonalCard key={idx} project={project} />
                  ))}
                </div>
              ))}
            </Carousel>
          )} */}
        </div>
      )}
    </div>
  );
};

export default PersonalProjects;
