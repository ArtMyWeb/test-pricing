import React from "react";
import { Layout } from 'antd';
import { Row, Col } from 'antd';

const { Content } = Layout;

function ContentLayout(props) {
    return (
        <Content className="container">
            <Row>
                <Col span={24}>
                    {props.children}
                </Col>
            </Row>
        </Content>
    );
}

export default ContentLayout;
