# BBD Specs

## Narativa 1

```
Eu como franqueador quero criar cupons de desconto para aumentar o número de vendas e consequentemente o faturamento.
```
### Cenários

```
Caso franqueador tenha a necessidade de criar cupons de desconto, será possível
acessar uma pagina específica para geração de cupons o qual, podem ser estabilecidas regras gerais e
específicas para cada cupom gerado. 
Porém deve ser observado a obrigatoriedade de atender alguns pré-requisitos mínimos estabelecidos.

* São 4 items obrigatórios que todo cupon deve ter.

Essas Items São:
* Nome do Cupon - OBRIGATÓRIO
* Código do Cupon (Esse nome tem que ser unico e exclusivo) - OBRIGATÓRIO
* Disconto Fornecido - OBRIGATÓRIO
* Desconto é em R$ ou % - OBRIGATÓRIO
* Active - OBRIGATÓRIO
* Contador - OBRIGATÓRIO
* Validade - OBRIGATÓRIO 
* Rules - OBRIGATÓRIO

Como regras opcionais temos:
- Data de ativação
- Data de enceramento  
- Descrição
- Limite de unica utilizaçao
- Limite de quantas utilizações são permitidas
- Pode ser utilizado apenas por um CPF e quantidade de uso. 
- Pode ser utilizado apenas em Cidades selecionadas
- Quais procedimentos são aptos a ter desconto
- O desconto requer um valor mínimo para ser utilizado

```
## Narativa 2
```
Eu como cliente MedPrev devo conseguir utilizar os cupons fornecidos.
```

### Cenários
```
Dado a posse de um cupom de desconto devo conseguir inserir ele  durante minha compra onde ele deve ser primeiramente validado.
Após a compra concliada e pagamento confirmado, esse cupom deve  gerar um registro de que foi utilizado e seguir as regras estabelecidas. 

* Limite de unica utilizaçao (Cupom deve ser eliminado após utilização)

* Limite de quantas utilizações são permitidas (O limite deve ser decrementado a cada utilização até atingir o target )

* Pode ser utilizado apenas por um CPF e quantidade de uso. (Caso seja de utilização unica o cupom deve ser eliminado)

```