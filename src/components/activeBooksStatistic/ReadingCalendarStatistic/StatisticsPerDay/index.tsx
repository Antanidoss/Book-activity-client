import React, { useEffect, useState } from 'react';
import { Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { activeBooksStatisticApi, ActiveBookStatisticByDay } from 'api';
import { CustomDrawer, CustomSpin } from 'commonComponents';

const StatisticsPerDay: React.FC<{
  day: string;
  userId?: string;
  show: boolean;
  onClose: () => void;
}> = (props) => {
  const [loading, setLoading] = useState(true);
  const [activeBookStatisticsByDay, setActiveBookStatisticByDay] =
    useState<ActiveBookStatisticByDay[]>();

  useEffect(() => {
    if (props.show && activeBookStatisticsByDay === undefined) {
      activeBooksStatisticApi.getActiveBooksStatisticByDay(props.day, props.userId).then((res) => {
        setActiveBookStatisticByDay(res.data.result);
        setLoading(false);
      });
    }
  }, [props.show, props.day, props.userId]);

  const statistics =
    activeBookStatisticsByDay !== undefined && activeBookStatisticsByDay.length !== 0
      ? activeBookStatisticsByDay.map((statistics) => {
          return (
            <Col style={{ fontSize: '15px', textAlign: 'center', marginBottom: '25px' }}>
              <Link to={`/book?bookId=${statistics.bookId}`}>{statistics.bookTitle}</Link>:{' '}
              {statistics.countPagesRead} pages read
            </Col>
          );
        })
      : 'On this day you have not read';

  return (
    <CustomDrawer onClose={props.onClose} open={props.show} direction="right" size={600}>
      {loading ? (
        <CustomSpin loading={loading} />
      ) : (
        <Col style={{ fontSize: '15px' }}>
          <Divider>{new Date(props.day).toDateString()}</Divider>
          {statistics}
        </Col>
      )}
    </CustomDrawer>
  );
};

export default StatisticsPerDay;
