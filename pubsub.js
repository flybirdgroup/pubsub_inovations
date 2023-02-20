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




import os
from google.cloud import bigquery
from google.cloud import pubsub_v1

# Set the project ID, topic name, and BigQuery configuration
project_id = "your-project-id"
topic_name = "compdata_ee_pubsub_payload"
table_id = "your-project-id.your-dataset.your-table"

# Create a BigQuery client and get the table
client = bigquery.Client()
table = client.get_table(table_id)

# Create a Pub/Sub publisher client and topic
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)

# Define a callback function to publish a message to the topic
def publish_callback(message_future):
    if message_future.exception():
        print("Error publishing message: {}".format(message_future.exception()))
    else:
        print("Message published to topic: {}".format(topic_path))

# Check the table metadata to see if it has been updated or refreshed
if table.modified:
    # Create a message with information about the updated table
    message_data = "Table {} has been updated or refreshed.".format(table_id)
    message = message_data.encode("utf-8")

    # Publish the message to the topic
    message_future = publisher.publish(topic_path, data=message)
    message_future.add_done_callback(publish_callback)
