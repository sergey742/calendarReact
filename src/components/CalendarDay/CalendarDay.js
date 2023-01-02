import styles from './CalendarDay.module.css'
import EventEdit from '../EventEdit/EventEdit';
import { useEffect, useState } from 'react';
import DATA  from '../../constants/calendarData';


const initialData = {
    uniqueDate: '',
    event: '',
    members: '',
    description: ''
}

const CalendarDay = (props) => {
    const [open, setOpen] = useState(false);

    const handleForm = () => setOpen(prevState => !prevState);
    const [data, setData] = useState({});

    const handleData = (obj) => setData(obj);
    const options = { weekday: 'long', day: 'numeric' };
    const date = new Date(props.day).toLocaleTimeString('ru', options);
    const formatDateSplit = date.split(',');

    const uniqueDateOption = {year: 'numeric', month: 'numeric', day: 'numeric'};
    const uniqueDate = props.day.toLocaleTimeString('ru', uniqueDateOption);
    const formatUniqueDate = uniqueDate.split(',');

    useEffect(() => {
        const filterData = DATA.filter(elem => elem.uniqueDate === formatUniqueDate[0]);
        handleData(filterData[0] ? filterData[0] : initialData);
    }, [props.monthChange, formatUniqueDate]);

    
    return (
        <div >
            {open && <EventEdit
                open={open}
                handleClose={handleForm}
                index={props.index}
                handleData={handleData}
                uniqueDate={formatUniqueDate[0]}
                dateForEventEdit={data}
                handleOnMonthChange={props.handleOnMonthChange}
            />}
            <div className={styles.container} onClick={handleForm}>
                <div className={styles.day}>{props.index < 7 ? `${formatDateSplit[0]}, ${formatDateSplit[1]}` : props.day.getDate()}</div>
                <div className={styles.event}>{data.event}</div>
                <div className={styles.members}>{data.members}</div>
                <div className={styles.description}>{data.description}</div>
            </div>

        </div>
    );
};

export default CalendarDay