/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

import Widget from '../../src/components/Widget'
import QuizLogo from '../../src/components/QuizLogo'
import QuizBackground from '../../src/components/QuizBackground'
import QuizContainer from '../../src/components/QuizContainer'
import Button from '../../src/components/Button'
import AlternativesForm from '../../src/components/AlternativesForm'

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  )
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Tela de Resultado: </Widget.Header>

      <Widget.Content>
        <p>Você acertou {results.filter(result => result).length} perguntas</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #0{index + 1} Resultado: {result === true ? 'Acertou' : 'Errou'}{' '}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
}) {
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState(false)
  const [selectedAlternative, setSelectedAlternative] = useState(undefined)

  const questionId = `question__${questionIndex}`
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={event => {
            event.preventDefault()
            setIsQuestionSubmitted(true)
            setTimeout(() => {
              addResult(isCorrect)
              onSubmit()
              setIsQuestionSubmitted(false)
              setSelectedAlternative(undefined)
            }, 3 * 1000)
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`
            const isSelected = selectedAlternative === alternativeIndex
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            )
          })}

          {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmitted &&
            (isCorrect ? <p>Você acertou!</p> : <p>Você errou!</p>)}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [results, setResults] = useState([])

  const totalQuestions = externalQuestions.length
  const questionIndex = currentQuestion
  const question = externalQuestions[questionIndex]
  const bg = externalBg

  function addResult(result) {
    setResults([...results, result])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  )
}
