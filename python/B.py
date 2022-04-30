import requests as req
from datetime import datetime

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

# Agrupa as conversoes da mesma moedaOrigem
dados_por_mO = {}
for i in xrange(len(dados)):
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