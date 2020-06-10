import React from 'react';
import { Layout as AntdLayout } from 'antd';
import './index.css';

import ContentLayout from './content';

function Layout(props) {

    return (
        <AntdLayout className="main">
            <ContentLayout>
                {props.children}
            </ContentLayout>
        </AntdLayout>
    );
}

export default Layout;
