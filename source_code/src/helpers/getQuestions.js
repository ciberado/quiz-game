import offlineQuestions from '@/assets/questions.json'

const randomArray = (arr) => arr.toSorted(() => 0.5 - Math.random())

export default async function getQuestions (topics, qNumber) {
	const randomTopics = randomArray(topics)
	const messyTopics = []
	for (let i = 0; i < qNumber; i++) messyTopics.push(randomTopics[i % topics.length])

	function getOfflineQuestions () {
		const questionsPerTopic = {}
		messyTopics.forEach(topic => {
			questionsPerTopic[topic] = (questionsPerTopic[topic] || 0) + 1
		})

		const questions = []
		Object.keys(questionsPerTopic).forEach(topic => {
			randomArray(offlineQuestions[topic]).slice(0, questionsPerTopic[topic]).forEach(question => {
				questions.push({
					...question,
					topic,
					answers: randomArray(question.answers),
					userAnswer: undefined,
					ia: false
				})
			})
		})

		return questions
	}

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(randomArray(getOfflineQuestions()))
		}, 1 * 1000)
	})
}
