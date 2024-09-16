/* eslint-disable react/prop-types */

import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ externalDB }) {
  return (
    <div>
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen
          externalQuestions={externalDB.questions}
          bg={externalDB.bg}
        />
      </ThemeProvider>
    </div>
  )
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___')

  let externalDB

  try {
    const serverResponse = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`
    )
    if (serverResponse.ok) {
      const jsonResponse = await serverResponse.json()
      externalDB = jsonResponse
    } else {
      throw new Error('Falha em obter os dados')
    }
  } catch (err) {
    console.error(err)
  }

  return {
    props: { externalDB }
  }
}
