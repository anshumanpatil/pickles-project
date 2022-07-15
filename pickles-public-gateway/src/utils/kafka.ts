import { IProducerConfig, ProducerConfig, SimpleProducer } from "kafka-typescript"
const rdkafka = require("node-rdkafka")

const rdkafkaProducer = rdkafka.Producer
const producers: { [topic: string]: SimpleProducer } = {}
const createTopicProducer = async (topic: string, config: IProducerConfig) => {
    const prod = await new SimpleProducer().create(rdkafkaProducer, config)
        .connect()
    prod.setTopic(topic);
    producers[topic] = prod
    return prod
}
async function initiate(){
    await createTopicProducer("pickles", new ProducerConfig("localhost", "9092"));
}
initiate();
export { createTopicProducer, producers, ProducerConfig, SimpleProducer }