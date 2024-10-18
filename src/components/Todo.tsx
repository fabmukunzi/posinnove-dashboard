import { useState } from 'react';
import { CaretRightOutlined, PauseCircleOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import { useReactMediaRecorder } from 'react-media-recorder';

const { Title } = Typography;

const TodoList = () => {
    const todos = [
        { name: 'Navigation bar', description: 'Create variations of navigation bar' },
        { name: 'Navigation bar', description: 'Create variations of navigation bar' },
        { name: 'Navigation bar', description: 'Create variations of navigation bar' },
      ];
  const [isRecording, setIsRecording] = useState(null);
  const [timer, setTimer] = useState(0);

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
  } = useReactMediaRecorder({ audio: true });

  const handleRecordClick = (index:any) => {
    if (isRecording === index) {
      stopRecording();
      setIsRecording(null);
      setTimer(0);
    } else {
      startRecording();
      setIsRecording(index);
      startTimer();
    }
  };

  const startTimer = () => {
    setTimer(0);
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 60000); // Stops after 60 seconds (adjustable)
  };

  return (
    <div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface ">
      <div className="flex justify-between items-center mb-4">
        <Title level={5} className="m-0">
          To-Do List ({todos.length})
        </Title>
        <Button type="text" className="text-black" icon={<PlusOutlined />} size="small">
          To Do
        </Button>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
      <List
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <div
                  className="w-8 h-8 flex items-center justify-center bg-black rounded-full cursor-pointer"
                  onClick={() => handleRecordClick(index)}
                >
                  {isRecording === index ? (
                    <PauseCircleOutlined className="text-white" />
                  ) : (
                    <CaretRightOutlined className="text-white" />
                  )}
                </div>
              }
              title={
                <div className="flex items-center">
                  <span>{item?.name}</span>
                  {isRecording === index && (
                    <span className="ml-2 text-red-500 text-sm">
                      {timer}s
                    </span>
                  )}
                </div>
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
      </div>

      {/* Display the recorded audio URL for playback */}
      {mediaBlobUrl && (
  <div className="flex justify-center">
    <audio src={mediaBlobUrl} controls />
  </div>
)}
    </div>
  );
};

export default TodoList;
