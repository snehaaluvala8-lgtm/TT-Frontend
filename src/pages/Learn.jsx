import { useState } from 'react'

const lessons = [
  {
    title: 'What is the stock market?',
    body: 'A stock market is a place where investors can buy and sell small ownership shares in companies. This app simulates that activity for practice.',
    example: 'Think of it like a marketplace: buyers and sellers agree on a price for a small piece of a business.',
  },
  {
    title: 'What is a stock?',
    body: 'A stock (or share) represents a small ownership interest in a company. Owning a share does not guarantee a profit.',
    example: 'If you practise buying 2 simulated units, your portfolio records 2 units—not ownership in a real company.',
  },
  {
    title: 'How do stock prices change?',
    body: 'In real markets, prices move as buyers and sellers respond to many factors, including company results, news, and expectations. Prices can rise or fall unpredictably.',
    example: 'Candle Craft uses fixed educational prices, so its values do not track live markets or predict future prices.',
  },
  {
    title: 'What are BUY and SELL operations?',
    body: 'A BUY adds units to a position and uses cash. A SELL reduces units you already own and returns simulated cash to your wallet.',
    example: 'Buying 2 units at ₹100 uses ₹200 of virtual cash. Selling 1 unit at ₹110 returns ₹110 in this simulator.',
  },
  {
    title: 'How are profit and loss calculated?',
    body: 'For an open holding, unrealised profit or loss is its current simulated value minus its purchase cost. A realised result is determined when units are sold.',
    example: 'One unit bought at ₹100 and shown at ₹110 has ₹10 unrealised profit in the simulator.',
  },
  {
    title: 'What are candlesticks and price charts?',
    body: 'A candlestick chart summarises opening, closing, high, and low prices over a chosen period. Candles describe past price movement; they cannot guarantee what happens next.',
    example: 'A green candle often means the close was above the open for that period; a red candle often means it was below.',
  },
  {
    title: 'What are diversification and risk management?',
    body: 'Diversification means spreading exposure across different investments. Risk management means considering what you could lose and avoiding decisions based on certainty that does not exist.',
    example: 'Practise comparing a concentrated portfolio with one spread across several simulated companies.',
  },
  {
    title: 'Realised vs. unrealised gains and losses',
    body: 'Unrealised P&L describes open holdings using the displayed price. Realised P&L relates to units you have sold compared with their purchase cost. They are different measures.',
    example: 'If a holding rises while you still own it, the change is unrealised. Selling makes the sale part of your transaction history.',
  },
]

const questions = [
  {
    question: 'What happens to your virtual cash when you make a simulated BUY?',
    options: ['It decreases by the purchase cost', 'It always stays the same', 'It becomes real money'],
    answer: 0,
    explanation: 'The simulator deducts the purchase cost from your virtual balance.',
  },
  {
    question: 'What does unrealised P&L describe?',
    options: ['A guaranteed future return', 'The displayed change on holdings you still own', 'A bank deposit'],
    answer: 1,
    explanation: 'Unrealised P&L is based on open holdings and displayed simulated prices.',
  },
  {
    question: 'Do Candle Craft prices represent live exchange quotes?',
    options: ['Yes, they update in real time', 'No, they are predefined educational values', 'Only after you log in'],
    answer: 1,
    explanation: 'Prices in this training app are static simulated values, not live market data.',
  },
]

function Learn() {
  const [answers, setAnswers] = useState({})

  function chooseAnswer(questionIndex, answerIndex) {
    setAnswers((current) => ({ ...current, [questionIndex]: answerIndex }))
  }

  return (
    <div className="page-stack learn-page">
      <section className="learn-intro">
        <span className="eyebrow">THE BEGINNER'S GUIDE</span>
        <h2>Market concepts, made a little clearer.</h2>
        <p>Take these short lessons at your own pace. There is no rush and no real money involved.</p>
        <span className="lesson-count">{lessons.length} short lessons <span aria-hidden="true">·</span> 3 quick questions</span>
      </section>

      <div className="lesson-grid">
        {lessons.map((lesson, index) => (
          <article className="lesson-card" key={lesson.title}>
            <div className="lesson-number">{String(index + 1).padStart(2, '0')}</div>
            <h3>{lesson.title}</h3>
            <p>{lesson.body}</p>
            <div className="lesson-example"><strong>Simple example</strong><p>{lesson.example}</p></div>
          </article>
        ))}
      </div>

      <section className="panel quiz-panel">
        <div className="panel-heading">
          <div><span className="eyebrow">QUICK CHECK</span><h2>Try a few questions</h2></div>
          <span className="quiz-symbol" aria-hidden="true">?</span>
        </div>
        <div className="quiz-list">
          {questions.map((item, questionIndex) => {
            const selected = answers[questionIndex]
            return (
              <article className="quiz-question" key={item.question}>
                <h3><span>{questionIndex + 1}</span>{item.question}</h3>
                <div className="quiz-options">
                  {item.options.map((option, answerIndex) => (
                    <button
                      className={`quiz-option${selected === answerIndex ? ' selected' : ''}${selected === answerIndex && answerIndex === item.answer ? ' correct' : ''}${selected === answerIndex && answerIndex !== item.answer ? ' incorrect' : ''}`}
                      type="button"
                      key={option}
                      onClick={() => chooseAnswer(questionIndex, answerIndex)}
                      aria-pressed={selected === answerIndex}
                    >
                      <span className="option-marker">{String.fromCharCode(65 + answerIndex)}</span>{option}
                    </button>
                  ))}
                </div>
                {selected !== undefined && (
                  <p className={`quiz-feedback ${selected === item.answer ? 'correct' : 'incorrect'}`} role="status">
                    {selected === item.answer ? 'That’s right. ' : 'Not quite. '}{item.explanation}
                  </p>
                )}
              </article>
            )
          })}
        </div>
        <p className="tiny-note">Learning content is educational only and does not offer financial advice or predict market outcomes.</p>
      </section>
    </div>
  )
}

export default Learn
