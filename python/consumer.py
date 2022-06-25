from confluent_kafka import Consumer
import certifi

c = Consumer({
    'bootstrap.servers' : 'pkc-6ojv2.us-west4.gcp.confluent.cloud:9092',
	 'security.protocol' : 'SASL_SSL',
	 'sasl.mechanisms'   : 'PLAIN',
	 'sasl.username'     : 'HUK3KGDPXDPRSGGO',
	 'sasl.password'     : 'neF2Al2XRd/BUWNQgrmq9Y8V6GLW0+RQ9HqCFj+nuwCcMRrla18bg6EJFNnW6T7R',
	 'ssl.ca.location': certifi.where(),
     'group.id': 'tk-group',
	 'auto.offset.reset': 'earliest'
})

c.subscribe(['PROJETO_MOEDA'])

while True:
    msg = c.poll(1.0)

    if msg is None:
        continue
    if msg.error():
        print("Consumer error: {}".format(msg.error()))
        break

    print('Received message: {}'.format(msg.value().decode('utf-8')))
    

c.close()