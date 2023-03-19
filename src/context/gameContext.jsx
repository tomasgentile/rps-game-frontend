import { createContext, useState, useEffect } from "react"
import { gamePointCalculator, generateGameId } from "../helpers"
import { io } from 'socket.io-client'

const GameContext = createContext()
const socket = io(import.meta.env.VITE_BACKEND_URL)

const GameProvider = ({ children }) => {
    const [gameType, setGameType] = useState('')
    const [gameId, setGameId] = useState('')
    const [player2Connected, setPlayer2Connected] = useState(false)
    const [winner, setWinner] = useState('')
    const [scoreRemoteGame, setScoreRemoteGame] = useState([])
    const [playerPoints, setPlayerPoints] = useState(0)
    const [opponentPoints, setOpponentPoints] = useState(0)
    const [remoteOpponentAcion, setRemoteOpponentAction] = useState('notDefined')
    const [waiting, setWaiting] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [sharedLink, setSharedLink] = useState(false)
    const [rematch, setRematch] = useState(false)
    const [waitingRematch, setWaitingRematch] = useState(false)
    const [player2Disconnected, setPlayer2Disconnected] = useState(false)

    const handleGameType = (type) => {
        setGameType(type)
    }

    const newRemoteGame = () => {
        setWaiting(true)
        const newGameId = generateGameId()
        setGameId(newGameId)
        socket.emit('join-game', newGameId)
        socket.on('join-game', () => {
            setWaiting(false)
            setPlayer2Connected(true)
        })
        socket.on('sendingleaving', () => {
            setPlayer2Disconnected(true)
            setTimeout(() => {
                handleExitGame()
            }, 2000);
            
        })
        const link = `${import.meta.env.VITE_FRONTEND_URL}/${newGameId}`
        return link
    }

    const suscribeRemoteGame = (id) => {
        if (socket !== null) {
            setGameId(id)
            socket.emit('join-game', id)
            socket.on('sendingleaving', (data) => {
                setPlayer2Disconnected(true)
            })
        }
    }

    useEffect(() => {
        if (gameType === 'friend') {
            socket.on('receiving', (data) => {
                setRemoteOpponentAction(data.action)
            })
            socket.on('sendingRematch', () => {
                if (!waitingRematch) {
                    setRematch(true)
                }
            })
        }
    })

    const checkWinner = () => {
        if (playerPoints === 2) {
            setTimeout(() => {
                setWinner('Player')
            }, 1500);
        }
        if (opponentPoints === 2) {
            setTimeout(() => {
                setWinner('Opponent')
            }, 1500);
        }
    }

    const handleOpponentAction = (action, opponentAction) => {
        const result = gamePointCalculator(action, opponentAction)

        if (result != 0) {
            setScoreRemoteGame([...scoreRemoteGame, result])

            if (result === 1) {
                setPlayerPoints(prevPoints => prevPoints + 1)

            } else {
                setOpponentPoints(prevPoints => prevPoints + 1)
            }
        }
        setWaiting(false)
        setRemoteOpponentAction('notDefined')
    }

    const handlePlayerAction = (action) => {
        if (gameType === 'computer') {
            const options = ['rock', 'paper', 'scissors']
            const computerChoice = options[Math.floor(Math.random() * options.length)]
            setRemoteOpponentAction(computerChoice)
            setWaiting(true)
        } else {
            socket.emit('sending', {
                action: action,
                id: gameId
            })
            if (remoteOpponentAcion === 'notDefined') {
                setWaiting(true)
            }
        }
    }

    const handleRefresh = () => {
        if (gameType === 'friend') {
            setWaitingRematch(true)
            socket.emit('rematch', gameId)
            socket.on('sendingAcceptedRematch', () => {
                setWaitingRematch(false)
                setRematch(false)
                resetGame()
            })
            socket.on('sendingRejectedRematch', () => {
                handleExitGame()
            })
        }
        resetGame()
        setWaiting(false)
    }

    const handleExitGame = () => {
        if (gameType !== 'computer') {
            resetRemoteGame()
            setRematch(false)
        }
        setGameType('')
        resetGame()
        setWaiting(false)
    }

    const handleChangeModal = () => {
        setModalIsOpen(!modalIsOpen)
    }

    const handleSharedLink = () => {
        setSharedLink(true)
    }

    const resetGame = () => {
        setWinner('')
        setScoreRemoteGame([])
        setPlayerPoints(0)
        setOpponentPoints(0)
        setRemoteOpponentAction('notDefined')
    }

    const resetRemoteGame = () => {
        setGameId('')
        socket.emit('leaving', gameId)
        setPlayer2Disconnected(false)
        setSharedLink(false)
        setPlayer2Connected(false)
    }

    const handleAcceptedRematch = () => {
        socket.emit('acceptedrematch', gameId)
        resetGame()
        setRematch(false)
    }

    const handleRejectedRematch = () => {
        socket.emit('rejectedrematch', gameId)
        handleExitGame()
    }

    return (
        <GameContext.Provider
            value={{
                gameType,
                winner,
                scoreRemoteGame,
                waiting,
                remoteOpponentAcion,
                player2Connected,
                player2Disconnected,
                modalIsOpen,
                sharedLink,
                rematch,
                waitingRematch,
                handlePlayerAction,
                handleOpponentAction,
                checkWinner,
                newRemoteGame,
                suscribeRemoteGame,
                handleExitGame,
                handleGameType,
                handleRefresh,
                handleChangeModal,
                handleSharedLink,
                handleAcceptedRematch,
                handleRejectedRematch
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export { GameProvider }
export default GameContext