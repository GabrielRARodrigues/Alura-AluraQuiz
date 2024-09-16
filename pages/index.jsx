import { useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import db from '../db.json'

import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import Link from '../src/components/Link'

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
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
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
          <Widget
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header>
              <h1>Quizes da Galera</h1>
            </Widget.Header>
            <Widget.Content>
              <ul>
                {db.external.map(externalLink => {
                  const [projectName, githubUser] = externalLink
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.')

                  return (
                    <li key={externalLink}>
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                      >
                        {githubUser}/{projectName}
                      </Widget.Topic>
                    </li>
                  )
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            as={motion.footer}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/GabrielRARodrigues" />
      </QuizBackground>
    </>
  )
}
