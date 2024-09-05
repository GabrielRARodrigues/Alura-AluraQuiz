import { useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import db from '../db.json'

import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  const router = useRouter()

  const [name, setName] = useState('')

  return (
    <>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>The legend of zelda</h1>
            </Widget.Header>

            <Widget.Content>
              <form
                onSubmit={event => {
                  event.preventDefault()
                  router.push(`/quiz?name=${name}`)
                }}
              >
                <input
                  onChange={event => {
                    setName(event.target.value)
                  }}
                  type="text"
                  placeholder="Diz aí seu nome"
                />
                <button type="submit" disabled={name.length === 0}>
                  Jogar {name}
                </button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Quizes da Galera</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                quia aut ipsa perferendis iusto nihil illo voluptas rerum
                voluptatibus. Fugiat illum labore unde, quisquam et accusamus
                culpa? Accusantium, nisi atque!
              </p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/GabrielRARodrigues" />
      </QuizBackground>
    </>
  )
}
