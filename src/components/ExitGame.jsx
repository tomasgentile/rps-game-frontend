import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRefresh } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/ExitGame.module.css'

const ExitGame = ({handleRestartClick, handleRefreshClick}) => {

    return (
        <div className={styles.exitcontainer}>
            <button
                className={styles.exitbutton}
                onClick={handleRestartClick}>
                <FontAwesomeIcon icon={faHome} size='3x' />
            </button>
            <button
                className={styles.exitbutton}
                onClick={handleRefreshClick}>
                <FontAwesomeIcon icon={faRefresh} size='3x' />
            </button>
        </div>
    )
}

export default ExitGame