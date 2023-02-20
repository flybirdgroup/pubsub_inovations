from google.cloud import pubsub_v1

project_id = "your-project-id"
topic_name = "compdata_ee_pubsub_payload"
subscription_name = "your-subscription-name"

subscriber = pubsub_v1.SubscriberClient()
topic_path = subscriber.topic_path(project_id, topic_name)
subscription_path = subscriber.subscription_path(project_id, subscription_name)
subscriber.create_subscription(subscription_path, topic_path)

