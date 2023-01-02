import styles from './Search.module.css'


const Search = (props) => {
    const callEdit = () => {
        props.handleOpen();
        props.handleSearchEdit(props.eventSearch);
    }
    return (
        <div onClick={callEdit} className={styles.container}>
            <div>
                    <div className={styles.element}>{props.eventSearch.event}</div>
                    <div className={styles.date}>{props.eventSearch.uniqueDate}</div>
            </div>
            
        </div>
    );
};

export default Search