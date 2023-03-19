import styles from '../styles/Modal.module.css'

const ModalExit = ({ handleCloseModal, handleAcceptedExit }) => {
    const accept = () => {
        handleCloseModal()
        handleAcceptedExit()
    }

    return (
        <div className={styles.background}>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <button
                        className={styles.closeBtn}
                        onClick={() => handleCloseModal()}
                    >x</button>
                    <>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.heading}>Are you sure you want to exit this game?</h2>
                        </div>
                        <div className={styles.modalContent}>
                            <div className={styles.buttonsContainer}>
                                <button
                                    onClick={accept}
                                    className={styles.btn}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className={styles.btn}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>

    )
}

export default ModalExit