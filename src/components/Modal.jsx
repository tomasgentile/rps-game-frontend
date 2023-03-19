import { useContext, useEffect, useState } from "react"
import GameContext from "../context/gameContext"
import styles from '../styles/Modal.module.css'
import Spinner from "./Spinner"


const Modal = ({ link }) => {
    const { handleChangeModal, handleSharedLink, sharedLink, player2Connected, handleGameType, handleExitGame } = useContext(GameContext)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (player2Connected) {
            handleChangeModal()
            handleGameType('friend')
        }
    }, [player2Connected])

    const handleClose = () => {
        handleChangeModal()
        handleExitGame()
        setMessage('')
    }

    const copyToClipboard = async () => {
        setMessage('')
        handleSharedLink()
        await navigator.clipboard.writeText(link)
    }

    const handleClick = () => {
        if (sharedLink) {
            handleSharedLink()
        } else {
            setMessage('Please, copy the link first')
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <button
                        className={styles.closeBtn}
                        onClick={() => handleClose()}
                    >x</button>
                    {!sharedLink ?
                        <>
                            <div className={styles.modalHeader}>
                                <h2 className={styles.heading}>Send this URL to your friend</h2>

                            </div>
                            <div className={styles.modalContent}>
                                <p>Then wait them to connect</p>
                                {message != '' ?
                                    <p className={styles.message}>{message}</p>
                                    :
                                    null
                                }
                            </div>
                        </>
                        :
                        <div className={styles.modalHeader}>
                            <h2 className={styles.heading}>Waiting Player 2</h2>
                            <Spinner />
                        </div>
                    }

                    <div className={styles.buttonsContainer}>
                        {!sharedLink ?
                            <>
                                <button
                                    className={styles.btn}
                                    onClick={copyToClipboard}
                                >Copy Link</button>
                                <button
                                    className={styles.btn}
                                    onClick={handleClick}
                                >Done</button>
                            </>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal