import yaml


def GenerateConfig(context):

  def generateTopic(topicName):
  	return {
      'name': topicName,
      'type': 'pubsub.v1.topic',
      'properties': {
          'topic': topicName
      }
  	}

  f = open('pubsub_topics.yaml', 'r')
  topic_names = yaml.safe_load(f.read())['topics'].values()
  resources = map(generateTopic, topic_names)

  return {'resources': resources}

