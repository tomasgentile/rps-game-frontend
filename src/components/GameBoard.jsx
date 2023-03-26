import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from '../styles/GameBoard.module.css'
import GameContext from '../context/gameContext'
import Score from './Score'
import ActionButton from './ActionButton'
import ExitGame from './ExitGame'
import ModalRematch from './ModalRematch'
import ModalExit from './ModalExit'

const GameBoard = () => {
    const { handlePlayerAction, handleOpponentAction, checkWinner, winner, scoreRemoteGame, remoteOpponentAcion, waiting, player2Connected, player2Disconnected, handleExitGame, handleRefresh, rematch, waitingRematch } = useContext(GameContext)
    const [playerAction, setPlayerAction] = useState('notDefined')
    const [opponentAction, setOpponentAction] = useState('notDefined')
    const [connectionMessage, setConnectionMessage] = useState('')
    const [disConnectionMessage, setDisConnectionMessage] = useState('')
    const [exitModalIsOpen, setExitModalIsOpen] = useState(false)
    const [exit, setExit] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        checkWinner()
    }, [scoreRemoteGame])

    useEffect(() => {
        if (player2Connected) {
            setConnectionMessage('Player 2 connected')
            setTimeout(() => {
                setConnectionMessage('')
            }, 3000)
        }
    }, [player2Connected])

    useEffect(() => {
        if (player2Disconnected) {
            setDisConnectionMessage('Player 2 has left the game')
            setTimeout(() => {
                setDisConnectionMessage('')
                leaveGame()
            }, 3000)
        }
    }, [player2Disconnected])

    useEffect(() => {
        if (playerAction !== 'notDefined' && remoteOpponentAcion !== 'notDefined') {
            setOpponentAction(remoteOpponentAcion)
            handleOpponentAction(playerAction, remoteOpponentAcion)
            setTimeout(() => {
                setPlayerAction('notDefined')
                setOpponentAction('notDefined')
            }, 2000);
        }
    }, [remoteOpponentAcion, playerAction])

    useEffect(() => {
        if (exit) {
            leaveGame()
        }
    }, [exit])

    const leaveGame = () => {
        if (Object.keys(params).length > 0) {
            navigate('/')
        }
        handleExitGame()
        setPlayerAction('notDefined')
        setOpponentAction('notDefined')
        setExit(false)
    }

    const handleClick = (action) => {
        setPlayerAction(action)
        if (!waiting) {
            handlePlayerAction(action)
        }
    }

    const handleCloseModal = () => {
        setExitModalIsOpen(false)
    }

    const handleRestartClick = () => {
        setExitModalIsOpen(true)
    }

    const handleAcceptedExit = () => {
        setExit(true)
    }

    const handleRefreshClick = () => {
        handleRefresh()
        setPlayerAction('notDefined')
        setOpponentAction('notDefined')
    }

    return (
        <div className={styles.boardContainer}>
            <ExitGame handleRestartClick={handleRestartClick} handleRefreshClick={handleRefreshClick} />
            {
                !player2Disconnected ? <Score remote={true} /> : null
            }
            <div>
                {winner.length > 0 ?
                    winner === 'Player' ?
                        <h1 className={styles.winnerText}>You won! Good job!</h1>
                        :
                        <h1 className={styles.winnerText}>You lost, better luck next time!</h1>
                    :
                    player2Disconnected ?
                        <h2 className={styles.disconnected}>{disConnectionMessage}</h2>
                        :
                        <div>
                            <div className={styles.resultsContainer}>
                                <div className={styles.resultContainer}>
                                    <h1 className={styles.playerTitle}>Player</h1>
                                    {
                                        playerAction === 'notDefined' ?
                                            <h1 className={styles.question}>?</h1>
                                            :
                                            <ActionButton
                                                action={playerAction}
                                            />
                                    }
                                </div>
                                <div className={styles.resultContainer}>
                                    <h1 className={styles.playerTitle}>Opponent</h1>
                                    <div>
                                        {
                                            opponentAction === 'notDefined' ?
                                                <div>
                                                    <h1 className={styles.question}>?</h1>
                                                </div>
                                                :
                                                <ActionButton
                                                    action={opponentAction}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={styles.actionsContainer}>
                                <ActionButton
                                    handleClick={handleClick}
                                    action='rock'
                                />
                                <ActionButton
                                    handleClick={handleClick}
                                    action='scissors'
                                />
                                <ActionButton
                                    handleClick={handleClick}
                                    action='paper'
                                />
                            </div>
                        </div>
                }
            </div>
            {
                player2Connected ?
                    <h2 className={styles.connection}>{connectionMessage}</h2> : null
            }

            {
                rematch || waitingRematch ? <ModalRematch /> : null
            }

            {
                exitModalIsOpen ?
                    <ModalExit
                        handleCloseModal={handleCloseModal}
                        handleAcceptedExit={handleAcceptedExit}
                    />
                    : null
            }
        </div>
    )
}

export default GameBoard