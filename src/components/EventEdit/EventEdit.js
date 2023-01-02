import { useRef } from 'react';
import styles from './EventEdit.module.css'
import DATA from '../../constants/calendarData';

const EventEdit = (props) => {
    const eventRef = useRef();
    const memberRef = useRef();
    const descriptionRef = useRef();

    const dateForFind = props.dateForEventEdit.uniqueDate === '' ? props.uniqueDate : props.dateForEventEdit.uniqueDate;

    let findDate = DATA.find(elem => elem.uniqueDate === dateForFind);
    if (findDate === undefined) {
        findDate = {
            uniqueDate: dateForFind,
            event: '',
            members: '',
            description: ''
        };
    } else {
        findDate = {
            uniqueDate: dateForFind,
            event: (findDate.event === undefined ? '' : findDate.event),
            members: (findDate.members === undefined ? '' : findDate.members),
            description: (findDate.description === undefined ? '' : findDate.description)
        };
    }

    const handleAdd = () => {
        const indexDate = DATA.findIndex(elem => elem.uniqueDate === dateForFind);
        if (indexDate !== -1) {
            DATA.splice(indexDate, 1);
        }


        const eventDay = {
            uniqueDate: dateForFind,
            event: (findDate.event === '' ? eventRef.current.value : findDate.event),
            members: (findDate.members === '' ? memberRef.current.value : findDate.members),
            description: (findDate.description === '' ? descriptionRef.current.value : findDate.description)
        };

        // props.handleData(eventDay);

        DATA.push(eventDay);


        props.handleOnMonthChange();
        props.handleClose();
    };


    const handleDelete = () => {
        // props.handleData(eventDay);
        const indexDate = DATA.findIndex(elem => elem.uniqueDate === dateForFind);
        DATA.splice(indexDate, 1);
        props.handleOnMonthChange();
        props.handleClose();
    }

    const sixSeventh = () => {
        const ind = (props.index + 1) % 7;
        if (ind === 0) {
            return false
        } else if (ind === 6) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className={sixSeventh() ? styles.container : styles.containerSeventh}>
            <button className={styles.close} onClick={props.handleClose}>&#10006;</button>

            <div className={styles.inputs}>
                {props.dateForEventEdit.event === '' ?
                    <input className={styles.event} ref={eventRef} type='text' placeholder='Событие' /> :
                    <div className={styles.event}>{props.dateForEventEdit.event}</div>}
                {props.dateForEventEdit.members === '' ?
                    <input className={styles.members} ref={memberRef} type='text' placeholder='Имена участников' /> :
                    <div className={styles.members}><p>участники:</p><p>{props.dateForEventEdit.members}</p></div>}
                {props.dateForEventEdit.description === '' ?
                    <input className={styles.description} ref={descriptionRef} type='text' placeholder='Описание' /> :
                    <div className={styles.description}>{props.dateForEventEdit.description}</div>}
            </div>

            <div className={styles.buttons}>
                <button className={styles.eventButton} onClick={handleAdd}>Добавить</button>
                <button className={styles.eventButton} onClick={handleDelete}>Удалить</button>
            </div>

        </div>
    );
};

export default EventEdit