import styles from './AddEvent.module.css'
import DATA from '../../constants/calendarData'
import { useRef } from 'react'

const AddEvent = (props) => {
    const eventRef = useRef();
    const addEvent = () => {
        const input = eventRef.current.value;
        const formatInput = input.split(',');
        const newDate = {
            uniqueDate: formatInput[0],
            event: formatInput[1],
            members: '',
            description: ''
        }
        const indexDate = DATA.findIndex(elem => elem.uniqueDate === formatInput[0])
        if (indexDate !== (-1)) {
            DATA.splice(indexDate, 1);
        }
        DATA.push(newDate);
        props.handleOnMonthChange();
        props.handleClose();
    }
    return (
        <div className={styles.container}>
            <button className={styles.close} onClick={props.handleClose}>&#10006;</button>
            <input type='text' className={styles.input} ref={eventRef} placeholder='дд.мм.гггг, Событие' />
            <span className={styles.create}><button onClick={addEvent} className={styles.add}>Добавить</button></span>
        </div>
    );
};

export default AddEvent