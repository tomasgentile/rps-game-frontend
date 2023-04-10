import { useContext } from "react"
import GameContext from "../context/gameContext"
import styles from '../styles/Score.module.css'

const Score = () => {
    const { scoreRemoteGame } = useContext(GameContext)

    const getIcon = (point) => {
        if (point == -1) {
            return <img className={styles.imgResult} src='img/lose.png' alt="win img" />
        }
        if (point == 1) {
            return <img className={styles.imgResult} src='img/win.png' alt="lose img" />
        }
    }

    const defaultIcon = <div className={styles.defaultIcon}></div>

    return (
        <div className={styles.scoreContainer}>
            <div>{scoreRemoteGame[0] ? getIcon(scoreRemoteGame[0]) : defaultIcon}</div>
            <div>{scoreRemoteGame[1] ? getIcon(scoreRemoteGame[1]) : defaultIcon}</div>
            <div>{scoreRemoteGame[2] ? getIcon(scoreRemoteGame[2]) : defaultIcon}</div>

        </div>
    )
}

export default Score