import { Progress } from 'antd';

const MyProgressComponent = ({ item, index }:any) => {
  // Determine text color based on index
  const textColor = index % 2 !== 0 ? 'text-[#336940]' : 'text-[#002278]';
  const strokeColor = index % 2 !== 0 ? '#336940' : '#002278';
  const trailColor = index % 2 !== 0 ? '#7CBF8C' : '#BDCFFE';
  // Custom format function for displaying the percentage
  const formatPercent = (percent:any) => {
    return (
      <span className={`${textColor}`}>
        {percent}%
      </span>
    );
  };

  return (
    <div style={{ position: 'relative', marginBottom: '10px' }}>
      <Progress 
        percent={item.progress} 
        size="small" 
        strokeColor={strokeColor}
        trailColor= {trailColor}
        format={formatPercent} // Use the custom format for percentage
        style={{ height: '6px', width: '80%', left: '20px', bottom: '2px' }} 
      />
    </div>
  );
};

export default MyProgressComponent