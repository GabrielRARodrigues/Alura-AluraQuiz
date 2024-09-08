import { useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import db from '../db.json'

import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

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
                <Input
                  name="nomeDoUsuario"
                  onChange={event => {
                    setName(event.target.value)
                  }}
                  placeholder="Diz aí seu nome"
                  value={name}
                />
                <Button type="submit" disabled={name.length === 0}>
                  Jogar {name}
                </Button>
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
