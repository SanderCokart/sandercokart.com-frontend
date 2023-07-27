import moment from 'moment/moment';

const CalculatePublishedTimestamp = (timestamp: string, short?: boolean) => {
  if (!timestamp) return 'Draft';

  return short
    ? `${moment.utc(timestamp).fromNow()}`
    : `${moment.utc(timestamp).fromNow()} on ${moment
        .utc(timestamp)
        .format('dddd [the] Do [of] MMMM YYYY [at] h:mm A')}`;
};

export default CalculatePublishedTimestamp;
