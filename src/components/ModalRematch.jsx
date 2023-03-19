import { useContext } from 'react'
import GameContext from '../context/gameContext'
import styles from '../styles/Modal.module.css'
import Spinner from './Spinner'

const ModalRematch = () => {
    const { handleAcceptedRematch, waitingRematch, handleRejectedRematch } = useContext(GameContext)

    const handleClose = () => {
        handleRejectedRematch()
    }

    return (
        <div className={styles.background}>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    {!waitingRematch ?
                        <>
                            <div className={styles.modalHeader}>
                                <h2 className={styles.heading}>Rematch?</h2>
                            </div>
                            <div className={styles.modalContent}>
                                <p>Opponent wants a rematch</p>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <button
                                    className={styles.btn}
                                    onClick={() => handleAcceptedRematch()}
                                >Ok</button>
                                <button
                                    className={styles.btn}
                                    onClick={() => handleRejectedRematch()}
                                >Cancel</button>
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => handleClose()}
                                >x</button>
                            </div>
                        </>
                        :
                        <div className={styles.modalHeader}>
                            <h2 className={styles.heading}>Waiting opponent's response</h2>
                            <Spinner />
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default ModalRematch