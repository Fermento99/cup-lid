type ClockParams = {
  updateTime: string,
}

export const Clock = ({updateTime}: ClockParams) => {
  return (
    <div>
      <div>
        Update time: {(new Date(updateTime)).toLocaleString()}
      </div>
    </div>
  );
}