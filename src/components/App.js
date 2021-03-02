import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

const App = () => {
  return (
    <div className='App'>
      <P5Wrapper sketch={sketch} />
    </div>
  )
}

export default App
