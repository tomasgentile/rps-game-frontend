import { useContext } from "react"
import GameBoard from './GameBoard'
import GameSelection from './GameSelection'
import GameContext from "../context/gameContext"
import styles from '../styles/Layout.module.css'

const Layout = () => {
  const { gameType } = useContext(GameContext)

  return (
    <main className={styles.main}>
      <div>
        {gameType === '' ? <GameSelection /> : <GameBoard />}
      </div>
    </main>
  )
}

export default Layout