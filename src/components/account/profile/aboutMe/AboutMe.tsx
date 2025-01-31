import { Col, Divider } from 'antd';

const AboutMe: React.FC<{ aboutMe?: string }> = ({ aboutMe }) => {
  if (!aboutMe) return <></>;

  return (
    <>
      <Divider orientation="center">About me</Divider>
      <Col>{aboutMe}</Col>
    </>
  );
};

export default AboutMe;
