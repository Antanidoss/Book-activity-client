import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

const AboutMe: React.FC<{ aboutMe?: string }> = ({ aboutMe }) => {
  if (!aboutMe) {
    return (
      <>
        <Title level={3} style={{ marginTop: 0 }}>
          About
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          This reader has not written an introduction yet.
        </Paragraph>
      </>
    );
  }

  return (
    <>
      <Title level={3} style={{ marginTop: 0 }}>
        About
      </Title>
      <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-line' }}>{aboutMe}</Paragraph>
    </>
  );
};

export default AboutMe;
