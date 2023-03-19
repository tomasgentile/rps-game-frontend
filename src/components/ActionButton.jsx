import styles from '../styles/ActionButton.module.css'

const ActionButton = ({ handleClick, action }) => {
    
    const imgSource = `img/${action}.png`
    const color = styles[action]

    return (
        <div className={styles.actionButton}>
            <button
                className={color}
                onClick={() => handleClick(action)}>
                <img src={imgSource} />
            </button>
        </div>
    )
}

export default ActionButton