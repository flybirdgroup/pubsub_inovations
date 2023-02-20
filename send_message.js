
from google.cloud import bigquery
from google.cloud import pubsub_v1

# Set the project ID, dataset ID, table ID, and topic name
project_id = "your-project-id"
dataset_id = "your-dataset-id"
table_id = "your-table-id"
topic_name = "your-topic-name"

# Create a BigQuery client and load job configuration
client = bigquery.Client(project=project_id)
table_ref = client.dataset(dataset_id).table(table_id)
job_config = bigquery.LoadJobConfig()
job_config.source_format = bigquery.SourceFormat.CSV
job_config.skip_leading_rows = 1
job_config.autodetect = True

# Load data into BigQuery table
with open("your-data-file.csv", "rb") as source_file:
    job = client.load_table_from_file(source_file, table_ref, job_config=job_config)
job.result()

# Create a Pub/Sub publisher client and topic
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(project_id, topic_name)

# Define the message payload and attributes
message = "The table has been updated."
attributes = {
    "table_id": table_id,
    "dataset_id": dataset_id,
    "project_id": project_id,
}

# Publish the message to the topic
publisher.publish(topic_path, message.encode("utf-8"), **attributes)

print(f"Loaded data into BigQuery table {table_id}.{dataset_id}.{project_id} and published message to Pub/Sub topic {topic_name}.")
