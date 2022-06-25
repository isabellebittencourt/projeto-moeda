import pika
import requests as req
from datetime import datetime
from confluent_kafka import Producer
import certifi
import json


'''
	Request = [{
		'moedaOrigem': XXX,
		'moedaConvercao': XXX,
		'valorMoeda': Int,
		'valorMoedaConvertida': Int,
		'valorMoedaInteiro': Int,
		'createdAt': Data,
		'updatedAt': Data
	}]
'''
resp = req.get('http://localhost:5000/api/moedas')
dados = resp.json()


#=========================KAFKA CONFIGURAÇÃO==========================================
#Configuração do Cluster criado no confluent para visualizar 
#as mensagens produzidas/consumidas no confluent.io
p = Producer({
     'bootstrap.servers' : 'pkc-6ojv2.us-west4.gcp.confluent.cloud:9092',
	 'security.protocol' : 'SASL_SSL',
	 'sasl.mechanisms'   : 'PLAIN',
	 'sasl.username'     : 'HUK3KGDPXDPRSGGO',
	 'sasl.password'     :  'neF2Al2XRd/BUWNQgrmq9Y8V6GLW0+RQ9HqCFj+nuwCcMRrla18bg6EJFNnW6T7R',
	 'ssl.ca.location': certifi.where(),
	 'enable.ssl.certificate.verification': 'false'
})



#========================================RABBITMQ CONFIGURAÇÃO=====================
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='fila_python')



# Agrupa as conversoes da mesma moedaOrigem
dados_por_mO = {}
for i in range(len(dados)):
	key = dados[i]['moedaOrigem']
	valor = dados[i]['valorMoedaConvertida'].split()
	if len(valor) > 1:
		valor = str(valor[0]).replace('.', '').replace(',', '.')
	else:
		valor = str(valor[0]).replace('.', '').replace(',', '.')
	if key not in dados_por_mO:
		dados_por_mO[key] = []
	dados_por_mO[key].append({ 'moedaConvercao': dados[i]['moedaConvercao'], 'valorMoedaConvertida': valor, 'updatedAt': dados[i]['updatedAt'] })

print('\n  Lista de valor das moedas para cada Moeda Origem:')
for moedaOrigem in dados_por_mO:
	sorted(dados_por_mO[moedaOrigem], key=lambda x: float(x['valorMoedaConvertida']), reverse=True)
	print('')
	print('  Moeda Origem: ' + moedaOrigem)
	for moedaConvertida_dado in dados_por_mO[moedaOrigem]:
		print('      ' + moedaConvertida_dado['moedaConvercao'] + ': ' + moedaConvertida_dado['valorMoedaConvertida'] + ' (Atualizado em ' + datetime.strptime(moedaConvertida_dado['updatedAt'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%d/%m/%Y as %H:%M:%S') + ')')
	print('')
 
json_message = json.dumps(dados_por_mO, separators=(',', ':'))

#=====================PUBLICAÇÃO NO RABBITMQ=======================
channel.basic_publish(exchange='',
                      routing_key='fila_python',
                      body=json_message)

moedas_convertidas = []
i = 0
for data in range(len(dados)):
	key = dados[data]['moedaOrigem']
	moedas_convertidas.append( dados[data]['moedaOrigem'] + " " )
	i+=1;

moedas_convertidas = sorted(set(moedas_convertidas))

result = "".join(moedas_convertidas)

p.poll(0)
p.produce('PROJETO_MOEDA', result)

p.flush()
	


