import React from 'react'
import {Comment, Tooltip, List, Typography, Card} from 'antd'
import moment from 'moment'
import getTimeDiff from '../../filters/getTimeDiff'
import {StarTwoTone} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const data = [
    {
        name: 'Tom',
        message: 'I love how easy this has been.',
        rating: '5',
        datetime: moment(Date.now()).subtract(2, 'days')
    },
    {
        name: 'Jerry',
        message: 'Really awesome service',
        rating: '4',
        datetime: moment(Date.now()).subtract(3, 'days')
    }
];

const DateTime = (props) => {
    const { datetime } = props
    let timeDiff = getTimeDiff(datetime)
    return (<Tooltip
        title={moment(datetime)
            .format('YYYY-MM-DD HH:mm:ss')}
    >
        <span>
          {timeDiff}
        </span>
    </Tooltip>)
}

const Rating = (props) => {
    const { rating } = props
    let ratingRounded = Math.round(rating)

    return (<>{[...Array(ratingRounded)].map((e, i) => <StarTwoTone twoToneColor="#52c41a" />)}</>)
}

const Reviews = (props) => (<List
    style={{ marginTop: 30 }}
    className="comment-list"
    bordered
    header="You are in good company"
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
        <li>
            <List.Item>
                <Paragraph>{item.message}</Paragraph>
                <Text><Rating rating={item.rating} /></Text><DateTime datetime={item.datetime} />, {item.name}
            </List.Item>
        </li>
    )}
/>)

export default Reviews;