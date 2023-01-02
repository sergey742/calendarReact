import { useState } from 'react';
import AddEvent from '../AddEvent/AddEvent';
import styles from './Header.module.css';
import Search from '../Search/Search';
import DATA from '../../constants/calendarData';
import EventEdit from '../EventEdit/EventEdit';

const Header = (props) => {
    const [open, setOpen] = useState(false);
    const handleForm = () => setOpen(prevState => !prevState);

    const [openSearch, setOpenSearch] = useState(false);
    const handleOpenSearchOnBlur = () => setOpenSearch(false);
    const handleOpenSearchOnFocus = () => setOpenSearch(true);

    const [events, setEvents] = useState([]);
    const handleChange = (event) => {
        const input = event.target.value;
        if (!input) {
            return handleOpenSearchOnBlur();
        } else {
            const filterSearchDate = DATA.filter(elem => elem.uniqueDate.indexOf(input.toLowerCase(), 0) !== (-1));
            const filterSearchEvent = DATA.filter(elem => elem.event.indexOf(input.toLowerCase(), 0) !== (-1));
            const searchArray = filterSearchDate.concat(filterSearchEvent);
            setEvents(searchArray.map((elem, index) => <Search
                eventSearch={elem}
                key={index}
                handleOpen={handleOpen}
                open={openEdit}
                handleSearchEdit={handleSearchEdit}
                handleOpenSearchOnBlur={handleOpenSearchOnBlur}
            />))
            handleOpenSearchOnFocus();

        }
    }

    const [openEdit, setOpenEdit] = useState(false);
    const handleOpen = () => {
        setOpenEdit(prevState => !prevState);
        if (openEdit === false) {
            handleOpenSearchOnBlur();
        }
    }
    const [searchEdit, setSearchEdit] = useState({})
    const handleSearchEdit = (obj) => setSearchEdit(obj)


    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <div className={styles.addForm}>
                    <button className={styles.headerButtons} onClick={handleForm} >Добавить</button>
                    {open && <AddEvent
                        open={open}
                        handleClose={handleForm}
                        handleOnMonthChange={props.handleOnMonthChange}
                    />}
                </div>
                <button className={styles.headerButtons}>Обновить</button>
            </div>
            <div className={styles.search}>
                <img className={styles.searchImg} src='images/search-interface-symbol.png' alt='search' />
                <div >
                    <div>
                        <input type='text'
                            className={styles.searchInput}
                            onChange={handleChange}
                            placeholder='Событие, дата или участник' />
                    </div>
                    <div className={styles.divForEvents}>
                        {openSearch && <div className={styles.eventsDiv}>{events}</div>}
                        <div className={styles.eventEditContainer}>
                            {openEdit && <EventEdit dateForEventEdit={searchEdit}
                                handleClose={handleOpen}
                                open={openEdit}
                                handleOnMonthChange={props.handleOnMonthChange}
                            />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;