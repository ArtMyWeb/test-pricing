import React from 'react'
import { Card, List, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

const data = [
    'Unlimited revisions',
    'Unlimited downloads',
    'Email support',
    'Portfolio tracking',
    'Other cool features',
];

const Offers = (props) => ( <List
    header={<div>All reports include</div>}
    bordered
    dataSource={data}
    renderItem={item => (
        <List.Item>
            <Typography.Text mark><CheckOutlined /></Typography.Text> {item}
        </List.Item>
    )}
/>)

export default Offers;