import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Typography } from 'antd';
import styles from './Welcome.less';
import { openPage } from '@/utils/utils';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <div>test</div>
  </PageHeaderWrapper>
);
