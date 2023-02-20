import os
from google.cloud import pubsub_v1

# Set the project ID and subscription name
project_id = "your-project-id"
subscription_name = "your-subscription-name"

# Create a Pub/Sub subscriber client and subscription
subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_name)

# Define a callback function to handle received messages
def callback(message):
    print("Received message: {}".format(message.data))

    # Acknowledge the message to remove it from the subscription
    message.ack()

# Subscribe to the topic and start receiving messages
subscriber.subscribe(subscription_path, callback=callback)
print("Listening for messages on subscription {}...".format(subscription_path))

# Keep the subscriber running to receive messages indefinitely
while True:
    try:
        # Run the subscriber in a background thread
        subscriber.run()
    except KeyboardInterrupt:
        print("Stopping subscriber...")
        subscriber.close()
        break
