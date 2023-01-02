import style from './Calendar.module.css'
import React, { useState } from 'react';
import CalendarDay from '../CalendarDay/CalendarDay';


const Calendar = (props) => {
    const [data, setData] = useState(new Date());

    
    const minusMonth = () => {
        setData(new Date((data.setMonth(data.getMonth() - 1))));
        props.handleOnMonthChange();
    }

    const plusMonth = () => {
        setData(new Date((data.setMonth(data.getMonth() + 1))));
        props.handleOnMonthChange();
    }

    const todayMonth = () => {
        setData(new Date());
        props.handleOnMonthChange();
    }

    const calendarArray = (data) => {
        let dataForArray = new Date(data);
        let calendarArr = [];
        dataForArray.setDate(1);
        if (dataForArray.getDay() !== 1) {

            dataForArray = new Date(dataForArray.setMonth(dataForArray.getMonth(), 0));
            dataForArray = new Date(dataForArray.setDate(dataForArray.getDate() - (dataForArray.getDay() - 1)))

        }
        for (let i = 0; i < 42; i++) {
            calendarArr[i] = new Date(dataForArray);
            dataForArray = new Date(dataForArray.setDate(dataForArray.getDate() + 1));
        }
        return calendarArr;
    }
    const daysArr = calendarArray(data);
    const days = daysArr.map((elem, index) => <CalendarDay
        day={elem}
        index={index}
        monthChange={props.onMonthChange}
        key={index}
        handleOnMonthChange={props.handleOnMonthChange}
    />)

    return (
        <div className={style.container}>
            <section className={style.navigation}>
                <button className={style.buttonArrow} onClick={minusMonth}>&#9668;</button>
                <div className={style.month} >{data.toLocaleString('ru', { month: 'long', })} {data.getFullYear()} </div> {/*поменять на динамическое */}
                <button className={style.buttonArrow} onClick={plusMonth}>&#9658;</button>
                <button className={style.today} onClick={todayMonth}>Сегодня</button>
            </section>
            <section className={style.calendar}>
                {days}
            </section>
        </div>
    );
};

export default Calendar