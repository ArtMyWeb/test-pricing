import moment from 'moment'

const getTimeDiff = (datetime) => {
    let timeDiffText = ''
    let nowTime = Date.now();
    let timeDiff = {}
    timeDiff.years = moment(nowTime).diff(datetime, 'years')
    timeDiff.months = moment(nowTime).diff(datetime, 'months')
    timeDiff.days = moment(nowTime).diff(datetime, 'days')
    timeDiff.hours = moment(nowTime).diff(datetime, 'hours')
    timeDiff.minutes = moment(nowTime).diff(datetime, 'minutes')
    timeDiff.seconds = moment(nowTime).diff(datetime, 'seconds')
    if(timeDiff.seconds > 0) timeDiffText = 'just now'
    if(timeDiff.minutes > 0) timeDiffText = `${timeDiff.minutes} minute${timeDiff.minutes>1?'s':''} ago`
    if(timeDiff.hours > 0) timeDiffText = `${timeDiff.hours} hour${timeDiff.hours>1?'s':''} ago`
    if(timeDiff.days > 0) timeDiffText = `${timeDiff.days} day${timeDiff.days>1?'s':''} ago`
    if(timeDiff.months > 0) timeDiffText = `${timeDiff.months} month${timeDiff.months>1?'s':''} ago`
    if(timeDiff.years > 0) timeDiffText = `${timeDiff.years} year${timeDiff.years>1?'s':''} ago`
    return timeDiffText
}

export default getTimeDiff