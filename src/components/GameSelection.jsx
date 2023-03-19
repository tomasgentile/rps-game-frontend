import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComputer, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import GameContext from "../context/gameContext"
import styles from "../styles/GameSelection.module.css"
import Modal from "./Modal";

const GameSelection = () => {
    const [link, setLink] = useState()
    const { suscribeRemoteGame, newRemoteGame, handleGameType, modalIsOpen, handleChangeModal } = useContext(GameContext)
    const params = useParams()

    const handleClick = (option) => {
        if (option === 'friend') {
            const newLink = newRemoteGame()
            setLink(newLink)
            handleChangeModal()
        }
        if (option === 'computer') {
            handleGameType(option)
        }
    }

    const joinRemoteGame = (id) => {
        if (id.length > 0) {
            handleGameType('friend')
            suscribeRemoteGame(id)
        }
    }

    useEffect(() => {
        if (Object.keys(params).length > 0) {
            joinRemoteGame(params.id)
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                <img className={styles.presentationImg} src='img/presentation.png' />
                <button
                    className={styles.selectionBtn}
                    onClick={() => handleClick('computer')}>
                    <h1 className={styles.neonText}>
                        <FontAwesomeIcon icon={faComputer} size='3x' />
                        Computer
                    </h1>
                </button>
                <button
                    className={styles.selectionBtn}
                    onClick={() => handleClick('friend')}>
                    <h1 className={styles.neonText}>
                        <FontAwesomeIcon icon={faUserFriends} size='3x' />
                        Friend
                    </h1>
                </button>
            </div>
            <div>
                {modalIsOpen && <Modal link={link} />}
            </div>
        </>
    )
}

export default GameSelection