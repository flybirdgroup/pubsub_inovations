from google.cloud import pubsub_v1
from google.cloud import bigquery

# Set up credentials for accessing BigQuery and Pub/Sub
# ...

# Create a Pub/Sub topic
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)
topic = publisher.create_topic(topic_path)

# Create a BigQuery client
client = bigquery.Client()

def table_watcher(table_ref):
    def callback(table):
        # Publish message to Pub/Sub topic
        message_data = "Table '{}' was updated or refreshed".format(table_ref.path)
        publisher.publish(topic_path, data=message_data.encode())
        print("Published message to Pub/Sub: {}".format(message_data))
    
    client.watch_for_changes(table_ref, callback=callback)

# Watch for changes to a specific BigQuery table
table_ref = client.dataset(dataset_id).table(table_id)
table_watcher(table_ref)

##########################################

from google.cloud import pubsub_v1
from google.cloud import bigquery

# Set up credentials for accessing BigQuery and Pub/Sub
# ...

# Create a Pub/Sub topic
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)
topic = publisher.create_topic(topic_path)

# Create a BigQuery client
client = bigquery.Client()

def table_watcher(table_ref):
    def callback(table):
        # Publish message to Pub/Sub topic
        message_data = "Table '{}' was updated or refreshed".format(table_ref.path)
        publisher.publish(topic_path, data=message_data.encode())
        print("Published message to Pub/Sub: {}".format(message_data))
    
    client.watch_for_changes(table_ref, callback=callback)

# Watch for changes to a specific BigQuery table
table_ref = client.dataset(dataset_id).table(table_id)
table_watcher(table_ref)
