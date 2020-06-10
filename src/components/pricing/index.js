import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography, Row, Col, Card, List, Tag, Button, Spin } from 'antd'
import { CheckOutlined } from "@ant-design/icons";

import './index.css'
import Layout from '../../layout'
import Offers from './offers'
import Reviews from './reviews'

const { Title, Paragraph, Text } = Typography

function Pricing(props) {
    const { plans, services, discounts } = props
    const [taxReports, setTaxReports] = useState([]);
    const [additional, setAdditional] = useState([]);
    const [showMore, toggleShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    const [saved, setSaved] = useState(0);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            const currentYear = (new Date()).getFullYear();
            setTaxReports(range(currentYear, currentYear - 10, -1))
            setAdditional(services)
            setLoading(false)
        }, 3000)
    },[]);

    const doCalculations = () => {
        let yearsNum = 0
        let priceSummary = 0
        let savedSummary = 0

        let taxReportsToSet = Array.from(taxReports)
        taxReportsToSet.forEach((item, i) => {
            if(item.checked) {
                yearsNum++
                discounts.forEach((discount, j) => {
                    if(yearsNum > discount.minimum_reports) item.discount = discount.discount
                })
                let priceItem = ( item.plans.find((x) => x.checked === true) ).price
                let savedItem = 0
                if(item.discount) {
                    savedItem = priceItem * item.discount/100
                    priceItem = priceItem * (100 - item.discount)/100
                }
                priceSummary += priceItem
                savedSummary += savedItem
            }
        })

        let additionalToSet = Array.from(additional)
        additionalToSet.forEach((item, i) => {
            if(item.checked) priceSummary += item.price
        })

        setPrice(priceSummary)
        setSaved(savedSummary)
    }

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => {
        const item = {
            year: start + (i * step),
            plans: JSON.parse(JSON.stringify(plans)), // deep cloning can be done using lodash to look more pretty, but there is no sense to install the whole library for one feature
            checked: false
        }
        return item
    });

    const setYear = (item) => {
        console.log('setYear', item)
        let taxReportsToSet = taxReports.slice()
        if(taxReportsToSet[item].checked) {
            console.log('checked')
            taxReportsToSet[item].checked = false
            taxReportsToSet[item].plans = taxReportsToSet[item].plans.map((plan) => {
                return { ...plan, checked: false }
            })
        }
        else {
            console.log('not checked')
            taxReportsToSet[item].checked = true
            if( !taxReportsToSet[item].plans.find((x) => x.checked === true) )
                taxReportsToSet[item].plans[0].checked = true

            console.log(taxReportsToSet[item], Array.from(taxReportsToSet))
        }
        setTaxReports(taxReportsToSet)
        doCalculations()
    }

    const setPlan = (item, plan) => {
        console.log('setPlan', item, plan)
        let taxReportsToSet = taxReports.slice()
        taxReportsToSet[item].checked = true
        taxReportsToSet[item].plans = taxReportsToSet[item].plans.map((plan) => {
            return { ...plan, checked: false }
        })
        taxReportsToSet[item].plans[plan].checked = true
        setTaxReports(taxReportsToSet)
        doCalculations()
    }

    const setAdditionalChecked = (item) => {
        console.log('setAdditionalChecked', item)
        let additionalToSet = additional.slice()
        if(additionalToSet[item].checked) additionalToSet[item].checked = false
        else additionalToSet[item].checked = true
        setAdditional(additionalToSet)
        doCalculations()
    }

    return (
        <Layout>
            <Row gutter={16}>
                <Col span={10}>
                    <Spin spinning={loading} tip="Loading...">
                        <List
                            bordered
                            header="Select tax report"
                            footer={<Button type="link" onClick={() => {toggleShowMore(!showMore)}}>SHOW {showMore?'LESS':'MORE'} YEARS</Button>}
                            itemLayout="horizontal"
                            dataSource={taxReports}
                            renderItem={(item, i) => (
                                <li key={'reports_'+i} style={{display: `${( (showMore && i>3) || i<3 )?'block':'none'}`}}>
                                    <List.Item className="plan-item">
                                        <Title onClick={() => {setYear(i)}} level={4}>
                                            <CheckOutlined style={{visibility: `${item.checked?'visible':'hidden'}`}} />{item.year}
                                            <Text style={{display: 'block', float: 'right'}}>{( item.checked && item.plans.find((x) => x.checked === true) )?`$${(item.plans.find((x) => x.checked === true)).price}`:''}</Text>
                                        </Title>
                                        <Paragraph>TRANSACTIONS:</Paragraph>
                                        {item.plans.map((plan, j) => <Tag color={`${plan.checked?'#87d068':'grey'}`} onClick={() => {setPlan(i,j)}}>{plan.transactions}</Tag> )}
                                        <Paragraph className='plan-discount' style={{display: `${(item.checked && item.discount)?'block':'none'}`}}>{item.discount}% off</Paragraph>
                                    </List.Item>
                                </li>
                            )}
                        />
                    </Spin>
                    <Spin spinning={loading} tip="Loading...">
                        <List
                            style={{ marginTop: 30 }}
                            bordered
                            header="Additional services"
                            itemLayout="horizontal"
                            dataSource={additional}
                            renderItem={(item, i) => (
                                <li key={'add_'+i}>
                                    <List.Item>
                                        <Title onClick={() => {setAdditionalChecked(i)}} level={4}>
                                            <CheckOutlined style={{visibility: `${item.checked?'visible':'hidden'}`}} />{item.name}
                                            <Text style={{display: 'block', float: 'right'}}>${item.price}</Text>
                                        </Title>
                                        <Paragraph>{item.desc}</Paragraph>
                                    </List.Item>
                                </li>
                            )}
                        />
                    </Spin>

                    <Button type="primary" block style={{ marginTop: 20, background: '#68bb1f', borderColor: '#68bb1f' }}>
                        Place Order ${price}
                    </Button>
                    <Paragraph style={{ marginTop: 20, textAlign: 'center' }}>You saved: ${saved}</Paragraph>
                </Col>
                <Col offset={4} span={10}>
                    <Offers />
                    <Reviews />
                </Col>
            </Row>
        </Layout>
    );
}

const mapStateToProps = state => ({
    plans: state.pricing.plans,
    services: state.pricing.services,
    discounts: state.pricing.discounts
});

export default connect(
    mapStateToProps, null
)(Pricing);
